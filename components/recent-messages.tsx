"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageSquare, ShoppingCart } from "lucide-react"

export function RecentMessages() {
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
    },
    {
      id: 2,
      sender: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "Would you be interested in our new SaaS platform for developers?",
      time: "Yesterday",
      type: "sales",
      read: true,
    },
    {
      id: 3,
      sender: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "It was great connecting at the conference last week. I wanted to follow up...",
      time: "Yesterday",
      type: "networking",
      read: true,
    },
    {
      id: 4,
      sender: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "We're looking for a senior developer to join our team. Your experience...",
      time: "2 days ago",
      type: "job",
      read: true,
    },
    {
      id: 5,
      sender: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      preview: "Our AI-powered solution can help you increase productivity by 30%...",
      time: "3 days ago",
      type: "sales",
      read: true,
    },
  ]

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

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-4 p-3 rounded-lg ${!message.read ? "bg-muted/50" : ""}`}
        >
          <Avatar>
            <AvatarImage src={message.avatar} alt={message.sender} />
            <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <p className="font-medium">{message.sender}</p>
              {getTypeBadge(message.type)}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
            <p className="text-xs text-muted-foreground">{message.time}</p>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      ))}
    </div>
  )
}

