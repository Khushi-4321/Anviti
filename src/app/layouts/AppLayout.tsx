import * as React from "react"
import { Bell, Menu, Search, User, ChevronDown } from "lucide-react"
import { ThreadRail, ThreadStage } from "../../components/thread/ThreadRail"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu"
import { cn } from "../../lib/utils"

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  currentRole?: string;
  onRoleChange?: (role: string) => void;
  currentStage?: ThreadStage;
  completedStages?: ThreadStage[];
}

export function AppLayout({ 
  children, 
  currentRole = "Procurement Officer", 
  onRoleChange,
  currentStage = "Discover",
  completedStages = ["Challenge"],
  className,
  ...props 
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" {...props}>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0E2238] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">A</span>
              </div>
              <span className="text-[#0E2238] font-bold text-xl hidden sm:inline-block tracking-tight">ANVITI</span>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input type="search" placeholder="Search threads, vendors, or RFPs..." className="pl-9 bg-slate-100/50 border-transparent focus-visible:bg-white" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden sm:flex gap-2">
                  <span className="text-sm font-medium">{currentRole}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onRoleChange?.("Procurement Officer")}>Procurement Officer</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRoleChange?.("Vendor (Startup)")}>Vendor (Startup)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRoleChange?.("Evaluator")}>Evaluator</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRoleChange?.("Admin")}>Platform Admin</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F2A93B] rounded-full border-2 border-white"></span>
            </Button>
            
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-slate-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Thread Rail */}
        <aside className={cn(
          "fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 p-6 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0 top-16" : "-translate-x-full"
        )}>
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Current Thread</h2>
            <p className="text-xs text-slate-500 mb-6 truncate" title="Smart City Traffic Optimization">Smart City Traffic Optimization</p>
            <ThreadRail 
              currentStage={currentStage} 
              completedStages={completedStages} 
              orientation="vertical" 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-8", className)}>
          <div className="max-w-5xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
