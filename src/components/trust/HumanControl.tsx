import * as React from "react"
import { Check, Edit2, ShieldAlert } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export interface HumanControlProps extends React.HTMLAttributes<HTMLDivElement> {
  onAccept?: () => void;
  onEdit?: () => void;
  onOverride?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isPending?: boolean;
  title?: string;
  description?: string;
}

export function HumanControl({ onAccept, onEdit, onOverride, onApprove, onReject, isPending, title, description, className, ...props }: HumanControlProps) {
  const handleAccept = onAccept || onApprove;
  const handleOverride = onOverride || onReject;

  return (
    <div className={cn("flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-md", className)} {...props}>
      <div className="flex-1 min-w-[200px]">
        <p className="text-sm font-medium text-[#0E2238]">{title || "Human Review Required"}</p>
        <p className="text-xs text-slate-500">{description || "Please review the AI generated content before proceeding."}</p>
      </div>
      <div className="flex items-center gap-2">
        {handleOverride && (
          <Button variant="outline" size="sm" onClick={handleOverride} disabled={isPending} className="text-[#DC4A43] hover:text-[#DC4A43] hover:bg-red-50 border-red-200">
            <ShieldAlert className="w-4 h-4 mr-1.5" />
            Reject
          </Button>
        )}
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit} disabled={isPending}>
            <Edit2 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        )}
        {handleAccept && (
          <Button variant="primary" size="sm" onClick={handleAccept} disabled={isPending} className="bg-[#2DB87D] hover:bg-[#2DB87D]/90">
            <Check className="w-4 h-4 mr-1.5" />
            Accept
          </Button>
        )}
      </div>
    </div>
  )
}
