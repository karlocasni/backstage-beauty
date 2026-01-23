import { cn } from "@/lib/utils";
import React from "react";

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass rounded-3xl p-6 md:p-8",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassContainer.displayName = "GlassContainer";
