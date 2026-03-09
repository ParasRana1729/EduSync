import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ChevronDown, ChevronUp } from "lucide-react";
import circulars from "@/data/circulars";

const categoryColors = {
  Examination: "bg-red-100 text-red-700 hover:bg-red-100",
  Event: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Academic: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Placement: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Notice: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Holiday: "bg-teal-100 text-teal-700 hover:bg-teal-100",
};

export default function Circular() {
  const [expandedId, setExpandedId] = useState(null);

  function toggle(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Circulars</h1>
        <p className="text-muted-foreground">University announcements and notices</p>
      </div>

      <div className="space-y-3">
        {circulars.map((c) => {
          const isExpanded = expandedId === c.id;
          return (
            <Card
              key={c.id}
              className={`cursor-pointer transition-all duration-200 ${
                isExpanded ? "ring-1 ring-primary/20" : "hover:shadow-md"
              }`}
              onClick={() => toggle(c.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg p-2 bg-muted shrink-0 mt-0.5">
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-tight">{c.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge className={categoryColors[c.category] || ""}>{c.category}</Badge>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
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
