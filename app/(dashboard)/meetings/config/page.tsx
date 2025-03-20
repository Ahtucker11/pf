"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronLeft, Plus, Pencil, Trash2, AlertCircle, Save, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

// Types for our config items
type ConfigItemType = "extraction" | "action"

interface ConfigItem {
  id: string
  label: string
  type: ConfigItemType
  workflowId: string
  status: "enabled" | "disabled"
  description?: string
}

// Mock initial data
const initialConfigItems: ConfigItem[] = [
  {
    id: "1",
    label: "Meeting Summary",
    type: "extraction",
    workflowId: "ext-summary-001",
    status: "enabled",
    description: "Comprehensive overview of the meeting's key points and outcomes",
  },
  {
    id: "2",
    label: "Action Items",
    type: "extraction",
    workflowId: "ext-actions-002",
    status: "enabled",
    description: "Tasks and responsibilities assigned during the meeting",
  },
  {
    id: "3",
    label: "User Stories",
    type: "extraction",
    workflowId: "ext-stories-003",
    status: "enabled",
    description: "User-focused requirements extracted from the discussion",
  },
  {
    id: "4",
    label: "Decisions Made",
    type: "extraction",
    workflowId: "ext-decisions-004",
    status: "enabled",
    description: "Key decisions and conclusions reached during the meeting",
  },
  {
    id: "5",
    label: "Open Questions",
    type: "extraction",
    workflowId: "ext-questions-005",
    status: "enabled",
    description: "Unresolved questions that need further discussion",
  },
  {
    id: "6",
    label: "Pain Points",
    type: "extraction",
    workflowId: "ext-painpoints-006",
    status: "disabled",
    description: "Issues, challenges, and concerns raised during the meeting",
  },
  {
    id: "8",
    label: "Write User Story",
    type: "action",
    workflowId: "act-userstory-001",
    status: "enabled",
    description: "Generate a well-formatted user story from meeting content",
  },
  {
    id: "9",
    label: "Draft Email",
    type: "action",
    workflowId: "act-email-002",
    status: "enabled",
    description: "Create an email draft based on meeting discussion points",
  },
  {
    id: "10",
    label: "Research",
    type: "action",
    workflowId: "act-research-003",
    status: "enabled",
    description: "Generate research notes and questions for further investigation",
  },
  {
    id: "11",
    label: "Add to Backlog",
    type: "action",
    workflowId: "act-backlog-004",
    status: "enabled",
    description: "Format and prepare an item for addition to the product backlog",
  },
  {
    id: "12",
    label: "Assign Task",
    type: "action",
    workflowId: "act-assign-005",
    status: "enabled",
    description: "Create an assignable task with details from the meeting",
  },
  {
    id: "13",
    label: "Schedule Meeting",
    type: "action",
    workflowId: "act-schedule-006",
    status: "disabled",
    description: "Generate a follow-up meeting with agenda based on discussion",
  },
]

export default function ConfigPage() {
  const { toast } = useToast()
  const [configItems, setConfigItems] = useState<ConfigItem[]>([])
  const [apiKey, setApiKey] = useState("")
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false)
  const [editItem, setEditItem] = useState<ConfigItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState<Omit<ConfigItem, "id">>({
    label: "",
    type: "extraction",
    workflowId: "",
    status: "enabled",
    description: "",
  })

  // Load data from localStorage on initial render
  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    const savedItems = localStorage.getItem("configItems")
    const savedApiKey = localStorage.getItem("promptSequencerApiKey")

    if (savedItems) {
      setConfigItems(JSON.parse(savedItems))
    } else {
      setConfigItems(initialConfigItems)
    }

    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  // Save config items to localStorage whenever they change
  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    if (configItems.length > 0) {
      localStorage.setItem("configItems", JSON.stringify(configItems))
    }
  }, [configItems])

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    // Only run on the client side
    if (typeof window === "undefined") return

    if (apiKey) {
      localStorage.setItem("promptSequencerApiKey", apiKey)
    }
  }, [apiKey])

  const handleToggleStatus = (id: string) => {
    setConfigItems(
      configItems.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "enabled" ? "disabled" : "enabled"
          return { ...item, status: newStatus }
        }
        return item
      }),
    )

    toast({
      title: "Status updated",
      description: "The configuration item status has been updated.",
    })
  }

  const handleDeleteItem = (id: string) => {
    setConfigItems(configItems.filter((item) => item.id !== id))

    toast({
      title: "Item deleted",
      description: "The configuration item has been deleted.",
    })
  }

  const handleEditItem = (item: ConfigItem) => {
    setEditItem(item)
  }

  const handleSaveEdit = () => {
    if (editItem) {
      setConfigItems(
        configItems.map((item) => {
          if (item.id === editItem.id) {
            return editItem
          }
          return item
        }),
      )
      setEditItem(null)

      toast({
        title: "Item updated",
        description: "The configuration item has been updated successfully.",
      })
    }
  }

  const handleAddItem = () => {
    const id = String(Math.max(...configItems.map((item) => Number.parseInt(item.id))) + 1)
    setConfigItems([...configItems, { id, ...newItem }])
    setNewItem({
      label: "",
      type: "extraction",
      workflowId: "",
      status: "enabled",
      description: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Item added",
      description: "The new configuration item has been added successfully.",
    })
  }

  const handleSaveApiKey = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("promptSequencerApiKey", apiKey)
    }

    toast({
      title: "API Key saved",
      description: "The Prompt Sequencer API key has been saved successfully.",
    })
  }

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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meetings Configuration</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Admin Access Only</AlertTitle>
        <AlertDescription>
          This configuration page is only accessible to administrators. Changes made here will affect all users.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="extraction-action" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="extraction-action">Extraction & Action Options</TabsTrigger>
          <TabsTrigger value="api-key">API Key Management</TabsTrigger>
        </TabsList>

        <TabsContent value="extraction-action">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Extraction & Action Configuration</CardTitle>
                  <CardDescription>
                    Manage the extraction types and actions available to users in meetings
                  </CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Configuration Item</DialogTitle>
                      <DialogDescription>Create a new extraction type or action for meeting analysis</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-label">Label</Label>
                        <Input
                          id="new-label"
                          value={newItem.label}
                          onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                          placeholder="e.g., Technical Requirements"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-type">Type</Label>
                        <Select
                          value={newItem.type}
                          onValueChange={(value: ConfigItemType) => setNewItem({ ...newItem, type: value })}
                        >
                          <SelectTrigger id="new-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="extraction">Extraction</SelectItem>
                            <SelectItem value="action">Action</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-workflow">Workflow ID</Label>
                        <Input
                          id="new-workflow"
                          value={newItem.workflowId}
                          onChange={(e) => setNewItem({ ...newItem, workflowId: e.target.value })}
                          placeholder="e.g., ext-technical-008"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-description">Description</Label>
                        <Textarea
                          id="new-description"
                          value={newItem.description}
                          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          placeholder="Brief description of what this extraction or action does"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="new-status">Enabled</Label>
                        <Switch
                          id="new-status"
                          checked={newItem.status === "enabled"}
                          onCheckedChange={(checked) =>
                            setNewItem({ ...newItem, status: checked ? "enabled" : "disabled" })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddItem} disabled={!newItem.label || !newItem.workflowId}>
                        Add Item
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Workflow ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.type === "extraction"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {item.description || "No description"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-sm">{item.workflowId}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            checked={item.status === "enabled"}
                            onCheckedChange={() => handleToggleStatus(item.id)}
                          />
                          <span className="ml-2 text-sm">{item.status === "enabled" ? "Enabled" : "Disabled"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          {editItem && (
            <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Configuration Item</DialogTitle>
                  <DialogDescription>Update the details for this extraction or action</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-label">Label</Label>
                    <Input
                      id="edit-label"
                      value={editItem.label}
                      onChange={(e) => setEditItem({ ...editItem, label: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <Select
                      value={editItem.type}
                      onValueChange={(value: ConfigItemType) => setEditItem({ ...editItem, type: value })}
                    >
                      <SelectTrigger id="edit-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="extraction">Extraction</SelectItem>
                        <SelectItem value="action">Action</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-workflow">Workflow ID</Label>
                    <Input
                      id="edit-workflow"
                      value={editItem.workflowId}
                      onChange={(e) => setEditItem({ ...editItem, workflowId: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editItem.description || ""}
                      onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                      placeholder="Brief description of what this extraction or action does"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="edit-status">Enabled</Label>
                    <Switch
                      id="edit-status"
                      checked={editItem.status === "enabled"}
                      onCheckedChange={(checked) =>
                        setEditItem({ ...editItem, status: checked ? "enabled" : "disabled" })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditItem(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="api-key">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Sequencer API Key</CardTitle>
              <CardDescription>
                Set the global API key used to connect with the Prompt Sequencer service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="api-key"
                        type={isApiKeyVisible ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Prompt Sequencer API key"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                      >
                        {isApiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button className="ml-2" onClick={handleSaveApiKey}>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    This API key is used for all Prompt Sequencer calls made by the application. Keep it secure and
                    rotate it regularly.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Last updated:{" "}
                {typeof window !== "undefined" && localStorage.getItem("promptSequencerApiKey") ? "Today" : "Never"}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

