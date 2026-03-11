import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ChevronDown, ChevronUp } from "lucide-react";
import circularsBySession from "@/data/circulars";
import { useAuth } from "@/context/AuthContext";

const categoryColors = {
  Examination: "bg-red-100 text-red-700 hover:bg-red-100",
  Event: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Academic: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Placement: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Notice: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Holiday: "bg-teal-100 text-teal-700 hover:bg-teal-100",
};

export default function Circular() {
  const { currentSession } = useOutletContext();
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState(null);
  const [readStatus, setReadStatus] = useState(() => {
    const saved = localStorage.getItem(`circularRead_${user?.id}_${currentSession}`);
    return saved ? JSON.parse(saved) : {};
  });

  const sessionCirculars = circularsBySession[currentSession] || [];

  useEffect(() => {
    localStorage.setItem(`circularRead_${user?.id}_${currentSession}`, JSON.stringify(readStatus));
  }, [readStatus, user?.id, currentSession]);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
    setReadStatus((prev) => ({ ...prev, [id]: true }));
  }

  const unreadCount = sessionCirculars.filter((c) => !readStatus[c.id] && !c.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Circulars</h1>
          <p className="text-muted-foreground">University announcements and notices</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-blue-500 hover:bg-blue-500">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {sessionCirculars.map((c) => {
          const isExpanded = expandedId === c.id;
          const isRead = readStatus[c.id] || c.read;
          return (
            <Card
              key={c.id}
              className={`cursor-pointer transition-all duration-200 ${
                isExpanded ? "ring-1 ring-primary/20" : "hover:shadow-md"
              } ${!isRead ? "border-l-4 border-l-blue-500" : ""}`}
              onClick={() => toggle(c.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 shrink-0 mt-0.5 ${!isRead ? "bg-blue-100" : "bg-muted"}`}>
                    <Megaphone className={`h-4 w-4 ${!isRead ? "text-blue-600" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`font-medium text-sm leading-tight ${!isRead ? "font-semibold" : ""}`}>{c.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge className={categoryColors[c.category] || ""}>{c.category}</Badge>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
                          {!isRead && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-muted-foreground">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
