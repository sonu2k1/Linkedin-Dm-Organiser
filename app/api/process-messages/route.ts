import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    // Get the messages from the request body
    const { messages } = await req.json()

    if (!messages || typeof messages !== "string") {
      return NextResponse.json({ error: "Messages are required and must be a string" }, { status: 400 })
    }

    // Get the OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    // Process the messages using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Parse the following text that contains LinkedIn messages. 
        Identify individual messages and extract:
        1. Sender name
        2. Message content
        3. Timestamp (if available)

        Then classify each message into one of these categories:
        - job_opportunity: Messages about job offers, recruitment, or hiring
        - sales: Sales pitches, product promotions, or service offerings
        - networking: Professional networking, connections, or collaborations
        - other: Any other type of message

        Also, determine the priority level (high, medium, low) based on:
        - High: Personalized job opportunities with details, important networking from industry leaders
        - Medium: General job opportunities, meaningful networking
        - Low: Generic sales pitches, mass messages

        Return the result as a JSON array of message objects, each with:
        - sender
        - content
        - timestamp (if available, otherwise null)
        - type
        - priority

        LinkedIn messages:
        ${messages}
      `,
    })

    // Parse the response
    let processedMessages
    try {
      processedMessages = JSON.parse(text)
    } catch (error) {
      return NextResponse.json({ error: "Failed to parse processed messages" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${processedMessages.length} messages`,
      data: processedMessages,
    })
  } catch (error) {
    console.error("Error processing messages:", error)
    return NextResponse.json({ error: "Failed to process messages" }, { status: 500 })
  }
}

