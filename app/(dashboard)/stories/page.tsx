"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Zap,
  Tag,
  Download,
  Send,
  ChevronDown,
  Plus,
  Sparkles,
  Bold,
  Italic,
  List,
  ListOrdered,
  LinkIcon,
  Mic,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// Update the MOCK_STORIES array to include status
const MOCK_STORIES = [
  {
    id: "1",
    title: "Dashboard CSV Export Feature",
    description: "As a user, I want to export dashboard data as CSV so that I can analyze it in Excel or other tools.",
    labels: ["Feature", "Dashboard", "Export"],
    status: "Ready",
    createdAt: "2025-03-15T10:30:00Z",
    updatedAt: "2025-03-16T14:20:00Z",
  },
  {
    id: "2",
    title: "Improved Analytics for User Interactions",
    description: "As a stakeholder, I want better analytics to understand how users are interacting with the product.",
    labels: ["Feature", "Analytics", "High Priority"],
    status: "In Progress",
    createdAt: "2025-03-14T09:15:00Z",
    updatedAt: "2025-03-16T11:45:00Z",
  },
  {
    id: "3",
    title: "Fix Accessibility Issues in Form Components",
    description: "Address accessibility concerns on form components to ensure the product is usable by all users.",
    labels: ["Bug", "Accessibility", "Forms"],
    status: "Review",
    createdAt: "2025-03-13T16:20:00Z",
    updatedAt: "2025-03-15T08:30:00Z",
  },
  {
    id: "4",
    title: "User Profile Management Screen",
    description: "As a user, I want to be able to update my profile information and preferences from a single screen.",
    labels: ["Feature", "User Management", "Profile"],
    status: "Draft",
    createdAt: "2025-03-12T14:10:00Z",
    updatedAt: "2025-03-14T09:25:00Z",
  },
  {
    id: "5",
    title: "Implement Dark Mode Support",
    description:
      "As a user, I want a dark mode option so that I can reduce eye strain when using the application in low-light environments.",
    labels: ["Feature", "UI/UX", "Theme"],
    status: "Ready",
    createdAt: "2025-03-11T11:05:00Z",
    updatedAt: "2025-03-13T15:40:00Z",
  },
  {
    id: "6",
    title: "Performance Optimization for Dashboard Loading",
    description: "Improve the loading time of the dashboard by optimizing database queries and implementing caching.",
    labels: ["Performance", "Dashboard", "Optimization"],
    status: "Completed",
    createdAt: "2025-03-10T13:25:00Z",
    updatedAt: "2025-03-12T10:15:00Z",
  },
  {
    id: "7",
    title: "Mobile Responsive Design for Reports Page",
    description: "Ensure the reports page is fully responsive and usable on mobile devices of various screen sizes.",
    labels: ["UI/UX", "Mobile", "Responsive"],
    status: "In Progress",
    createdAt: "2025-03-09T15:30:00Z",
    updatedAt: "2025-03-11T12:20:00Z",
  },
  {
    id: "8",
    title: "Integration with Third-Party Calendar Services",
    description:
      "As a user, I want to sync my meetings with external calendar services like Google Calendar and Outlook.",
    labels: ["Feature", "Integration", "Calendar"],
    status: "Draft",
    createdAt: "2025-03-08T10:45:00Z",
    updatedAt: "2025-03-10T09:30:00Z",
  },
  {
    id: "9",
    title: "API for Prompt Sequencer Integration",
    description: `As a developer, I want a publicly accessible API that interfaces with our Prompt Sequencer, so that I can programmatically trigger the correct LLM-powered sequences for any meeting.

Acceptance Criteria:
1. The API endpoint for the Prompt Sequencer is publicly accessible
2. A meeting context is used to understand the functionality of the User Story
3. An API key is generated on Prompt Sequencer and passed along as part of the header
4. The API key is passed along as 'x-pf-api-key' in the header
5. The API accepts an initial input as part of the post body
6. Environment variables such as today's date or meeting date are available for the API
7. The business logic is converted to run on both client and server side
8. The API can provide structured data back, including the date of the meeting
9. The bot can handle the population of the meeting date before running the API call
10. The API can be used to fetch the available sequences for mapping to actions and triggers in the meeting experience`,
    labels: ["Feature", "API", "Integration"],
    status: "Review",
    createdAt: "2025-03-07T09:30:00Z",
    updatedAt: "2025-03-09T14:15:00Z",
  },
]

// Label color mapping
const LABEL_COLORS: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-800 border-blue-200",
  Bug: "bg-red-100 text-red-800 border-red-200",
  Performance: "bg-purple-100 text-purple-800 border-purple-200",
  "UI/UX": "bg-green-100 text-green-800 border-green-200",
  Analytics: "bg-amber-100 text-amber-800 border-amber-200",
  Dashboard: "bg-sky-100 text-sky-800 border-sky-200",
  Export: "bg-indigo-100 text-indigo-800 border-indigo-200",
  "High Priority": "bg-rose-100 text-rose-800 border-rose-200",
  Accessibility: "bg-teal-100 text-teal-800 border-teal-200",
  Forms: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "User Management": "bg-violet-100 text-violet-800 border-violet-200",
  Profile: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  Theme: "bg-lime-100 text-lime-800 border-lime-200",
  Optimization: "bg-cyan-100 text-cyan-800 border-cyan-200",
  Mobile: "bg-orange-100 text-orange-800 border-orange-200",
  Responsive: "bg-pink-100 text-pink-800 border-pink-200",
  Integration: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Calendar: "bg-gray-100 text-gray-800 border-gray-200",
  API: "bg-violet-100 text-violet-800 border-violet-200",
}

// Add status color mapping
const STATUS_COLORS: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-800 border-gray-200",
  Ready: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-amber-100 text-amber-800 border-amber-200",
  Review: "bg-purple-100 text-purple-800 border-purple-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
}

// All available labels for filtering and adding
const ALL_LABELS = [
  "Feature",
  "Bug",
  "Performance",
  "UI/UX",
  "Analytics",
  "Dashboard",
  "Export",
  "High Priority",
  "Accessibility",
  "Forms",
  "User Management",
  "Profile",
  "Theme",
  "Optimization",
  "Mobile",
  "Responsive",
  "Integration",
  "Calendar",
  "API",
]

// Rich Text Editor Component
function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isRecording, setIsRecording] = useState(false)

  const handleBold = () => {
    document.execCommand("bold", false)
    updateValue()
  }

  const handleItalic = () => {
    document.execCommand("italic", false)
    updateValue()
  }

  const handleBulletList = () => {
    document.execCommand("insertUnorderedList", false)
    updateValue()
  }

  const handleNumberedList = () => {
    document.execCommand("insertOrderedList", false)
    updateValue()
  }

  const handleLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      document.execCommand("createLink", false, url)
      updateValue()
    }
  }

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleStartRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    setIsRecording(true)

    // This is a mock implementation since we can't actually use the Web Speech API in this environment
    // In a real implementation, you would use the SpeechRecognition API
    setTimeout(() => {
      setIsRecording(false)
      alert("Speech recognition would be active here. This is just a mock implementation.")
    }, 2000)
  }

  const handleRefine = () => {
    alert("AI refinement would be triggered here")
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted/30 p-2 flex items-center gap-2 border-b">
        <Button variant="ghost" size="icon" onClick={handleBold} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleItalic} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="icon" onClick={handleBulletList} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleNumberedList} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleLink} title="Insert Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1"></div>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant={isRecording ? "default" : "secondary"}
          className={
            isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "bg-lime-200 text-lime-800 hover:bg-lime-300"
          }
          onClick={handleStartRecording}
        >
          <Mic className="mr-2 h-4 w-4" />
          {isRecording ? "Recording..." : "Start"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefine}
          title="AI Refinement"
          className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
        >
          <Zap className="h-5 w-5" />
        </Button>
      </div>
      <div
        ref={editorRef}
        className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={updateValue}
        onBlur={updateValue}
      />
    </div>
  )
}

export default function StoriesPage() {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStories, setSelectedStories] = useState<string[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentStory, setCurrentStory] = useState<(typeof MOCK_STORIES)[0] | null>(null)

  // State for label management
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  // State for delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [storiesToDelete, setStoriesToDelete] = useState<string[]>([])

  // State for refinement session
  const [isRefinementModalOpen, setIsRefinementModalOpen] = useState(false)
  const [storyToRefine, setStoryToRefine] = useState<(typeof MOCK_STORIES)[0] | null>(null)
  const [refinedContent, setRefinedContent] = useState("")
  const [isRefining, setIsRefining] = useState(false)

  // Filter stories based on search query
  const filteredStories = MOCK_STORIES.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.labels.some((label) => label.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStories([])
    } else {
      setSelectedStories(filteredStories.map((story) => story.id))
    }
    setIsAllSelected(!isAllSelected)
    setShowBulkActions(!isAllSelected && filteredStories.length > 0)
  }

  // Handle individual story selection
  const handleSelectStory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent opening the edit modal when clicking the checkbox

    if (selectedStories.includes(id)) {
      setSelectedStories(selectedStories.filter((storyId) => storyId !== id))
    } else {
      setSelectedStories([...selectedStories, id])
    }

    // Update bulk actions visibility
    const updatedSelection = selectedStories.includes(id)
      ? selectedStories.filter((storyId) => storyId !== id)
      : [...selectedStories, id]

    setShowBulkActions(updatedSelection.length > 0)

    // Update "select all" state
    setIsAllSelected(updatedSelection.length === filteredStories.length && filteredStories.length > 0)
  }

  // Handle row click to open edit modal
  const handleRowClick = (story: (typeof MOCK_STORIES)[0]) => {
    handleEditStory(story)
  }

  // Update the handleEditStory function to include status
  const handleEditStory = (story: (typeof MOCK_STORIES)[0]) => {
    setCurrentStory(story)
    setSelectedLabels(story.labels)
    setIsEditModalOpen(true)
  }

  // Handle save edited story
  const handleSaveStory = () => {
    // In a real app, you would save to the backend here
    setIsEditModalOpen(false)
    setCurrentStory(null)
    setSelectedLabels([])
  }

  // Handle delete story confirmation
  const handleDeleteConfirmation = (ids: string[]) => {
    setStoriesToDelete(ids)
    setIsDeleteModalOpen(true)
  }

  // Handle delete story
  const handleDeleteStories = () => {
    // In a real app, you would delete from the backend here
    setIsDeleteModalOpen(false)
    setStoriesToDelete([])
    setSelectedStories(selectedStories.filter((id) => !storiesToDelete.includes(id)))
    setShowBulkActions(selectedStories.filter((id) => !storiesToDelete.includes(id)).length > 0)
  }

  // Handle bulk label management
  const handleBulkLabels = () => {
    setSelectedLabels([])
    setIsLabelModalOpen(true)
  }

  // Handle save labels
  const handleSaveLabels = () => {
    // In a real app, you would update labels on the backend here
    setIsLabelModalOpen(false)
    setSelectedLabels([])
  }

  // Handle start refinement session
  const handleStartRefinement = (story: (typeof MOCK_STORIES)[0]) => {
    setStoryToRefine(story)
    setRefinedContent("")
    setIsRefinementModalOpen(true)
  }

  // Handle run refinement
  const handleRunRefinement = () => {
    if (!storyToRefine) return

    setIsRefining(true)

    // Simulate AI refinement with a timeout
    setTimeout(() => {
      // This would be replaced with actual AI refinement logic
      setRefinedContent(
        `# Refined User Story: ${storyToRefine.title}\n\n` +
          `## Description\n${storyToRefine.description}\n\n` +
          `## Acceptance Criteria\n` +
          `1. User can access the export functionality from the dashboard\n` +
          `2. User can select which data to include in the export\n` +
          `3. System generates a properly formatted CSV file\n` +
          `4. User receives a download prompt when the CSV is ready\n` +
          `5. System logs the export action for analytics\n\n` +
          `## Additional Notes\n` +
          `- Consider adding Excel (.xlsx) format in the future\n` +
          `- Ensure exported data complies with data privacy regulations\n` +
          `- Add rate limiting to prevent abuse`,
      )
      setIsRefining(false)
    }, 2000)
  }

  // Handle save refinement
  const handleSaveRefinement = () => {
    // In a real app, you would save the refined story to the backend here
    setIsRefinementModalOpen(false)
    setStoryToRefine(null)
    setRefinedContent("")
  }

  // Handle copy to clipboard
  const handleCopyToClipboard = (story: (typeof MOCK_STORIES)[0]) => {
    navigator.clipboard.writeText(`${story.title}\n\n${story.description}\n\nLabels: ${story.labels.join(", ")}`)
    // In a real app, you would show a toast notification here
  }

  // Handle export to CSV
  const handleExportToCSV = () => {
    // In a real app, you would generate and download a CSV file here
    const storiesToExport =
      selectedStories.length > 0 ? MOCK_STORIES.filter((story) => selectedStories.includes(story.id)) : MOCK_STORIES

    console.log("Exporting stories to CSV:", storiesToExport)
    // Show a toast notification of success
  }

  // Handle send to integration
  const handleSendToIntegration = (integration: string) => {
    // In a real app, you would send the selected stories to the integration here
    const storiesToSend =
      selectedStories.length > 0 ? MOCK_STORIES.filter((story) => selectedStories.includes(story.id)) : MOCK_STORIES

    console.log(`Sending stories to ${integration}:`, storiesToSend)
    // Show a toast notification of success
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl bg-[#f8f7f4]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stories</h1>
        <Button
          onClick={() =>
            handleEditStory({
              id: "new",
              title: "",
              description: "",
              labels: [],
              status: "Draft",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          New Story
        </Button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by story title, description, or label..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="font-semibold">Filter by Label</DropdownMenuItem>
              <DropdownMenuSeparator />
              {ALL_LABELS.slice(0, 10).map((label) => (
                <DropdownMenuItem key={label}>
                  <div className="flex items-center w-full">
                    <Badge className={cn("mr-2", LABEL_COLORS[label] || "bg-gray-100 text-gray-800")}>{label}</Badge>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <div className="flex items-center w-full text-blue-600">Show all labels...</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExportToCSV()}>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSendToIntegration("Asana")}>
                <Send className="mr-2 h-4 w-4" />
                Send to Asana
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSendToIntegration("ClickUp")}>
                <Send className="mr-2 h-4 w-4" />
                Send to ClickUp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSendToIntegration("Zapier")}>
                <Zap className="mr-2 h-4 w-4" />
                Send to Zapier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bulk actions bar - visible when stories are selected */}
      {showBulkActions && (
        <div className="bg-muted/30 p-3 rounded-md mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">
              {selectedStories.length} {selectedStories.length === 1 ? "story" : "stories"} selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleBulkLabels()}>
              <Tag className="mr-2 h-4 w-4" />
              Manage Labels
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleStartRefinement(MOCK_STORIES.find((story) => story.id === selectedStories[0]) || MOCK_STORIES[0])
              }
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Start Refinement
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600"
              onClick={() => handleDeleteConfirmation(selectedStories)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Stories table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label="Select all stories" />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No stories found. Try adjusting your search or create a new story.
                </TableCell>
              </TableRow>
            ) : (
              filteredStories.map((story) => (
                <TableRow
                  key={story.id}
                  className="cursor-pointer hover:bg-muted/20"
                  onClick={() => handleRowClick(story)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedStories.includes(story.id)}
                      onCheckedChange={() => {}}
                      onClick={(e) => handleSelectStory(story.id, e)}
                      aria-label={`Select ${story.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{story.title}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {story.labels.slice(0, 3).map((label) => (
                          <Badge
                            key={label}
                            className={cn("text-xs py-0 px-2", LABEL_COLORS[label] || "bg-gray-100 text-gray-800")}
                          >
                            {label}
                          </Badge>
                        ))}
                        {story.labels.length > 3 && (
                          <Badge variant="outline" className="text-xs py-0 px-2">
                            +{story.labels.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      className={cn("text-xs py-0 px-2", STATUS_COLORS[story.status] || "bg-gray-100 text-gray-800")}
                    >
                      {story.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {new Date(story.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditStory(story)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyToClipboard(story)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy to Clipboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStartRefinement(story)}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Start Refinement
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSendToIntegration("Zapier")}>
                          <Zap className="mr-2 h-4 w-4" />
                          Send to Zapier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkLabels()}>
                          <Tag className="mr-2 h-4 w-4" />
                          Manage Labels
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteConfirmation([story.id])} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Story Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentStory?.id === "new" ? "Create New Story" : "Edit Story"}</DialogTitle>
            <DialogDescription>
              {currentStory?.id === "new"
                ? "Add a new user story to your collection."
                : "Make changes to the selected user story."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentStory?.title || ""}
                onChange={(e) => setCurrentStory((current) => (current ? { ...current, title: e.target.value } : null))}
                placeholder="Enter a concise title for the story"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <RichTextEditor
                value={currentStory?.description || ""}
                onChange={(value) =>
                  setCurrentStory((current) => (current ? { ...current, description: value } : null))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Labels</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {selectedLabels.map((label) => (
                  <Badge
                    key={label}
                    className={cn("flex items-center gap-1", LABEL_COLORS[label] || "bg-gray-100 text-gray-800")}
                  >
                    {label}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                      onClick={() => setSelectedLabels(selectedLabels.filter((l) => l !== label))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted/50 flex items-center gap-1">
                      <Plus className="h-3 w-3" /> Add Label
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 max-h-[300px] overflow-y-auto">
                    {ALL_LABELS.filter((label) => !selectedLabels.includes(label)).map((label) => (
                      <DropdownMenuItem key={label} onClick={() => setSelectedLabels([...selectedLabels, label])}>
                        <Badge className={cn("mr-2", LABEL_COLORS[label] || "bg-gray-100 text-gray-800")}>
                          {label}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Badge
                      className={cn(
                        "mr-2",
                        STATUS_COLORS[currentStory?.status || "Draft"] || "bg-gray-100 text-gray-800",
                      )}
                    >
                      {currentStory?.status || "Draft"}
                    </Badge>
                    <span className="ml-1">Change Status</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {Object.keys(STATUS_COLORS).map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setCurrentStory((current) => (current ? { ...current, status } : null))}
                    >
                      <Badge className={cn("mr-2", STATUS_COLORS[status])}>{status}</Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              {storiesToDelete.length === 1 ? "this story" : `these ${storiesToDelete.length} stories`}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStories}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Label Management Modal */}
      <Dialog open={isLabelModalOpen} onOpenChange={setIsLabelModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Labels</DialogTitle>
            <DialogDescription>
              {selectedStories.length > 0
                ? `Add or remove labels for ${selectedStories.length} selected ${selectedStories.length === 1 ? "story" : "stories"}.`
                : "Manage labels for this story."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[150px] max-h-[250px] overflow-y-auto">
              {ALL_LABELS.map((label) => (
                <Badge
                  key={label}
                  className={cn(
                    "cursor-pointer",
                    selectedLabels.includes(label)
                      ? LABEL_COLORS[label] || "bg-gray-100 text-gray-800"
                      : "bg-gray-100/50 text-gray-500 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    if (selectedLabels.includes(label)) {
                      setSelectedLabels(selectedLabels.filter((l) => l !== label))
                    } else {
                      setSelectedLabels([...selectedLabels, label])
                    }
                  }}
                >
                  {label}
                  {selectedLabels.includes(label) && <span className="ml-1">✓</span>}
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLabelModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLabels}>Apply Labels</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refinement Session Modal */}
      <Dialog open={isRefinementModalOpen} onOpenChange={setIsRefinementModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Story Refinement</DialogTitle>
            <DialogDescription>
              Use AI to refine and enhance your user story with acceptance criteria and additional details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Original Story</Label>
              <div className="p-3 bg-muted/30 rounded-md">
                <h3 className="font-medium">{storyToRefine?.title}</h3>
                <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: storyToRefine?.description || "" }} />
                <div className="flex flex-wrap gap-1 mt-2">
                  {storyToRefine?.labels.map((label) => (
                    <Badge
                      key={label}
                      className={cn("text-xs py-0 px-2", LABEL_COLORS[label] || "bg-gray-100 text-gray-800")}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {!refinedContent && (
              <div className="flex justify-center">
                <Button onClick={handleRunRefinement} disabled={isRefining} className="mt-2">
                  {isRefining ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Refining...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Run AI Refinement
                    </>
                  )}
                </Button>
              </div>
            )}

            {refinedContent && (
              <div className="grid gap-2">
                <Label>Refined Story</Label>
                <RichTextEditor value={refinedContent} onChange={setRefinedContent} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

