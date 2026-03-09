import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart3,
  CalendarCheck,
  UserCircle,
  Megaphone,
  Inbox,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/performance", label: "Performance", icon: BarChart3 },
  { to: "/my-info", label: "My Info", icon: UserCircle },
  { to: "/circulars", label: "Circulars", icon: Megaphone },
  { to: "/messages", label: "Index Box", icon: Inbox },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white
          transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="font-semibold text-sm text-muted-foreground">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground text-center">
              EduSync v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
