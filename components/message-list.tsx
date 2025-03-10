"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, MessageSquare, ShoppingCart, Star, Trash2 } from "lucide-react"

type MessageType = "all" | "job" | "networking" | "sales"

interface MessageListProps {
  type: MessageType
}

export function MessageList({ type }: MessageListProps) {
  // Sample data - in a real app, this would come from your API
  const allMessages = [
    {
      id: 1,
      sender: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "I saw your profile and wanted to discuss a job opportunity at our company. We're looking for someone with your skills and experience to join our team.",
      time: "10:30 AM",
      type: "job",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      sender: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "Would you be interested in our new SaaS platform for developers? It can help streamline your workflow and increase productivity.",
      time: "Yesterday",
      type: "sales",
      read: true,
      priority: "low",
    },
    {
      id: 3,
      sender: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "It was great connecting at the conference last week. I wanted to follow up and see if you'd be interested in collaborating on a project.",
      time: "Yesterday",
      type: "networking",
      read: true,
      priority: "medium",
    },
    {
      id: 4,
      sender: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "We're looking for a senior developer to join our team. Your experience would be a great fit for our current project needs.",
      time: "2 days ago",
      type: "job",
      read: true,
      priority: "high",
    },
    {
      id: 5,
      sender: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "Our AI-powered solution can help you increase productivity by 30%. Would you be interested in a demo?",
      time: "3 days ago",
      type: "sales",
      read: true,
      priority: "low",
    },
    {
      id: 6,
      sender: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "I'm reaching out because we have a position that matches your skills perfectly. Would you be open to discussing this opportunity?",
      time: "4 days ago",
      type: "job",
      read: true,
      priority: "medium",
    },
    {
      id: 7,
      sender: "James Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      preview:
        "I noticed your work on GitHub and was impressed. Would you be interested in joining our open source project?",
      time: "5 days ago",
      type: "networking",
      read: true,
      priority: "medium",
    },
    {
      id: 8,
      sender: "Robert Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "Our new developer tool can help you write code 2x faster. Would you like to try our free trial?",
      time: "1 week ago",
      type: "sales",
      read: true,
      priority: "low",
    },
  ]

  // Filter messages based on type
  const messages = type === "all" ? allMessages : allMessages.filter((message) => message.type === type)

  const [selectedMessages, setSelectedMessages] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelectedMessages((prev) => (prev.includes(id) ? prev.filter((messageId) => messageId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages.map((message) => message.id))
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-3 w-3" />
      case "sales":
        return <ShoppingCart className="h-3 w-3" />
      case "networking":
        return <MessageSquare className="h-3 w-3" />
      default:
        return <MessageSquare className="h-3 w-3" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "job":
        return (
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50">
            {getTypeIcon(type)}
            <span className="ml-1">Job</span>
          </Badge>
        )
      case "sales":
        return (
          <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 hover:bg-red-50">
            {getTypeIcon(type)}
            <span className="ml-1">Sales</span>
          </Badge>
        )
      case "networking":
        return (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50">
            {getTypeIcon(type)}
            <span className="ml-1">Networking</span>
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
            High
          </Badge>
        )
      case "medium":
        return <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>
      case "low":
        return <Badge className="ml-2 bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all"
            checked={selectedMessages.length === messages.length && messages.length > 0}
            onCheckedChange={selectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
        </div>

        {selectedMessages.length > 0 && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-1" />
              Mark as Priority
            </Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${
                !message.read ? "bg-muted/50" : ""
              } ${selectedMessages.includes(message.id) ? "border-primary" : "border-border"}`}
            >
              <div className="flex items-center h-full pt-1">
                <Checkbox
                  checked={selectedMessages.includes(message.id)}
                  onCheckedChange={() => toggleSelect(message.id)}
                />
              </div>
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center flex-wrap gap-1">
                  <p className="font-medium">{message.sender}</p>
                  {getTypeBadge(message.type)}
                  {getPriorityBadge(message.priority)}
                </div>
                <p className="text-sm text-muted-foreground">{message.preview}</p>
                <p className="text-xs text-muted-foreground">{message.time}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

