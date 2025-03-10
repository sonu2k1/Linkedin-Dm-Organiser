export interface Message {
  id: number
  sender: string
  avatar: string
  preview: string
  content?: string
  time: string
  type: "job" | "sales" | "networking" | "other"
  read: boolean
  priority: "high" | "medium" | "low"
}

export interface User {
  id: string
  name: string
  email: string
  linkedinProfile?: string
  settings: UserSettings
}

export interface UserSettings {
  theme: "light" | "dark" | "system"
  language: string
  notifications: boolean
  aiProvider: "openai" | "claude"
  apiKey?: string
  model: string
  processOnServer: boolean
  saveClassifications: boolean
  filterSales: boolean
  highlightJobs: boolean
  spamDetection: boolean
  priorityKeywords: string[]
}

