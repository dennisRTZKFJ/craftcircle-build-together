
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        className
      )}
      {...props}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
);

Spinner.displayName = "Spinner";

