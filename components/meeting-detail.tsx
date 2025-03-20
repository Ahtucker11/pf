"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Mail,
  Search,
  Check,
  ListTodo,
  HelpCircle,
  AlertTriangle,
  FileIcon,
  ChevronRight,
  Pencil,
} from "lucide-react"
import { ActionModal } from "@/components/action-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for a specific meeting
const MEETING_DATA = {
  "1": {
    id: "1",
    title: "Product Roadmap Planning",
    description: "Planning session for the next quarter's product roadmap and feature prioritization.",
    date: "Mar 17, 2025",
    time: "10:00 AM",
    duration: "1 hour",
    status: "upcoming",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p2", name: "Jane Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p3", name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p4", name: "Sarah Williams", role: "Stakeholder", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p5", name: "Alex Brown", role: "Marketing", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    botJoined: false,
    transcript: "",
  },
  "2": {
    id: "2",
    title: "Weekly Sprint Review",
    description: "Review of the current sprint progress, achievements, and blockers.",
    date: "Mar 15, 2025",
    time: "2:00 PM",
    duration: "45 minutes",
    status: "completed",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p2", name: "Jane Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p3", name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p4", name: "Sarah Williams", role: "Stakeholder", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p5", name: "Alex Brown", role: "Marketing", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p6", name: "Smith", role: "ProductForge Bot", avatar: "/placeholder.svg?height=40&width=40", isBot: true },
    ],
    botJoined: true,
    transcript: `
John: Welcome everyone to our weekly sprint review. Let's start by going through what we've accomplished this week.

Mike: I've completed the user authentication flow and fixed the bugs in the registration process. The login page is now responsive on all devices.

Jane: I've finalized the designs for the dashboard and shared them in Figma. I'd like to get feedback on the data visualization components.

John: Those look great, Jane. I think we should prioritize implementing the dashboard in the next sprint.

Sarah: From the stakeholder perspective, we're really excited about the dashboard. Can we also add a feature to export the data as CSV?

John: That's a good point. Let's add that as a user story for the next sprint.

Mike: I think that should be fairly straightforward to implement. I can take that on.

John: Great. What about the open issues from last week?

Jane: We still need to address the accessibility concerns on the form components. I've documented them in Jira.

John: Let's make that a priority. We need to ensure our product is accessible to all users.

Mike: I agree. I'll work with Jane to fix those issues.

Sarah: Another thing the executive team mentioned was the need for better analytics. They want to understand how users are interacting with the product.

John: That's a good point. Let's create a user story for that as well.

Alex: From a marketing perspective, we're planning to launch a campaign next month. It would be great if we could have the new features ready by then.

John: Let's see what we can do. I'll update the roadmap and prioritize accordingly.

Jane: I have a question about the user testing. When are we planning to conduct the next round?

John: We should schedule that for next week. I'll send out a calendar invite.

Mike: Before we wrap up, I wanted to mention that we might need to upgrade our database soon. We're starting to see some performance issues.

John: Thanks for flagging that, Mike. Let's discuss that in our technical planning meeting tomorrow.

Sarah: One last thing from my side - the client demo is scheduled for Friday. Can we make sure everything is stable by then?

John: Absolutely. We'll do a thorough QA before the demo.

John: Alright, I think that covers everything. Thanks everyone for your hard work this week. Let's keep up the momentum!
  `,
    summary: "",
  },
  "3": {
    id: "3",
    title: "UX Design Workshop",
    description: "Collaborative workshop to refine the user experience design for new features.",
    date: "Mar 14, 2025",
    time: "11:30 AM",
    duration: "2 hours",
    status: "completed",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p2", name: "Jane Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p3", name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p6", name: "Smith", role: "ProductForge Bot", avatar: "/placeholder.svg?height=40&width=40", isBot: true },
    ],
    botJoined: true,
    transcript: "Workshop transcript goes here...",
  },
  "4": {
    id: "4",
    title: "Stakeholder Update",
    description: "Update for key stakeholders on project progress and upcoming milestones.",
    date: "Mar 16, 2025",
    time: "3:00 PM",
    duration: "30 minutes",
    status: "in-progress",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p4", name: "Sarah Williams", role: "Stakeholder", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p5", name: "Alex Brown", role: "Marketing", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p7", name: "David Lee", role: "CEO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p8", name: "Emily Chen", role: "CTO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p9", name: "Robert Taylor", role: "CFO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p6", name: "Smith", role: "ProductForge Bot", avatar: "/placeholder.svg?height=40&width=40", isBot: true },
    ],
    botJoined: true,
    transcript: "Live meeting in progress...",
  },
  "5": {
    id: "5",
    title: "Technical Planning Session",
    description: "Planning the technical implementation details for upcoming features.",
    date: "Mar 18, 2025",
    time: "9:00 AM",
    duration: "1.5 hours",
    status: "upcoming",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p3", name: "Mike Johnson", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p8", name: "Emily Chen", role: "CTO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p10", name: "Tom Wilson", role: "Tech Lead", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p11", name: "Lisa Park", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p12", name: "Ryan Garcia", role: "Frontend Developer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    botJoined: false,
    transcript: "",
  },
  "6": {
    id: "6",
    title: "Marketing Strategy Meeting",
    description: "Discussion of marketing strategy for the upcoming product launch.",
    date: "Mar 19, 2025",
    time: "1:00 PM",
    duration: "1 hour",
    status: "upcoming",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p5", name: "Alex Brown", role: "Marketing", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p13", name: "Emma White", role: "Marketing Director", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p14", name: "Daniel Kim", role: "Content Strategist", avatar: "/placeholder.svg?height=40&width=40" },
      {
        id: "p15",
        name: "Olivia Martinez",
        role: "Social Media Manager",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    botJoined: false,
    transcript: "",
  },
  "7": {
    id: "7",
    title: "Customer Feedback Review",
    description: "Review and analysis of recent customer feedback to identify improvement opportunities.",
    date: "Mar 13, 2025",
    time: "10:30 AM",
    duration: "1 hour",
    status: "completed",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p2", name: "Jane Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p16", name: "Grace Lee", role: "Customer Success", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p17", name: "Nathan Black", role: "Support Lead", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    botJoined: true,
    transcript: "Customer feedback review transcript...",
  },
  "8": {
    id: "8",
    title: "Budget Planning",
    description: "Review and planning of the budget for the next quarter.",
    date: "Mar 20, 2025",
    time: "11:00 AM",
    duration: "1 hour",
    status: "upcoming",
    participants: [
      { id: "p1", name: "John Doe", role: "Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p9", name: "Robert Taylor", role: "CFO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "p18", name: "Sophia Chen", role: "Finance Manager", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    botJoined: false,
    transcript: "",
  },
}

// Enhanced extraction types with icons and descriptions
const EXTRACTION_TYPES = [
  {
    id: "summary",
    label: "Meeting Summary",
    icon: <FileIcon className="h-5 w-5" />,
    description: "Comprehensive overview of the meeting's key points and outcomes",
  },
  {
    id: "actionItems",
    label: "Action Items",
    icon: <ListTodo className="h-5 w-5" />,
    description: "Tasks and responsibilities assigned during the meeting",
  },
  {
    id: "userStories",
    label: "User Stories",
    icon: <Users className="h-5 w-5" />,
    description: "User-focused requirements extracted from the discussion",
  },
  {
    id: "decisions",
    label: "Decisions Made",
    icon: <Check className="h-5 w-5" />,
    description: "Key decisions and conclusions reached during the meeting",
  },
  {
    id: "openQuestions",
    label: "Open Questions",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Unresolved questions that need further discussion",
  },
  {
    id: "painPoints",
    label: "Pain Points",
    icon: <AlertTriangle className="h-5 w-5" />,
    description: "Issues, challenges, and concerns raised during the meeting",
  },
]

// Mock extraction results
const EXTRACTION_RESULTS = [
  // Meeting Summary
  {
    id: "sum1",
    type: "summary",
    title: "Sprint Review Meeting Summary",
    content:
      "The team discussed progress on the authentication flow, dashboard design, and accessibility issues. Key decisions included prioritizing the dashboard implementation in the next sprint, adding CSV export functionality, and addressing accessibility concerns. The team also identified the need for user testing and potential database performance issues that require attention.",
    source: "Full meeting transcript",
    actions: ["draftEmail", "createPresentation", "shareWithTeam"],
    priority: "medium",
  },

  // Action Items
  {
    id: "ai1",
    type: "actionItem",
    title: "Update Product Roadmap",
    content: "John to update the product roadmap and prioritize features for the upcoming marketing campaign.",
    source: "John: Let's see what we can do. I'll update the roadmap and prioritize accordingly.",
    actions: ["draftEmail", "addToBacklog", "assign", "schedule"],
    priority: "high",
    assignee: "John Doe",
  },
  {
    id: "ai2",
    type: "actionItem",
    title: "Schedule User Testing",
    content: "John to schedule the next round of user testing for next week and send out calendar invites.",
    source: "John: We should schedule that for next week. I'll send out a calendar invite.",
    actions: ["draftEmail", "schedule", "addToBacklog"],
    priority: "medium",
    assignee: "John Doe",
  },
  {
    id: "ai3",
    type: "actionItem",
    title: "QA Before Client Demo",
    content: "Team to perform thorough QA before the client demo scheduled for Friday.",
    source: "John: Absolutely. We'll do a thorough QA before the demo.",
    actions: ["createTask", "assign", "draftEmail"],
    priority: "high",
    dueDate: "Friday",
  },

  // User Stories
  {
    id: "us1",
    type: "userStory",
    title: "Dashboard CSV Export",
    content: "As a user, I want to export dashboard data as CSV so that I can analyze it in Excel or other tools.",
    source:
      "Sarah: From the stakeholder perspective, we're really excited about the dashboard. Can we also add a feature to export the data as CSV?",
    actions: ["writeUserStory", "addToBacklog", "estimate"],
    priority: "medium",
  },
  {
    id: "us2",
    type: "userStory",
    title: "Improved Analytics",
    content: "As a stakeholder, I want better analytics to understand how users are interacting with the product.",
    source:
      "Sarah: Another thing the executive team mentioned was the need for better analytics. They want to understand how users are interacting with the product.",
    actions: ["writeUserStory", "research", "addToBacklog"],
    priority: "high",
  },

  // Decisions
  {
    id: "dec1",
    type: "decision",
    title: "Prioritize Dashboard Implementation",
    content:
      "The team decided to prioritize implementing the dashboard in the next sprint based on the finalized designs.",
    source: "John: Those look great, Jane. I think we should prioritize implementing the dashboard in the next sprint.",
    actions: ["draftEmail", "addToBacklog", "createTask"],
    priority: "high",
  },
  {
    id: "dec2",
    type: "decision",
    title: "Address Accessibility Concerns",
    content: "The team agreed to prioritize addressing accessibility concerns on the form components.",
    source: "John: Let's make that a priority. We need to ensure our product is accessible to all users.",
    actions: ["writeUserStory", "addToBacklog", "research"],
    priority: "high",
  },

  // Open Questions
  {
    id: "oq1",
    type: "openQuestion",
    title: "User Testing Schedule",
    content: "When will the next round of user testing be conducted?",
    source: "Jane: I have a question about the user testing. When are we planning to conduct the next round?",
    actions: ["draftEmail", "research", "schedule"],
    priority: "medium",
    status: "answered",
  },
  {
    id: "oq2",
    type: "openQuestion",
    title: "Feature Readiness for Marketing Campaign",
    content: "Will the new features be ready in time for the marketing campaign next month?",
    source:
      "Alex: From a marketing perspective, we're planning to launch a campaign next month. It would be great if we could have the new features ready by then.",
    actions: ["draftEmail", "research", "schedule"],
    priority: "high",
    status: "unanswered",
  },

  // Pain Points
  {
    id: "pp1",
    type: "painPoint",
    title: "Database Performance Issues",
    content: "Database performance issues are starting to emerge and may require an upgrade soon.",
    source:
      "Mike: Before we wrap up, I wanted to mention that we might need to upgrade our database soon. We're starting to see some performance issues.",
    actions: ["research", "addToBacklog", "createTask"],
    priority: "medium",
    impact: "increasing",
  },
  {
    id: "pp2",
    type: "painPoint",
    title: "Accessibility Issues in Form Components",
    content:
      "The form components have accessibility issues that need to be addressed to ensure the product is usable by all users.",
    source:
      "Jane: We still need to address the accessibility concerns on the form components. I've documented them in Jira.",
    actions: ["writeUserStory", "addToBacklog", "research"],
    priority: "high",
    impact: "significant",
  },
]

// Add the getActionLabel function back if it's missing
const getActionLabel = (action: string) => {
  switch (action) {
    case "writeUserStory":
      return "Write User Story"
    case "draftEmail":
      return "Draft Email"
    case "research":
      return "Research"
    case "addToBacklog":
      return "Add to Backlog"
    case "assign":
      return "Assign"
    case "schedule":
      return "Schedule"
    case "createTask":
      return "Create Task"
    case "estimate":
      return "Estimate"
    case "createPresentation":
      return "Create Presentation"
    case "shareWithTeam":
      return "Share with Team"
    default:
      return action
  }
}

// Get icon for action
const getActionIcon = (action: string) => {
  switch (action) {
    case "writeUserStory":
      return <FileText className="h-4 w-4 mr-2" />
    case "draftEmail":
      return <Mail className="h-4 w-4 mr-2" />
    case "research":
      return <Search className="h-4 w-4 mr-2" />
    case "addToBacklog":
      return <ChevronDown className="h-4 w-4 mr-2" />
    case "assign":
      return <Users className="h-4 w-4 mr-2" />
    case "schedule":
      return <Calendar className="h-4 w-4 mr-2" />
    case "createTask":
      return <FileText className="h-4 w-4 mr-2" />
    case "estimate":
      return <Clock className="h-4 w-4 mr-2" />
    case "createPresentation":
      return <FileText className="h-4 w-4 mr-2" />
    case "shareWithTeam":
      return <Users className="h-4 w-4 mr-2" />
    default:
      return null
  }
}

// Get sample content for completed actions
const getActionResultContent = (action: string) => {
  switch (action) {
    case "writeUserStory":
      return "**As a** user, **I want to** export dashboard data as CSV **so that** I can analyze it in Excel or other tools. **Acceptance Criteria:** - Feature should be accessible via the main dashboard..."
    case "draftEmail":
      return "Subject: Follow-up on Dashboard CSV Export\n\nHi Team,\n\nDuring our recent Sprint Review meeting, we discussed adding CSV export functionality to the dashboard..."
    case "research":
      return "# Research Notes: Dashboard CSV Export\n\n## Background\nThe team has identified a need for users to export dashboard data as CSV for analysis in external tools..."
    case "addToBacklog":
      return "Item successfully added to backlog with ID: US-247\n\nPriority: Medium\nType: User Story\nCreated: 3/18/2025"
    case "assign":
      return 'Assigned "Dashboard CSV Export" to Mike Johnson (Developer)\nDue date: 3/25/2025\nPriority: Medium'
    case "schedule":
      return 'Scheduled "Dashboard CSV Export Implementation"\nDate: 3/22/2025\nTime: 10:00 AM - 11:00 AM\nParticipants: John Doe, Jane Smith, Mike Johnson'
    case "createTask":
      return "New Task: Implement Dashboard CSV Export\nAssignee: Mike Johnson\nDue Date: 3/25/2025\nPriority: Medium\nLabels: feature, export"
    case "estimate":
      return "Effort Estimation for: Dashboard CSV Export\nStory Points: 5\nT-shirt Size: M\nBreakdown: - Frontend work: 2 days - Backend work: 3 days"
    case "createPresentation":
      return "# Sprint Review Meeting Summary\n## Key Points\n- Authentication flow completed\n- Dashboard design finalized\n- CSV export feature to be added\n- Accessibility issues need to be addressed"
    case "shareWithTeam":
      return "@team\n\nHere's a summary from our recent meeting:\n\n# Sprint Review Meeting Summary\n\nThe team discussed progress on the authentication flow, dashboard design, and accessibility issues..."
    default:
      return "Content generated successfully."
  }
}

// Extraction Selection Card Component
function ExtractionTypeCard({
  type,
  isSelected,
  onToggle,
}: {
  type: (typeof EXTRACTION_TYPES)[0]
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        "relative flex items-start p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-muted/30",
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card",
      )}
      onClick={onToggle}
    >
      <div className="absolute top-4 right-4">
        <Checkbox checked={isSelected} onCheckedChange={() => onToggle()} />
      </div>
      <div className="mr-8">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-md",
              isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {type.icon}
          </div>
          <div>
            <h3 className="font-medium">{type.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type ExtractionResult = (typeof EXTRACTION_RESULTS)[0] & {
  completedActions?: { action: string; timestamp: string; generatedContent?: string }[]
}

// Details Modal Component
function DetailsModal({
  result,
  open,
  onOpenChange,
  onAction,
}: {
  result: ExtractionResult | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAction: (action: string) => void
}) {
  if (!result) return null

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "userStory":
        return "User Story"
      case "openQuestion":
        return "Open Question"
      case "actionItem":
        return "Action Item"
      case "decision":
        return "Decision"
      case "painPoint":
        return "Pain Point"
      case "summary":
        return "Summary"
      default:
        return type
    }
  }

  const getBadgeColor = (type: string) => {
    return cn(
      "px-2 py-0.5 text-xs font-medium",
      type === "userStory" && "bg-blue-100 text-blue-800",
      type === "openQuestion" && "bg-purple-100 text-purple-800",
      type === "actionItem" && "bg-green-100 text-green-800",
      type === "decision" && "bg-amber-100 text-amber-800",
      type === "painPoint" && "bg-red-100 text-red-800",
      type === "summary" && "bg-gray-100 text-gray-800",
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge className={getBadgeColor(result.type)}>{getTypeLabel(result.type)}</Badge>
            <DialogTitle className="text-xl">{result.title}</DialogTitle>
          </div>
          <DialogDescription>
            {result.assignee && <span className="mr-3">Assignee: {result.assignee}</span>}
            {result.dueDate && <span className="mr-3">Due: {result.dueDate}</span>}
            {result.status && <span className="mr-3">Status: {result.status}</span>}
            {result.impact && <span>Impact: {result.impact}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
            <div className="p-4 bg-muted/20 rounded-md">
              <p>{result.content}</p>
            </div>
          </div>

          {/* Source section */}
          {/* Available actions section */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Available Actions</h3>
            <div className="flex flex-wrap gap-2">
              {result.actions.map((action) => {
                const isCompleted = result.completedActions?.some((a) => a.action === action)
                return (
                  <Button
                    key={action}
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    onClick={() => onAction(action)}
                    className={isCompleted ? "border-green-200 text-green-700 bg-green-50" : ""}
                  >
                    {getActionIcon(action)}
                    {getActionLabel(action)}
                    {isCompleted && <Check className="ml-2 h-3 w-3" />}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Completed actions section */}
          {result.completedActions && result.completedActions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Generated Content</h3>
              {result.completedActions.map((completedAction) => {
                const actionContent = completedAction.generatedContent || getActionResultContent(completedAction.action)

                return (
                  <div key={completedAction.action} className="mb-4">
                    <div className="flex items-center mb-2">
                      {getActionIcon(completedAction.action)}
                      <span className="font-medium">{getActionLabel(completedAction.action)}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (Completed {new Date(completedAction.timestamp).toLocaleString()})
                      </span>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md whitespace-pre-line">{actionContent}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function MeetingDetail({ id }: { id: string }) {
  const meeting = MEETING_DATA[id as keyof typeof MEETING_DATA]
  const [selectedExtractions, setSelectedExtractions] = useState<string[]>(["summary", "userStories", "openQuestions"])
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractionResults, setExtractionResults] = useState<ExtractionResult[]>([])
  const [activeAction, setActiveAction] = useState<{ card: ExtractionResult; action: string } | null>(null)
  const [selectedResult, setSelectedResult] = useState<ExtractionResult | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Add state for editable title and description
  const [editableTitle, setEditableTitle] = useState(meeting?.title || "")
  const [editableDescription, setEditableDescription] = useState(meeting?.description || "")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)

  // Add state for type filter
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const handleRunExtractions = () => {
    if (selectedExtractions.length === 0) return

    setIsExtracting(true)

    // Simulate API call delay
    setTimeout(() => {
      // Add completedActions properties to each result
      const results = EXTRACTION_RESULTS.map((result) => ({
        ...result,
        completedActions: [],
      }))
      setExtractionResults(results)
      setIsExtracting(false)
    }, 2000)
  }

  const handleActionComplete = (cardId: string, action: string) => {
    // Get sample content for the completed action
    const generatedContent = getActionResultContent(action)

    setExtractionResults((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              completedActions: [
                ...(card.completedActions || []),
                {
                  action,
                  timestamp: new Date().toISOString(),
                  generatedContent,
                },
              ],
            }
          : card,
      ),
    )
  }

  const handleViewDetails = (result: ExtractionResult) => {
    setSelectedResult(result)
    setIsDetailsModalOpen(true)
  }

  const toggleExtractionSelection = (typeId: string) => {
    if (selectedExtractions.includes(typeId)) {
      setSelectedExtractions(selectedExtractions.filter((id) => id !== typeId))
    } else {
      setSelectedExtractions([...selectedExtractions, typeId])
    }
  }

  // Handle title and description updates
  const handleTitleUpdate = () => {
    // In a real app, you would save this to the backend
    setIsEditingTitle(false)
  }

  const handleDescriptionUpdate = () => {
    // In a real app, you would save this to the backend
    setIsEditingDescription(false)
  }

  // Filter extraction results by type
  const filteredResults =
    typeFilter === "all" ? extractionResults : extractionResults.filter((result) => result.type === typeFilter)

  if (!meeting) {
    return <div>Meeting not found</div>
  }

  return (
    <div className="rounded-lg overflow-hidden">
      {/* Meeting header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="w-full">
            {isEditingTitle ? (
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="text-2xl font-bold h-auto py-1"
                  autoFocus
                  onBlur={handleTitleUpdate}
                  onKeyDown={(e) => e.key === "Enter" && handleTitleUpdate()}
                />
                <Button variant="ghost" size="sm" onClick={handleTitleUpdate}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsEditingTitle(true)}>
                <h1 className="text-2xl font-bold">{editableTitle}</h1>
                <Pencil className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {isEditingDescription ? (
              <div className="flex flex-col gap-2 mt-2">
                <Textarea
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                  className="text-gray-600 min-h-[80px]"
                  autoFocus
                  onBlur={handleDescriptionUpdate}
                />
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={handleDescriptionUpdate}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="mt-2 text-gray-600 cursor-pointer group flex items-start gap-2"
                onClick={() => setIsEditingDescription(true)}
              >
                <p>{editableDescription || "Add a meeting description..."}</p>
                <Pencil className="h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{meeting.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{meeting.participants.length} participants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center mt-4 gap-1">
          {meeting.participants.slice(0, 2).map((participant, index) => (
            <Avatar key={participant.id} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={participant.avatar} alt={participant.name} />
              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {meeting.participants.length > 2 && (
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
              +{meeting.participants.length - 2}
            </div>
          )}
        </div>

        {/* Meeting summary */}
        {meeting.summary && <div className="mt-4 text-gray-600">{meeting.summary}</div>}
      </div>

      {/* Main content - Tabbed Interface */}
      <div className="flex flex-col overflow-hidden">
        <Tabs defaultValue="extractions" className="flex flex-col">
          <div className="border-y">
            <TabsList className="h-10 w-full rounded-none border-b bg-transparent px-6">
              <TabsTrigger
                value="extractions"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Extractions & Actions
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Transcript
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Extractions Tab */}
          <TabsContent value="extractions" className="overflow-auto data-[state=active]:mt-0">
            <div className="p-6">
              {meeting.transcript && !extractionResults.length && (
                <>
                  <h3 className="text-lg font-medium mb-4">Select extraction types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {EXTRACTION_TYPES.map((type) => (
                      <ExtractionTypeCard
                        key={type.id}
                        type={type}
                        isSelected={selectedExtractions.includes(type.id)}
                        onToggle={() => toggleExtractionSelection(type.id)}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={handleRunExtractions}
                    disabled={selectedExtractions.length === 0 || isExtracting}
                    className="mb-6"
                    size="lg"
                  >
                    {isExtracting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      "Run Extractions"
                    )}
                  </Button>
                </>
              )}

              {/* Extraction Results */}
              {extractionResults.length > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Extraction Results</h3>
                    <div className="w-[200px]">
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="actionItem">Action Items</SelectItem>
                          <SelectItem value="userStory">User Stories</SelectItem>
                          <SelectItem value="decision">Decisions</SelectItem>
                          <SelectItem value="openQuestion">Open Questions</SelectItem>
                          <SelectItem value="painPoint">Pain Points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {extractionResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <Card key={result.id} className="border border-gray-200 shadow-sm overflow-hidden">
                      <CardHeader className="p-4 pb-3 bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                "px-2 py-0.5 text-xs font-medium",
                                result.type === "userStory" && "bg-blue-100 text-blue-800",
                                result.type === "openQuestion" && "bg-purple-100 text-purple-800",
                                result.type === "actionItem" && "bg-green-100 text-green-800",
                                result.type === "decision" && "bg-amber-100 text-amber-800",
                                result.type === "painPoint" && "bg-red-100 text-red-800",
                                result.type === "requirement" && "bg-indigo-100 text-indigo-800",
                                result.type === "summary" && "bg-gray-100 text-gray-800",
                              )}
                            >
                              {result.type === "userStory"
                                ? "User Story"
                                : result.type === "openQuestion"
                                  ? "Open Question"
                                  : result.type === "actionItem"
                                    ? "Action Item"
                                    : result.type === "decision"
                                      ? "Decision"
                                      : result.type === "painPoint"
                                        ? "Pain Point"
                                        : result.type === "summary"
                                          ? "Summary"
                                          : result.type}
                            </Badge>
                            <CardTitle className="text-base font-semibold">{result.title}</CardTitle>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(result)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-semibold text-gray-500" disabled>
                                Actions
                              </DropdownMenuItem>
                              {result.actions.map((action) => {
                                const isCompleted = result.completedActions?.some((a) => a.action === action)
                                return (
                                  <DropdownMenuItem
                                    key={action}
                                    onClick={() => setActiveAction({ card: result, action })}
                                    className={cn("pl-6", isCompleted && "text-green-600")}
                                  >
                                    <div className="flex items-center w-full">
                                      {getActionIcon(action)}
                                      <span>{getActionLabel(action)}</span>
                                      {isCompleted && <Check className="ml-auto h-4 w-4" />}
                                    </div>
                                  </DropdownMenuItem>
                                )
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 text-sm text-gray-600 line-clamp-3">
                        <p>{result.content}</p>
                      </CardContent>
                      {result.completedActions && result.completedActions.length > 0 && (
                        <CardFooter className="px-4 py-3 bg-gray-50 flex flex-col gap-2 border-t">
                          {result.completedActions.slice(0, 1).map((completedAction) => {
                            // Get sample content based on the action type
                            const actionContent =
                              completedAction.generatedContent || getActionResultContent(completedAction.action)

                            return (
                              <div key={completedAction.action} className="w-full">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    {getActionIcon(completedAction.action)}
                                    <span>{getActionLabel(completedAction.action)} completed</span>
                                  </div>
                                </div>
                                <div className="text-sm bg-muted/30 p-2 rounded-sm line-clamp-2">{actionContent}</div>
                              </div>
                            )
                          })}

                          <div className="flex justify-end mt-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(result)}
                              className="ml-auto flex items-center gap-1 text-xs"
                            >
                              View Details
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </CardFooter>
                      )}
                      {(!result.completedActions || result.completedActions.length === 0) && (
                        <CardFooter className="px-4 py-2 bg-gray-50 border-t flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(result)}
                            className="flex items-center gap-1 text-xs"
                          >
                            View Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    {meeting.transcript ? (
                      selectedExtractions.length > 0 ? (
                        isExtracting ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                            <p>Analyzing transcript...</p>
                          </div>
                        ) : (
                          "Select extraction types and click 'Run Extractions' to analyze the transcript."
                        )
                      ) : (
                        "Select one or more extraction types to analyze the transcript."
                      )
                    ) : (
                      "Extractions will be available once the meeting transcript is captured."
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="overflow-auto data-[state=active]:mt-0">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Meeting Transcript</h2>
                <Button variant="outline" size="sm">
                  Full Transcript
                </Button>
              </div>
              {meeting.transcript ? (
                <div className="whitespace-pre-line text-gray-600">{meeting.transcript}</div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  {meeting.status === "upcoming"
                    ? "Transcript will appear here once the meeting starts."
                    : "No transcript available. Invite the ProductForge Bot to capture the transcript."}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Modal */}
      <ActionModal
        open={!!activeAction}
        onOpenChange={(open) => !open && setActiveAction(null)}
        action={activeAction?.action}
        card={activeAction?.card}
        onComplete={() => {
          if (activeAction) {
            handleActionComplete(activeAction.card.id, activeAction.action)
          }
          setActiveAction(null)
        }}
      />

      {/* Details Modal */}
      <DetailsModal
        result={selectedResult}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        onAction={(action) => {
          if (selectedResult) {
            setActiveAction({ card: selectedResult, action })
          }
        }}
      />
    </div>
  )
}

