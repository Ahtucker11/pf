"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Mail, Search, Loader2 } from "lucide-react"

interface ActionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: string | undefined
  card: any
  onComplete: () => void
}

export function ActionModal({ open, onOpenChange, action, card, onComplete }: ActionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [recipients, setRecipients] = useState("")

  useEffect(() => {
    if (open && action) {
      setIsLoading(true)

      // Simulate API call to generate content
      setTimeout(() => {
        if (action === "writeUserStory") {
          setGeneratedContent(`**Title:** ${card.title}

**As a** user,
**I want to** ${card.content.split("I want to ")[1]?.split(" so that")[0] || card.content.toLowerCase()}
**So that** I can achieve my goals efficiently.

**Acceptance Criteria:**
- Feature should be accessible via the main dashboard
- UI should match the existing design system
- Performance should not be degraded
- All actions should be logged for analytics
- User should receive confirmation when action is completed

**Notes:**
- Extracted from ${card.type} in the Sprint Review meeting
- Priority: ${card.priority || "Medium"}
- Estimated effort: 3 story points`)
        } else if (action === "draftEmail") {
          setGeneratedContent(`Subject: Follow-up on ${card.title}

Hi Team,

During our recent Sprint Review meeting, we discussed ${card.title.toLowerCase()}. I wanted to follow up on this discussion to ensure we're aligned on next steps.

${card.content}

This item has been identified as ${card.priority || "medium"} priority. Let's discuss this further in our next planning session.

If you have any questions or additional input on this matter, please let me know.

Best regards,
[Your Name]`)
        } else if (action === "research") {
          setGeneratedContent(`# Research Notes: ${card.title}

## Background
${card.content}

## Key Questions to Answer
- What are the industry best practices for this?
- How have other products solved this problem?
- What technical constraints should we consider?
- What user needs does this address?

## Initial Findings
- This appears to be a common need across similar products
- Several technical approaches are possible
- User research suggests this would significantly improve experience

## Next Steps
1. Conduct competitive analysis
2. Interview 3-5 users about their specific needs
3. Create prototype of potential solutions
4. Evaluate technical feasibility with engineering team

## Timeline
Recommend 1-2 weeks for initial research phase before making recommendations.`)
        } else if (action === "addToBacklog") {
          setGeneratedContent(`Item successfully added to backlog with ID: ${card.type.charAt(0).toUpperCase()}${card.type.slice(1, 3)}-${Math.floor(Math.random() * 1000)}

Priority: ${card.priority || "Medium"}
Type: ${card.type}
Created: ${new Date().toLocaleDateString()}`)
        } else if (action === "assign") {
          setGeneratedContent(`Assign "${card.title}" to team member:

[ ] John Doe (Product Manager)
[ ] Jane Smith (UX Designer)
[ ] Mike Johnson (Developer)
[ ] Sarah Williams (Stakeholder)
[ ] Alex Brown (Marketing)

Due date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Priority: ${card.priority || "Medium"}
Notes: ${card.content.slice(0, 100)}...`)
        } else if (action === "schedule") {
          setGeneratedContent(`Schedule "${card.title}"

Proposed date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Time: 10:00 AM - 11:00 AM
Participants:
- John Doe
- Jane Smith
- Mike Johnson
- Sarah Williams

Agenda:
1. Discuss ${card.title}
2. Review current status
3. Determine next steps
4. Assign action items

Notes: ${card.content}`)
        } else if (action === "createTask") {
          setGeneratedContent(`New Task: ${card.title}

Description: ${card.content}

Assignee: [Select Team Member]
Due Date: [Select Date]
Priority: ${card.priority || "Medium"}
Labels: ${card.type}, meeting-extraction

Subtasks:
- [ ] Initial research
- [ ] Draft proposal
- [ ] Review with team
- [ ] Implement solution
- [ ] Test and validate`)
        } else if (action === "estimate") {
          setGeneratedContent(`Effort Estimation for: ${card.title}

Story Points: 5
T-shirt Size: M

Breakdown:
- Frontend work: 2 days
- Backend work: 3 days
- Testing: 1 day
- Documentation: 0.5 day

Total estimated time: 6.5 days
Confidence level: Medium

Notes:
${card.content}`)
        } else if (action === "createPresentation") {
          setGeneratedContent(`# ${card.title}
## Meeting Summary Presentation

### Key Points
- ${card.content.split(". ")[0]}
- ${card.content.split(". ")[1] || ""}
- ${card.content.split(". ")[2] || ""}

### Action Items
- Update roadmap with new priorities
- Schedule follow-up meetings for open questions
- Assign tasks to team members

### Timeline
- Next steps to be completed by end of week
- Follow-up meeting scheduled for next Monday

### Questions?
[Space for Q&A]`)
        } else if (action === "shareWithTeam") {
          setGeneratedContent(`@team

Here's a summary from our recent meeting:

# ${card.title}

${card.content}

## Key Takeaways:
- Dashboard implementation is prioritized for next sprint
- CSV export feature to be added
- Accessibility issues need to be addressed
- User testing scheduled for next week

Please review and let me know if you have any questions or if I missed anything important.

Thanks,
[Your Name]`)
        }

        setIsLoading(false)
      }, 1500)
    } else {
      setGeneratedContent("")
      setRecipients("")
    }
  }, [open, action, card])

  const getActionIcon = () => {
    switch (action) {
      case "writeUserStory":
        return <FileText className="h-5 w-5" />
      case "draftEmail":
        return <Mail className="h-5 w-5" />
      case "research":
        return <Search className="h-5 w-5" />
      case "generate":
        return <FileText className="h-5 w-5" />
      default:
        return null
    }
  }

  const getActionTitle = () => {
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
        return "Assign Task"
      case "schedule":
        return "Schedule Meeting"
      case "createTask":
        return "Create Task"
      case "estimate":
        return "Estimate Effort"
      case "createPresentation":
        return "Create Presentation"
      case "shareWithTeam":
        return "Share with Team"
      default:
        return action
    }
  }

  const getActionButtonLabel = () => {
    switch (action) {
      case "writeUserStory":
        return "Save User Story"
      case "draftEmail":
        return "Send Email"
      case "research":
        return "Save Research"
      case "addToBacklog":
        return "Add to Backlog"
      case "assign":
        return "Assign"
      case "schedule":
        return "Schedule"
      case "createTask":
        return "Create Task"
      case "estimate":
        return "Save Estimate"
      case "createPresentation":
        return "Create Presentation"
      case "shareWithTeam":
        return "Share"
      default:
        return "Complete"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getActionIcon()}
            {getActionTitle()}
            {card && <span className="text-sm font-normal text-muted-foreground ml-2">({card.title})</span>}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Generating content...</p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {action === "draftEmail" && (
              <div className="grid gap-2">
                <Label htmlFor="recipients">To:</Label>
                <Input
                  id="recipients"
                  placeholder="Enter email addresses"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="content">{action === "addToBacklog" ? "Result" : "Content"}</Label>
              <Textarea
                id="content"
                className={`min-h-[200px] font-mono text-sm ${action === "addToBacklog" ? "bg-muted" : ""}`}
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                readOnly={action === "addToBacklog"}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onComplete} disabled={isLoading || !generatedContent}>
            {getActionButtonLabel()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

