import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    // Get the message from the request body
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get the OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    // Classify the message using OpenAI
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `
        Analyze the following LinkedIn message and classify it into one of these categories:
        - job_opportunity: Messages about job offers, recruitment, or hiring
        - sales: Sales pitches, product promotions, or service offerings
        - networking: Professional networking, connections, or collaborations
        - other: Any other type of message

        Also, determine the priority level (high, medium, low) based on:
        - High: Personalized job opportunities with details, important networking from industry leaders
        - Medium: General job opportunities, meaningful networking
        - Low: Generic sales pitches, mass messages

        Return the result as a JSON object with "type" and "priority" fields.

        LinkedIn message:
        ${message}
      `,
    })

    // Parse the response
    let classification
    try {
      classification = JSON.parse(text)
    } catch (error) {
      // If parsing fails, create a default classification
      classification = {
        type: "other",
        priority: "low",
      }
    }

    return NextResponse.json(classification)
  } catch (error) {
    console.error("Error classifying message:", error)
    return NextResponse.json({ error: "Failed to classify message" }, { status: 500 })
  }
}

