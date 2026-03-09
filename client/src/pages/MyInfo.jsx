import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  Hash,
} from "lucide-react";

export default function MyInfo() {
  const { user } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  const personalInfo = [
    { icon: Hash, label: "Roll Number", value: user?.rollNo },
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phone },
    { icon: Calendar, label: "Date of Birth", value: user?.dob },
    { icon: User, label: "Gender", value: user?.gender },
    { icon: MapPin, label: "Address", value: user?.address },
  ];

  const academicInfo = [
    { icon: GraduationCap, label: "Branch", value: user?.branch },
    { icon: Calendar, label: "Batch", value: user?.batch },
    { icon: Users, label: "Section", value: user?.section },
    { icon: Hash, label: "Current Semester", value: user?.semester },
  ];

  const familyInfo = [
    { icon: User, label: "Father's Name", value: user?.fatherName },
    { icon: User, label: "Mother's Name", value: user?.motherName },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Info</h1>
        <p className="text-muted-foreground">Your personal and academic information</p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge>{user?.branch}</Badge>
                <Badge variant="outline">{user?.batch}</Badge>
                <Badge variant="secondary">{user?.section}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {personalInfo.map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center gap-3 py-3">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium truncate">{item.value || "N/A"}</p>
                  </div>
                </div>
                {i < personalInfo.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="h-4 w-4" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {academicInfo.map((item, i) => (
                <div key={item.label}>
                  <div className="flex items-center gap-3 py-3">
                    <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium">{item.value || "N/A"}</p>
                    </div>
                  </div>
                  {i < academicInfo.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {familyInfo.map((item, i) => (
                <div key={item.label}>
                  <div className="flex items-center gap-3 py-3">
                    <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium">{item.value || "N/A"}</p>
                    </div>
                  </div>
                  {i < familyInfo.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
