import * as React from "react"
import { Check, CircleDot, Circle } from "lucide-react"
import { cn } from "../../lib/utils"

export const THREAD_STAGES = [
  "Challenge",
  "Discover",
  "Screen",
  "Evaluate",
  "Pilot",
  "Verify",
  "Pay",
  "Validate",
  "Scale"
] as const;

export type ThreadStage = typeof THREAD_STAGES[number];

export interface ThreadRailProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStage: ThreadStage;
  completedStages: ThreadStage[];
  orientation?: "horizontal" | "vertical";
}

export function ThreadRail({ currentStage, completedStages, orientation = "vertical", className, ...props }: ThreadRailProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div 
      className={cn(
        "flex", 
        isHorizontal ? "flex-row items-start w-full" : "flex-col",
        className
      )}
      {...props}
    >
      {THREAD_STAGES.map((stage, index) => {
        const isCompleted = completedStages.includes(stage);
        const isCurrent = stage === currentStage;
        const isLast = index === THREAD_STAGES.length - 1;

        return (
          <div 
            key={stage} 
            className={cn(
              "relative flex",
              isHorizontal ? "flex-col items-center flex-1" : "flex-row items-start min-h-[4rem]"
            )}
          >
            {/* Connector line */}
            {!isLast && (
              <div className={cn(
                "absolute bg-slate-200",
                isHorizontal 
                  ? "top-4 left-1/2 w-full h-[2px] -translate-y-1/2" 
                  : "left-4 top-8 w-[2px] h-[calc(100%-2rem)] -translate-x-1/2"
              )}>
                <div className={cn(
                  "bg-[#5B4FCF] transition-all",
                  isHorizontal ? "h-full" : "w-full",
                  isCompleted ? (isHorizontal ? "w-full" : "h-full") : (isHorizontal ? "w-0" : "h-0")
                )} />
              </div>
            )}

            <div className={cn(
              "flex items-center justify-center z-10 w-8 h-8 rounded-full border-2 bg-white",
              isCompleted ? "border-[#2DB87D] text-[#2DB87D]" : 
              isCurrent ? "border-[#5B4FCF] text-[#5B4FCF]" : "border-slate-300 text-slate-300",
              !isHorizontal && "mr-4"
            )}>
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : isCurrent ? (
                <CircleDot className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>
            
            <div className={cn(
              "font-medium text-sm",
              isHorizontal ? "mt-3 text-center" : "mt-1.5",
              isCompleted ? "text-slate-900" :
              isCurrent ? "text-[#5B4FCF]" : "text-slate-500"
            )}>
              {stage}
            </div>
          </div>
        )
      })}
    </div>
  )
}
