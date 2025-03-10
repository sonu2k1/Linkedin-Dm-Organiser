import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageList } from "@/components/message-list"
import { ImportMessages } from "@/components/import-messages"
import { Plus, Upload } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Message
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Input placeholder="Search messages..." className="max-w-sm" />
          <Button variant="outline">Search</Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Messages</TabsTrigger>
            <TabsTrigger value="job">Job Opportunities</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageList type="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="job">
            <Card>
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageList type="job" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="networking">
            <Card>
              <CardHeader>
                <CardTitle>Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageList type="networking" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageList type="sales" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Import Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <ImportMessages />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

