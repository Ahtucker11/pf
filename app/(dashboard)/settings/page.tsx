"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Star, StarOff, X } from "lucide-react"

export default function SettingsPage() {
  // Product Context state
  const [keyFeatures, setKeyFeatures] = useState([
    "Identify user stories in documents",
    "Chrome Extension",
    "AI-powered analysis",
    "Meeting transcription",
  ])
  const [newFeature, setNewFeature] = useState("")

  const [keyBenefits, setKeyBenefits] = useState([
    "Quick and easy refinement",
    "Standardized artifact format",
    "Time savings",
    "Improved collaboration",
  ])
  const [newBenefit, setNewBenefit] = useState("")

  // Personas state
  const [personas, setPersonas] = useState([
    {
      id: 1,
      name: "Product Manager",
      title: "Senior Product Manager",
      description: "Manages product roadmap and prioritization",
      isDefault: true,
      keyProblems: ["Backlog management", "Feature prioritization", "Stakeholder alignment"],
    },
    {
      id: 2,
      name: "UX Designer",
      title: "UX/UI Designer",
      description: "Designs user interfaces and experiences",
      isDefault: false,
      keyProblems: ["User research", "Prototyping", "Design system consistency"],
    },
    {
      id: 3,
      name: "Developer",
      title: "Software Engineer",
      description: "Implements features and fixes bugs",
      isDefault: false,
      keyProblems: ["Technical debt", "Code quality", "Feature complexity"],
    },
    {
      id: 4,
      name: "Stakeholder",
      title: "Business Stakeholder",
      description: "Provides business requirements and feedback",
      isDefault: false,
      keyProblems: ["ROI tracking", "Feature requests", "Timeline expectations"],
    },
    {
      id: 5,
      name: "Marketing",
      title: "Marketing Specialist",
      description: "Promotes the product and manages campaigns",
      isDefault: false,
      keyProblems: ["Product messaging", "Feature highlights", "Market positioning"],
    },
  ])

  const [editingPersona, setEditingPersona] = useState<null | any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newProblem, setNewProblem] = useState("")

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setKeyFeatures([...keyFeatures, newFeature.trim()])
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setKeyFeatures(keyFeatures.filter((f) => f !== feature))
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setKeyBenefits([...keyBenefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const handleRemoveBenefit = (benefit: string) => {
    setKeyBenefits(keyBenefits.filter((b) => b !== benefit))
  }

  const handleEditPersona = (persona: any) => {
    setEditingPersona({ ...persona })
    setIsEditDialogOpen(true)
  }

  const handleSavePersona = () => {
    if (editingPersona) {
      setPersonas(personas.map((p) => (p.id === editingPersona.id ? editingPersona : p)))
      setIsEditDialogOpen(false)
      setEditingPersona(null)
    }
  }

  const handleAddProblem = () => {
    if (newProblem.trim() && editingPersona) {
      setEditingPersona({
        ...editingPersona,
        keyProblems: [...editingPersona.keyProblems, newProblem.trim()],
      })
      setNewProblem("")
    }
  }

  const handleRemoveProblem = (problem: string) => {
    if (editingPersona) {
      setEditingPersona({
        ...editingPersona,
        keyProblems: editingPersona.keyProblems.filter((p: string) => p !== problem),
      })
    }
  }

  const handleSetDefaultPersona = (id: number) => {
    setPersonas(
      personas.map((p) => ({
        ...p,
        isDefault: p.id === id,
      })),
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl bg-[#f8f7f4]">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="product-context" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="product-context">Product Context</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
          <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="product-context">
          <Card>
            <CardHeader>
              <CardTitle>Product Context</CardTitle>
              <CardDescription>Define the context of your product for better meeting analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" defaultValue="ProductForge" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea
                  id="product-description"
                  rows={4}
                  defaultValue="ProductForge is an AI-driven tool that helps product teams automatically extract and create user stories from meeting transcripts. It integrates with tools like Zoom and Jira to streamline the process of capturing requirements and turning conversations into actionable items. The platform uses natural language processing to identify key points, requirements, and action items from meetings, saving teams time and ensuring nothing important is missed."
                />
              </div>

              <div className="space-y-2">
                <Label>Key Features</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {keyFeatures.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 gap-1">
                      {feature}
                      <button
                        onClick={() => handleRemoveFeature(feature)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature} type="button">
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Key User Benefits</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {keyBenefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 gap-1">
                      {benefit}
                      <button
                        onClick={() => handleRemoveBenefit(benefit)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a benefit"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddBenefit()}
                  />
                  <Button onClick={handleAddBenefit} type="button">
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Type</Label>
                <RadioGroup defaultValue="b2b" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b2c" id="b2c" />
                    <Label htmlFor="b2c">B2C</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b2b" id="b2b" />
                    <Label htmlFor="b2b">B2B</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="marketplace" id="marketplace" />
                    <Label htmlFor="marketplace">Marketplace</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-type" />
                    <Label htmlFor="other-type">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Development Phase</Label>
                <RadioGroup defaultValue="growth" className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="concept" id="concept" />
                    <Label htmlFor="concept">Concept</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="growth" id="growth" />
                    <Label htmlFor="growth">Growth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maturity" id="maturity" />
                    <Label htmlFor="maturity">Maturity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saturation" id="saturation" />
                    <Label htmlFor="saturation">Saturation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="end-of-life" id="end-of-life" />
                    <Label htmlFor="end-of-life">End of life</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Pricing Model</Label>
                <RadioGroup defaultValue="subscription" className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">1-time purchase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freemium" id="freemium" />
                    <Label htmlFor="freemium">Freemium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subscription" id="subscription" />
                    <Label htmlFor="subscription">Subscription</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usage-based" id="usage-based" />
                    <Label htmlFor="usage-based">Usage-based</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other-pricing" id="other-pricing" />
                    <Label htmlFor="other-pricing">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-url">Product URL</Label>
                <Input id="product-url" defaultValue="https://productforge.ai" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="active-users">Active Users</Label>
                <Input id="active-users" defaultValue="2,500" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="personas">
          <Card>
            <CardHeader>
              <CardTitle>Personas</CardTitle>
              <CardDescription>Define user personas for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {personas.map((persona) => (
                <div key={persona.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSetDefaultPersona(persona.id)}
                      className="text-muted-foreground hover:text-primary"
                      title={persona.isDefault ? "Default persona" : "Set as default"}
                    >
                      {persona.isDefault ? (
                        <Star className="h-5 w-5 fill-primary text-primary" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <p className="font-medium">{persona.name}</p>
                      <p className="text-sm text-muted-foreground">{persona.title}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEditPersona(persona)}>
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Add Persona</Button>
            </CardFooter>
          </Card>

          {/* Edit Persona Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Persona</DialogTitle>
                <DialogDescription>Update the details for this persona</DialogDescription>
              </DialogHeader>

              {editingPersona && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="persona-name">Name</Label>
                    <Input
                      id="persona-name"
                      value={editingPersona.name}
                      onChange={(e) => setEditingPersona({ ...editingPersona, name: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="persona-title">Title</Label>
                    <Input
                      id="persona-title"
                      value={editingPersona.title}
                      onChange={(e) => setEditingPersona({ ...editingPersona, title: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="persona-description">Description</Label>
                    <Textarea
                      id="persona-description"
                      rows={3}
                      value={editingPersona.description}
                      onChange={(e) => setEditingPersona({ ...editingPersona, description: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Key Problems</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editingPersona.keyProblems.map((problem: string, index: number) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 gap-1">
                          {problem}
                          <button
                            onClick={() => handleRemoveProblem(problem)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a problem"
                        value={newProblem}
                        onChange={(e) => setNewProblem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddProblem()}
                      />
                      <Button onClick={handleAddProblem} type="button">
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="default-persona"
                      checked={editingPersona.isDefault}
                      onCheckedChange={(checked) => setEditingPersona({ ...editingPersona, isDefault: checked })}
                    />
                    <Label htmlFor="default-persona">Set as default persona</Label>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSavePersona}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="tech-stack">
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Define the technologies used in your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Frontend", technologies: "React, Next.js, TypeScript" },
                { name: "Backend", technologies: "Node.js, Express, MongoDB" },
                { name: "Infrastructure", technologies: "AWS, Docker, Kubernetes" },
                { name: "Testing", technologies: "Jest, Cypress, Playwright" },
                { name: "DevOps", technologies: "GitHub Actions, Jenkins, CircleCI" },
              ].map((stack, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{stack.name}</p>
                    <p className="text-sm text-muted-foreground">{stack.technologies}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Add Technology</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Manage templates for meeting outputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "User Story Template", description: "Template for generating user stories from meetings" },
                { name: "Action Item Template", description: "Template for generating action items from meetings" },
                { name: "Meeting Summary Template", description: "Template for generating meeting summaries" },
                { name: "Email Template", description: "Template for generating follow-up emails" },
                { name: "Presentation Template", description: "Template for generating presentation slides" },
              ].map((template, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Add Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your connected services and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Google Calendar", status: "Connected", date: "Connected on Mar 10, 2025" },
                { name: "Microsoft Teams", status: "Connected", date: "Connected on Mar 5, 2025" },
                { name: "Zoom", status: "Connected", date: "Connected on Feb 28, 2025" },
                { name: "Jira", status: "Not connected", date: "" },
                { name: "Slack", status: "Not connected", date: "" },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.status === "Connected" ? service.date : "Not connected"}
                    </p>
                  </div>
                  <Button variant={service.status === "Connected" ? "outline" : "default"}>
                    {service.status === "Connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

