"use client"

import { useSearchParams } from "next/navigation"
import { MeetingInProgress } from "@/components/meeting-in-progress"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

// Update the import statement to use a default import
// Replace this line:
// import { MeetingDetail } from "@/components/meeting-detail"

// With this:
import MeetingDetail from "@/components/meeting-detail"

// Dynamically import the MeetingDetail component
// const MeetingDetail = dynamic(() => import("@/components/meeting-detail"), {
//   loading: () => <div className="flex items-center justify-center h-64">Loading meeting details...</div>,
// })

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const botConnected = searchParams.get("botConnected") === "true"
  const meetingUrl = searchParams.get("url") || ""

  // Check if this is a live meeting with the bot
  const isLiveMeeting = status === "in-progress" && params.id.startsWith("live-")

  return (
    <div className="container mx-auto py-6 max-w-7xl bg-[#f8f7f4]">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/meetings" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Meetings
          </Link>
        </Button>
      </div>

      {isLiveMeeting ? (
        <MeetingInProgress meetingId={params.id} meetingUrl={meetingUrl} botConnected={botConnected} />
      ) : (
        <MeetingDetail id={params.id} />
      )}
    </div>
  )
}

