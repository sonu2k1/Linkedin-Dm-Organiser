"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, Star } from "lucide-react"

export function PriorityInbox() {
  // Sample data - in a real app, this would come from your API
  const messages = [
    {
      id: 1,
      sender: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "I saw your profile and wanted to discuss a job opportunity at our company...",
      time: "10:30 AM",
      type: "job",
      read: false,
      priority: "high",
    },
    {
      id: 4,
      sender: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "We're looking for a senior developer to join our team. Your experience...",
      time: "2 days ago",
      type: "job",
      read: true,
      priority: "high",
    },
    {
      id: 6,
      sender: "Lisa Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "I'm reaching out because we have a position that matches your skills perfectly...",
      time: "4 days ago",
      type: "job",
      read: true,
      priority: "medium",
    },
    {
      id: 7,
      sender: "James Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "I noticed your work on GitHub and was impressed. Would you be interested in joining...",
      time: "5 days ago",
      type: "networking",
      read: true,
      priority: "medium",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-3 w-3" />
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
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-4 p-4 rounded-lg border ${!message.read ? "bg-muted/50" : ""}`}
        >
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
  )
}

