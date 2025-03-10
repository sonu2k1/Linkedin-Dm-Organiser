"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Clipboard } from "lucide-react"

export function ImportMessages() {
  const [messages, setMessages] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; message: string }>(null)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setMessages(text)
    } catch (err) {
      console.error("Failed to read clipboard:", err)
      setResult({
        success: false,
        message: "Failed to read clipboard. Please paste manually.",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setMessages(content || "")
    }
    reader.readAsText(file)
  }

  const processMessages = async () => {
    if (!messages.trim()) {
      setResult({
        success: false,
        message: "Please enter or upload messages first.",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setResult({
        success: true,
        message: "Messages processed successfully! 12 new messages imported and categorized.",
      })
    }, 2000)

    // In a real application, you would send the messages to your API for processing
    // const response = await fetch('/api/process-messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ messages }),
    // });
    // const data = await response.json();
    // setIsProcessing(false);
    // setResult(data);
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="paste">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paste">
            <Clipboard className="h-4 w-4 mr-2" />
            Paste Messages
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paste" className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Paste your LinkedIn messages here..."
              className="min-h-[200px]"
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
            />
            <Button variant="outline" onClick={handlePaste}>
              <Clipboard className="h-4 w-4 mr-2" />
              Paste from Clipboard
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="upload" className="space-y-4">
          <Card className="flex items-center justify-center p-6 border-dashed border-2 min-h-[200px]">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                <p className="text-xs text-muted-foreground">Supports .txt, .csv, or .json files</p>
              </div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.csv,.json"
                onChange={handleFileUpload}
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload">Browse Files</label>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={processMessages} disabled={isProcessing || !messages.trim()}>
          {isProcessing ? "Processing..." : "Process Messages"}
        </Button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {result.message}
        </div>
      )}
    </div>
  )
}

