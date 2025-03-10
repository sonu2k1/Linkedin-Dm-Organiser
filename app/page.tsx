import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BarChart3, Filter, MessageSquare, Settings } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <MessageSquare className="h-6 w-6" />
            <span>LinkedIn Message Organizer</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:underline">
              Messages
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:underline">
              Settings
            </Link>
          </nav>
        </div>
      </header>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Organize your LinkedIn messages <br className="hidden sm:inline" />
            with AI-powered prioritization
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Stop wasting time on sales pitches. Focus on the messages that matter.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </section>
      <section className="container py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Key Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Filter className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>AI-Powered Classification</CardTitle>
              <CardDescription>
                Automatically categorize messages as sales, job opportunities, or networking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes message content to determine intent and importance, helping you focus on what matters.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Priority Inbox</CardTitle>
              <CardDescription>See the most important messages first based on customizable rules</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Set your own priority rules or let our AI determine which messages deserve your immediate attention.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Settings className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Customizable Settings</CardTitle>
              <CardDescription>Configure your preferences and add your own AI API keys</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add your OpenAI or Claude API key for enhanced privacy and control over your data.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

