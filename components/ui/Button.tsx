import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-accent-100 to-accent-200 text-dark-500 font-bold shadow-lg shadow-accent-200/20 hover:shadow-accent-200/40 border border-transparent",
            secondary: "bg-white text-dark-500 font-semibold shadow-md hover:bg-gray-50",
            outline: "border-2 border-dark-500 text-dark-500 font-semibold hover:bg-dark-500 hover:text-white",
            ghost: "text-dark-500 hover:bg-black/5",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "cursor-pointer rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
