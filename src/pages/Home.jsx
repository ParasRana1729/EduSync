import { useAuth } from "@/context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, BarChart3, Mail, Megaphone, Clock, TrendingUp } from "lucide-react";
import attendance from "@/data/attendance";
import performanceData from "@/data/performance";
import messagesBySession from "@/data/messages";
import circularsBySession from "@/data/circulars";

export default function Home() {
  const { user } = useAuth();
  const { currentSession } = useOutletContext();

  const userAttendance = attendance[user?.rollNo] || [];
  const totalAttended = userAttendance.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = userAttendance.reduce((sum, s) => sum + s.total, 0);
  const overallAttendance = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : 0;

  const userPerf = performanceData[user?.rollNo];
  const cgpa = userPerf?.cgpa || "N/A";

  const sessionMessages = messagesBySession[currentSession] || [];
  const sessionCirculars = circularsBySession[currentSession] || [];

  const unreadMessages = sessionMessages.filter((m) => !m.read).length;
  const recentCirculars = sessionCirculars.slice(0, 3);

  const statCards = [
    {
      title: "Attendance",
      value: `${overallAttendance}%`,
      description: `${totalAttended} / ${totalClasses} classes`,
      icon: CalendarCheck,
      color: parseFloat(overallAttendance) >= 75 ? "text-emerald-600" : "text-red-500",
      bg: parseFloat(overallAttendance) >= 75 ? "bg-emerald-50" : "bg-red-50",
    },
    {
      title: "CGPA",
      value: cgpa,
      description: "Cumulative GPA",
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Unread Messages",
      value: unreadMessages,
      description: `${sessionMessages.length} total messages`,
      icon: Mail,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Semester",
      value: user?.semester || "N/A",
      description: user?.section || "",
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your academic dashboard.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Circulars */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="h-4 w-4" />
              Recent Circulars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCirculars.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {c.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Quick Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Roll Number", value: user?.rollNo },
                { label: "Branch", value: user?.branch },
                { label: "Batch", value: user?.batch },
                { label: "Section", value: user?.section },
                { label: "Email", value: user?.email },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-1.5 border-b last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
