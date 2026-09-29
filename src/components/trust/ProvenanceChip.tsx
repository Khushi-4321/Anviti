import * as React from "react"
import { ShieldCheck, Info } from "lucide-react"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"

export interface ProvenanceChipProps extends React.HTMLAttributes<HTMLDivElement> {
  source?: string;
  confidence?: number; // 0-100
  isVerified?: boolean;
  type?: string;
  label?: string;
}

export function ProvenanceChip({ source, confidence, isVerified, type, label, className, ...props }: ProvenanceChipProps) {
  const displaySource = label || source || "Unknown";
  const isSource = type === 'source' || type === 'SOURCE' || isVerified;
  const isDerived = type === 'derived' || type === 'DERIVED';
  const isSim = type === 'simulated' || type === 'SIMULATED';
  
  let variantClass = "bg-slate-100 text-slate-700";
  if (isSource) variantClass = "bg-verified/10 text-verified";
  if (isDerived) variantClass = "bg-anviti-indigo/10 text-anviti-indigo";
  if (isSim) variantClass = "bg-attention/10 text-attention";

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} {...props}>
      <Badge className={cn("font-mono text-[10px] uppercase tracking-wider py-0 rounded", variantClass)}>
        {isSource && <ShieldCheck className="w-3 h-3 mr-1" />}
        {type ? `[${type.toUpperCase()}: ${displaySource}]` : displaySource}
      </Badge>
      {confidence !== undefined && (
        <span className="text-xs text-slate-500 font-mono">
          {confidence}% conf.
        </span>
      )}
      {!isSource && !isDerived && !isSim && (
        <Info className="w-3.5 h-3.5 text-slate-400" />
      )}
    </div>
  )
}
