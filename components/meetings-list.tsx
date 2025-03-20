"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Settings, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddMeetingDialog } from "@/components/add-meeting-dialog"

// Mock data for meetings
const MEETINGS = [
  {
    id: "1",
    title: "Product Roadmap Planning",
    date: "Mar 17, 2025",
    time: "10:00 AM",
    participants: 5,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Weekly Sprint Review",
    date: "Mar 15, 2025",
    time: "2:00 PM",
    participants: 8,
    status: "completed",
  },
  {
    id: "3",
    title: "UX Design Workshop",
    date: "Mar 14, 2025",
    time: "11:30 AM",
    participants: 4,
    status: "completed",
  },
  {
    id: "4",
    title: "Stakeholder Update",
    date: "Mar 16, 2025",
    time: "3:00 PM",
    participants: 7,
    status: "in-progress",
  },
]

export function MeetingsList({ activeId }: { activeId?: string }) {
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="w-64 bg-[#1a2e29] text-white flex flex-col h-full">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-medium">Meetings</h1>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setIsAddMeetingOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {MEETINGS.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/meetings/${meeting.id}`}
              className={cn(
                "flex flex-col p-3 rounded-md mb-1 hover:bg-white/10 transition-colors",
                meeting.id === activeId ? "bg-white/10" : "",
              )}
            >
              <span className="font-medium text-sm">{meeting.title}</span>
              <span className="text-xs text-white/60 mt-1">{meeting.date}</span>
              <div className="flex items-center text-xs text-white/60 mt-1">
                <Users className="h-3 w-3 mr-1" />
                <span>{meeting.participants} participants</span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <AddMeetingDialog
        open={isAddMeetingOpen}
        onOpenChange={setIsAddMeetingOpen}
        onSave={(meeting) => {
          setIsAddMeetingOpen(false)
          // In a real app, we would save the meeting and get an ID
          router.push("/meetings/4")
        }}
      />
    </div>
  )
}

