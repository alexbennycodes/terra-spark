import { cn } from "@/lib/utils";
import React from "react";

const Skeleton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      ref={ref}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
