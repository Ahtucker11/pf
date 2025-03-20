"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, Clock, Loader2, AlertCircle, Mic, MicOff } from "lucide-react"
import { ConnectBotDialog } from "@/components/connect-bot-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface MeetingInProgressProps {
  meetingId: string
  meetingUrl: string
  botConnected: boolean
}

export function MeetingInProgress({
  meetingId,
  meetingUrl,
  botConnected: initialBotConnected,
}: MeetingInProgressProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [botConnected, setBotConnected] = useState(initialBotConnected)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // Simulate recording time increasing
  useState(() => {
    if (botConnected) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleDisconnectBot = () => {
    setIsDisconnectDialogOpen(false)

    // Simulate API call to disconnect the bot
    toast({
      title: "Disconnecting bot...",
      description: "Please wait while we disconnect Smith from your meeting",
    })

    setTimeout(() => {
      setBotConnected(false)
      toast({
        title: "Bot disconnected",
        description: "Smith has been disconnected from your meeting",
      })

      // Update the URL to reflect the bot is disconnected
      router.push(`/meetings/${meetingId}?status=in-progress&botConnected=false&url=${encodeURIComponent(meetingUrl)}`)
    }, 1500)
  }

  const handleReconnectBot = () => {
    setIsReconnecting(true)

    // Simulate API call to reconnect the bot
    setTimeout(() => {
      setBotConnected(true)
      setIsReconnecting(false)

      toast({
        title: "Bot reconnected",
        description: "Smith has rejoined your meeting and resumed recording",
      })

      // Update the URL to reflect the bot is connected
      router.push(`/meetings/${meetingId}?status=in-progress&botConnected=true&url=${encodeURIComponent(meetingUrl)}`)
    }, 2000)
  }

  const handleConnectBot = (meetingLink: string) => {
    setIsConnectDialogOpen(false)

    // Simulate API call to connect the bot
    setTimeout(() => {
      setBotConnected(true)

      toast({
        title: "Bot connected",
        description: "Smith has joined your meeting and started recording",
      })

      // Update the URL to reflect the bot is connected
      router.push(`/meetings/${meetingId}?status=in-progress&botConnected=true&url=${encodeURIComponent(meetingLink)}`)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4">
      {/* Bot status indicator */}
      {botConnected && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Bot Connected
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => setIsDisconnectDialogOpen(true)}
          >
            Disconnect
          </Button>
        </div>
      )}

      <Card className="w-full shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl">Meeting in Progress</CardTitle>
          {botConnected && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{formatTime(recordingTime)}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          {botConnected ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Bot className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">Smith is recording your meeting</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                The ProductForge Bot is capturing your conversation and will generate insights when the meeting ends.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button variant="outline" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                  {isMuted ? "Unmute Bot" : "Mute Bot"}
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setIsDisconnectDialogOpen(true)}
                >
                  Disconnect Bot
                </Button>
              </div>

              <div className="mt-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium">Participants</h4>
                  <Badge>5</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/40 rounded-md p-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">User {i}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 bg-primary/10 rounded-md p-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24&text=S" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Smith (Bot)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">Bot not connected</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Connect Smith to your meeting to capture the conversation and generate insights.
              </p>

              {isReconnecting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reconnecting...
                </Button>
              ) : (
                <Button onClick={handleReconnectBot}>
                  <Bot className="mr-2 h-4 w-4" />
                  Reconnect Bot
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disconnect confirmation dialog */}
      <AlertDialog open={isDisconnectDialogOpen} onOpenChange={setIsDisconnectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Bot?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect Smith from your meeting? The bot will stop recording and leave the
              meeting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisconnectBot} className="bg-red-600 hover:bg-red-700">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Connect bot dialog */}
      <ConnectBotDialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen} onConnect={handleConnectBot} />
    </div>
  )
}

