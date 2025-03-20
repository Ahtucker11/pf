import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calendar, Clock, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl bg-[#f8f7f4]">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next: Technical Planning (Tomorrow)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Extracted Items</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">32 action items, 28 user stories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent meeting activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Weekly Sprint Review", action: "completed", time: "2 hours ago" },
                { title: "User Story created", action: "Dashboard CSV Export", time: "Yesterday" },
                { title: "Action Item assigned", action: "Update Product Roadmap", time: "2 days ago" },
                { title: "UX Design Workshop", action: "completed", time: "3 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.action === "completed" ? (
                      <Calendar className="h-4 w-4 text-primary" />
                    ) : (
                      <Users className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.action}</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Technical Planning Session", date: "Tomorrow, 9:00 AM", participants: 6 },
                { title: "Marketing Strategy Meeting", date: "Mar 19, 1:00 PM", participants: 5 },
                { title: "Budget Planning", date: "Mar 20, 11:00 AM", participants: 3 },
                { title: "Product Demo", date: "Mar 21, 2:00 PM", participants: 8 },
              ].map((meeting, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{meeting.title}</p>
                    <p className="text-sm text-muted-foreground">{meeting.date}</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{meeting.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

