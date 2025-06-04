import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "spinner-lg",
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

