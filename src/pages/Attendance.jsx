import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarCheck, AlertTriangle, CheckCircle } from "lucide-react";
import attendanceData from "@/data/attendance";

function getAttendanceColor(percentage) {
  if (percentage >= 75) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", badge: "default" };
  if (percentage >= 65) return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", badge: "secondary" };
  return { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", badge: "destructive" };
}

export default function Attendance() {
  const { user } = useAuth();
  const subjects = attendanceData[user?.rollNo] || [];

  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : 0;
  const overallColor = getAttendanceColor(parseFloat(overallPercentage));

  const lowAttendance = subjects.filter(
    (s) => (s.attended / s.total) * 100 < 75
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Your subject-wise attendance record</p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-3 ${overallColor.bg}`}>
                <CalendarCheck className={`h-5 w-5 ${overallColor.text}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className={`text-2xl font-bold ${overallColor.text}`}>{overallPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-blue-50">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Classes Attended</p>
                <p className="text-2xl font-bold">{totalAttended} / {totalClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-3 ${lowAttendance.length > 0 ? "bg-red-50" : "bg-emerald-50"}`}>
                <AlertTriangle className={`h-5 w-5 ${lowAttendance.length > 0 ? "text-red-500" : "text-emerald-600"}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subjects Below 75%</p>
                <p className={`text-2xl font-bold ${lowAttendance.length > 0 ? "text-red-500" : "text-emerald-600"}`}>
                  {lowAttendance.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subject-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden sm:table-cell">Code</TableHead>
                <TableHead className="text-center">Attended</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => {
                const pct = ((subject.attended / subject.total) * 100).toFixed(1);
                const color = getAttendanceColor(parseFloat(pct));
                return (
                  <TableRow key={subject.code}>
                    <TableCell className="font-medium">{subject.subject}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {subject.code}
                    </TableCell>
                    <TableCell className="text-center">{subject.attended}</TableCell>
                    <TableCell className="text-center">{subject.total}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={color.badge}
                        className={
                          color.badge === "default"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : color.badge === "secondary"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : ""
                        }
                      >
                        {pct}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
