"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"

interface InviteBotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (meetingLink: string) => void
}

export function InviteBotDialog({ open, onOpenChange, onInvite }: InviteBotDialogProps) {
  const [meetingLink, setMeetingLink] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite ProductForge Bot</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Smith</h3>
              <p className="text-sm text-muted-foreground">ProductForge AI Assistant</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meeting-link">Meeting Link</Label>
            <Input
              id="meeting-link"
              placeholder="Paste your meeting URL (Zoom, Teams, Google Meet, etc.)"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Smith will join your meeting and capture the transcript for analysis
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onInvite(meetingLink)} disabled={!meetingLink}>
            Invite Bot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

