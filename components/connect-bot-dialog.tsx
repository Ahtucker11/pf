"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface ConnectBotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (meetingLink: string) => void
}

export function ConnectBotDialog({ open, onOpenChange, onConnect }: ConnectBotDialogProps) {
  const router = useRouter()
  const [meetingLink, setMeetingLink] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = () => {
    if (!meetingLink) return

    setIsConnecting(true)
    setError(null)

    // Simulate API call to connect the bot
    setTimeout(() => {
      // Check if the URL is valid (simple check for demo)
      if (!meetingLink.startsWith("http")) {
        setError("Please enter a valid meeting URL")
        setIsConnecting(false)
        return
      }

      setIsConnecting(false)
      setIsConnected(true)

      // After showing success for a moment, redirect to the in-progress meeting page
      setTimeout(() => {
        onConnect(meetingLink)
        setMeetingLink("")
        setIsConnected(false)

        // Create a new meeting ID (in a real app, this would come from the API)
        const newMeetingId = "live-" + Date.now()

        // Navigate to the new meeting page
        router.push(
          `/meetings/${newMeetingId}?status=in-progress&botConnected=true&url=${encodeURIComponent(meetingLink)}`,
        )
      }, 1500)
    }, 2000)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isConnecting) {
          onOpenChange(newOpen)
          if (!newOpen) {
            setMeetingLink("")
            setIsConnected(false)
            setError(null)
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect ProductForge Bot</DialogTitle>
          <DialogDescription>
            Add the bot to your current meeting to capture and analyze the conversation
          </DialogDescription>
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

          {isConnected ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-green-100 p-2 mb-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-medium text-center">Bot successfully connected!</p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Smith is now joining your meeting and will begin capturing the transcript.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-2">
                <Label htmlFor="meeting-link">Meeting Link</Label>
                <Input
                  id="meeting-link"
                  placeholder="Paste your meeting URL (Zoom, Teams, Google Meet, etc.)"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  disabled={isConnecting}
                />
                <p className="text-sm text-muted-foreground">
                  Smith will join your meeting and capture the transcript for analysis
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Compatible with:</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Zoom</Badge>
                  <Badge variant="outline">Microsoft Teams</Badge>
                  <Badge variant="outline">Google Meet</Badge>
                  <Badge variant="outline">Webex</Badge>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          {!isConnected && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isConnecting}>
                Cancel
              </Button>
              <Button onClick={handleConnect} disabled={!meetingLink || isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Bot"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

