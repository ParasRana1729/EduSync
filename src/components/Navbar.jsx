import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Mail,
  LogOut,
  ChevronDown,
  Menu,
  User,
  Calendar,
} from "lucide-react";
import messagesBySession from "@/data/messages";
import notificationsBySession from "@/data/notifications";
import logo from "@/assets/img/logo.jpg";

const sessions = [
  "Jan - Jun 2026",
  "Jul - Dec 2025",
  "Jan - Jun 2025",
  "Jul - Dec 2024",
];

export default function Navbar({ currentSession, setCurrentSession, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [notificationReadStatus, setNotificationReadStatus] = useState(() => {
    const saved = localStorage.getItem(`notificationRead_${user?.id}_${currentSession}`);
    return saved ? JSON.parse(saved) : {};
  });

  const sessionMessages = messagesBySession[currentSession] || [];
  const sessionNotifications = notificationsBySession[currentSession] || [];

  useEffect(() => {
    localStorage.setItem(`notificationRead_${user?.id}_${currentSession}`, JSON.stringify(notificationReadStatus));
  }, [notificationReadStatus, user?.id, currentSession]);

  const unreadMessageCount = sessionMessages.filter((m) => {
    const saved = localStorage.getItem(`messageRead_${user?.id}_${currentSession}`);
    const readStatus = saved ? JSON.parse(saved) : {};
    return !readStatus[m.id] && !m.read;
  }).length;

  const unreadNotificationCount = sessionNotifications.filter((n) => !notificationReadStatus[n.id] && !n.read).length;

  function handleNotificationClick() {
    const newStatus = {};
    sessionNotifications.forEach((n) => {
      newStatus[n.id] = true;
    });
    setNotificationReadStatus(newStatus);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/home" className="flex items-center gap-2">
            <img src={logo} alt="EduSync" className="h-8 w-8 rounded-lg object-cover" />
            <span className="text-xl font-bold tracking-tight hidden sm:inline">
              EduSync
            </span>
          </Link>
        </div>

        {/* Center: Session Dropdown */}
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {currentSession}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Academic Session</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sessions.map((session) => (
                <DropdownMenuItem
                  key={session}
                  onClick={() => setCurrentSession(session)}
                  className={session === currentSession ? "bg-accent" : ""}
                >
                  {session}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                {unreadNotificationCount}
              </span>
            )}
          </Button>

          {/* Messages */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/messages")}
          >
            <Mail className="h-5 w-5" />
            {unreadMessageCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {unreadMessageCount}
              </span>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">
                  {user?.name}
                </span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user?.rollNo}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/my-info")}>
                <User className="mr-2 h-4 w-4" />
                My Info
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
