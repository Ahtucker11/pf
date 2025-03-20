"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Meeting = {
  title: string
  date: Date
  inviteBot: boolean
  meetingLink?: string
}

interface AddMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (meeting: Meeting) => void
}

export function AddMeetingDialog({ open, onOpenChange, onSave }: AddMeetingDialogProps) {
  const [meeting, setMeeting] = useState<Meeting>({
    title: "",
    date: new Date(),
    inviteBot: true,
    meetingLink: "",
  })

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              value={meeting.title}
              onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Time</Label>
              <Button variant="outline" className="justify-start text-left font-normal">
                <Clock className="mr-2 h-4 w-4" />
                10:00 AM
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="invite-bot">Invite ProductForge Bot (Smith)</Label>
              <div className="text-sm text-muted-foreground">
                The bot will join the meeting and capture the transcript
              </div>
            </div>
            <Switch
              id="invite-bot"
              checked={meeting.inviteBot}
              onCheckedChange={(checked) => setMeeting({ ...meeting, inviteBot: checked })}
            />
          </div>

          {meeting.inviteBot && (
            <div className="grid gap-2">
              <Label htmlFor="meeting-link">Meeting Link (optional)</Label>
              <Input
                id="meeting-link"
                placeholder="Paste meeting URL"
                value={meeting.meetingLink}
                onChange={(e) => setMeeting({ ...meeting, meetingLink: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                If provided, we'll automatically invite Smith to this meeting
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onSave(meeting)}>Create Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

