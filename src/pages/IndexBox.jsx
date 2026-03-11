import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Inbox, ArrowLeft, Mail, MailOpen, Clock, User } from "lucide-react";
import messagesBySession from "@/data/messages";
import { useAuth } from "@/context/AuthContext";

export default function IndexBox() {
  const { currentSession } = useOutletContext();
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState(null);
  const [readStatus, setReadStatus] = useState(() => {
    const saved = localStorage.getItem(`messageRead_${user?.id}_${currentSession}`);
    return saved ? JSON.parse(saved) : {};
  });

  const sessionMessages = messagesBySession[currentSession] || [];

  useEffect(() => {
    localStorage.setItem(`messageRead_${user?.id}_${currentSession}`, JSON.stringify(readStatus));
  }, [readStatus, user?.id, currentSession]);

  function openMessage(msg) {
    setSelectedId(msg.id);
    setReadStatus((prev) => ({ ...prev, [msg.id]: true }));
  }

  const selectedMessage = sessionMessages.find((m) => m.id === selectedId);
  const unreadCount = sessionMessages.filter((m) => !readStatus[m.id] && !m.read).length;

  if (selectedMessage) {
    return (
      <div className="space-y-6">
        <div>
          <Button
            variant="ghost"
            className="gap-2 -ml-2 mb-2"
            onClick={() => setSelectedId(null)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Inbox
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">{selectedMessage.subject}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline" className="gap-1">
                    <User className="h-3 w-3" />
                    {selectedMessage.from}
                  </Badge>
                  <Badge variant="secondary">{selectedMessage.role}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedMessage.date}
                  </span>
                </div>
              </div>

              <Separator />

              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedMessage.body}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Index Box</h1>
          <p className="text-muted-foreground">Your messages and communications</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-blue-500 hover:bg-blue-500">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {sessionMessages.map((msg, i) => {
            const isRead = readStatus[msg.id] || msg.read;
            return (
              <div key={msg.id}>
                <div
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    !isRead ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => openMessage(msg)}
                >
                  <div className={`rounded-full p-2 shrink-0 mt-0.5 ${!isRead ? "bg-blue-100" : "bg-muted"}`}>
                    {!isRead ? (
                      <Mail className="h-4 w-4 text-blue-600" />
                    ) : (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`text-sm truncate ${!isRead ? "font-semibold" : "font-medium"}`}>
                          {msg.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {msg.from} &middot; {msg.role}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {msg.body}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                        {!isRead && (
                          <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {i < sessionMessages.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
