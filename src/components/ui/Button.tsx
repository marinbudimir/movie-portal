import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  className?: string;
}

export function Button({ children, variant, className }: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-surface-action-default hover:bg-surface-action-hover text-white h-[44px] rounded-sm cursor-pointer",
  };

  const Component = "button";

  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
