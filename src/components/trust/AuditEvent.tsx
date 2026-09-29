import * as React from "react"
import { CheckCircle2, AlertCircle, Clock, User, Shield } from "lucide-react"
import { cn } from "../../lib/utils"

export interface AuditEventProps extends React.HTMLAttributes<HTMLDivElement> {
  action: string;
  actor: string;
  actorRole: "AI" | "Human" | "System";
  timestamp: string;
  status?: "success" | "warning" | "error" | "pending";
  details?: string;
}

export function AuditEvent({ action, actor, actorRole, timestamp, status = "success", details, className, ...props }: AuditEventProps) {
  const StatusIcon = {
    success: CheckCircle2,
    warning: AlertCircle,
    error: AlertCircle,
    pending: Clock
  }[status];

  const statusColor = {
    success: "text-[#2DB87D]",
    warning: "text-[#E5A11C]",
    error: "text-[#DC4A43]",
    pending: "text-slate-400"
  }[status];

  return (
    <div className={cn("flex gap-3 py-3 border-l-2 pl-4 border-slate-200 relative", className)} {...props}>
      <div className={cn("absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-white border-2", 
        status === 'success' ? 'border-[#2DB87D]' : 
        status === 'warning' ? 'border-[#E5A11C]' : 
        status === 'error' ? 'border-[#DC4A43]' : 'border-slate-300'
      )}></div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#0E2238]">{action}</p>
          <span className="text-xs text-slate-500 font-mono">{timestamp}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            {actorRole === 'AI' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
            <span className="font-semibold">{actor}</span>
            <span className="text-slate-400">({actorRole})</span>
          </div>
        </div>
        {details && (
          <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded border border-slate-100">
            {details}
          </p>
        )}
      </div>
    </div>
  )
}
