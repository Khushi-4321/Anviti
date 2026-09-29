import * as React from "react"
import { Sparkles } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"
import { ProvenanceChip } from "./ProvenanceChip"
import { cn } from "../../lib/utils"

export interface AIOutputCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  title?: string;
  output?: any;
  content?: React.ReactNode;
  confidence?: number;
  rationale?: string;
  evidence?: string[] | any;
  humanControl?: boolean;
  sourceModels?: string[];
  footer?: React.ReactNode;
}

export function AIOutputCard({ title, output, content, rationale, evidence, humanControl, confidence, sourceModels = ["Anviti-Core"], footer, className, ...props }: AIOutputCardProps) {
  const displayContent = content || (typeof output === 'string' ? output : JSON.stringify(output, null, 2));
  return (
    <Card className={cn("border-[#5B4FCF]/20 shadow-sm relative overflow-hidden", className)} {...props}>
      <div className="absolute top-0 left-0 w-1 h-full bg-[#5B4FCF]" />
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5B4FCF]" />
            {title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 pt-1">
            {sourceModels.map((model, idx) => (
              <ProvenanceChip key={idx} source={model} confidence={idx === 0 ? confidence : undefined} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-slate-700 leading-relaxed">
        {displayContent}
        {rationale && (
          <div className="mt-2 text-xs text-slate-500">
            <strong>Rationale:</strong> {rationale}
          </div>
        )}
        {evidence && Array.isArray(evidence) && evidence.length > 0 && (
          <div className="mt-2 text-xs text-slate-500">
            <strong>Evidence:</strong> {evidence.join(', ')}
          </div>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="pt-0 bg-slate-50/50 border-t border-slate-100 p-4 mt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
