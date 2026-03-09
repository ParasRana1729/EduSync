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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Award, BookOpen } from "lucide-react";
import performanceData from "@/data/performance";

function gradeColor(grade) {
  if (grade.startsWith("A")) return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
  if (grade.startsWith("B")) return "bg-blue-100 text-blue-700 hover:bg-blue-100";
  if (grade.startsWith("C")) return "bg-amber-100 text-amber-700 hover:bg-amber-100";
  return "bg-red-100 text-red-700 hover:bg-red-100";
}

export default function Performance() {
  const { user } = useAuth();
  const data = performanceData[user?.rollNo];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No performance data available.</p>
      </div>
    );
  }

  const { semesters, cgpa } = data;
  const totalCredits = semesters.reduce(
    (sum, sem) => sum + sem.subjects.reduce((s, sub) => s + sub.credits, 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
        <p className="text-muted-foreground">Your academic grades and GPA</p>
      </div>

      {/* CGPA Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-indigo-50">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CGPA</p>
                <p className="text-2xl font-bold text-indigo-600">{cgpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-blue-50">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latest SGPA</p>
                <p className="text-2xl font-bold">
                  {semesters[semesters.length - 1].sgpa}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-violet-50">
                <BookOpen className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits Earned</p>
                <p className="text-2xl font-bold">{totalCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue={`sem-${semesters[semesters.length - 1].semester}`}>
            <div className="border-b px-4 pt-4">
              <TabsList>
                {semesters.map((sem) => (
                  <TabsTrigger key={sem.semester} value={`sem-${sem.semester}`}>
                    Semester {sem.semester}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {semesters.map((sem) => (
              <TabsContent key={sem.semester} value={`sem-${sem.semester}`} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{sem.session}</p>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    SGPA: {sem.sgpa}
                  </Badge>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden sm:table-cell">Code</TableHead>
                      <TableHead className="text-center">Credits</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sem.subjects.map((sub) => (
                      <TableRow key={sub.code}>
                        <TableCell className="font-medium">{sub.name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {sub.code}
                        </TableCell>
                        <TableCell className="text-center">{sub.credits}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={gradeColor(sub.grade)}>{sub.grade}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
