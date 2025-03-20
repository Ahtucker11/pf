"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Filter, Plus, Search, Users, Settings, Bot } from "lucide-react"
import Link from "next/link"
import { AddMeetingDialog } from "@/components/add-meeting-dialog"
import { ConnectBotDialog } from "@/components/connect-bot-dialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock data for meetings
const MEETINGS = [
  {
    id: "1",
    title: "Product Roadmap Planning",
    date: "Mar 17, 2025",
    time: "10:00 AM",
    duration: "1 hour",
    participants: 5,
    status: "upcoming",
    description: "Discuss and finalize the product roadmap for the next quarter.",
  },
  {
    id: "2",
    title: "Weekly Sprint Review",
    date: "Mar 15, 2025",
    time: "2:00 PM",
    duration: "45 minutes",
    participants: 8,
    status: "completed",
    description: "Review progress from the current sprint and plan for the next one.",
  },
  {
    id: "3",
    title: "UX Design Workshop",
    date: "Mar 14, 2025",
    time: "11:30 AM",
    duration: "2 hours",
    participants: 4,
    status: "completed",
    description: "Collaborative workshop to refine the user experience design for the new features.",
  },
  {
    id: "4",
    title: "Stakeholder Update",
    date: "Mar 16, 2025",
    time: "3:00 PM",
    duration: "30 minutes",
    participants: 7,
    status: "in-progress",
    description: "Provide updates to key stakeholders on project progress and gather feedback.",
  },
  {
    id: "5",
    title: "Technical Planning Session",
    date: "Mar 18, 2025",
    time: "9:00 AM",
    duration: "1.5 hours",
    participants: 6,
    status: "upcoming",
    description: "Plan the technical implementation details for the upcoming features.",
  },
  {
    id: "6",
    title: "Marketing Strategy Meeting",
    date: "Mar 19, 2025",
    time: "1:00 PM",
    duration: "1 hour",
    participants: 5,
    status: "upcoming",
    description: "Discuss and align on the marketing strategy for the product launch.",
  },
  {
    id: "7",
    title: "Customer Feedback Review",
    date: "Mar 13, 2025",
    time: "10:30 AM",
    duration: "1 hour",
    participants: 4,
    status: "completed",
    description: "Review and analyze recent customer feedback to identify improvement opportunities.",
  },
  {
    id: "8",
    title: "Budget Planning",
    date: "Mar 20, 2025",
    time: "11:00 AM",
    duration: "1 hour",
    participants: 3,
    status: "upcoming",
    description: "Review and plan the budget for the next quarter.",
  },
]

export default function MeetingsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl bg-[#f8f7f4]">
      <MeetingsList />
      <div className="fixed bottom-6 right-6">
        <Link href="/meetings/config">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-md">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function MeetingsList() {
  const { toast } = useToast()
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false)
  const [isConnectBotOpen, setIsConnectBotOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter meetings based on search query and status filter
  const filteredMeetings = MEETINGS.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleConnectBot = (meetingLink: string) => {
    setIsConnectBotOpen(false)

    // Show success toast
    toast({
      title: "Bot connected successfully",
      description: `Smith has joined your meeting at ${meetingLink.substring(0, 30)}...`,
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsConnectBotOpen(true)}>
            <Bot className="mr-2 h-4 w-4" />
            Connect Bot
          </Button>
          <Button onClick={() => setIsAddMeetingOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meetings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meetings</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {filteredMeetings.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No meetings found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <MeetingListItem key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <AddMeetingDialog
        open={isAddMeetingOpen}
        onOpenChange={setIsAddMeetingOpen}
        onSave={(meeting) => {
          setIsAddMeetingOpen(false)
          // In a real app, we would save the meeting and get an ID
        }}
      />

      <ConnectBotDialog open={isConnectBotOpen} onOpenChange={setIsConnectBotOpen} onConnect={handleConnectBot} />
    </>
  )
}

function MeetingCard({ meeting }: { meeting: (typeof MEETINGS)[0] }) {
  return (
    <Link href={`/meetings/${meeting.id}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{meeting.title}</CardTitle>
            <StatusBadge status={meeting.status} />
          </div>
          <CardDescription className="line-clamp-2">{meeting.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {meeting.time} ({meeting.duration})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{meeting.participants} participants</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(3, meeting.participants) }).map((_, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} />
                <AvatarFallback>U{i + 1}</AvatarFallback>
              </Avatar>
            ))}
            {meeting.participants > 3 && (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{meeting.participants - 3}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function MeetingListItem({ meeting }: { meeting: (typeof MEETINGS)[0] }) {
  return (
    <Link href={`/meetings/${meeting.id}`}>
      <Card className="transition-all hover:shadow-md hover:border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{meeting.title}</h3>
              <StatusBadge status={meeting.status} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{meeting.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>{meeting.participants} participants</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={
        status === "upcoming"
          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
          : status === "in-progress"
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
      }
    >
      {status === "upcoming" ? "Upcoming" : status === "in-progress" ? "In Progress" : "Completed"}
    </Badge>
  )
}

