import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

export function EmptyMeetingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Calendar className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No meeting selected</h2>
        <p className="text-muted-foreground mb-6">Select a meeting from the list or create a new one to get started.</p>
        <div className="flex gap-4">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Create Meeting
          </Button>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Join Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

