import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "title"
  | "label-s-regular"
  | "nav-unselected"
  | "nav-selected"
  | "paragraph-m"
  | "label-m-regular"
  | "caption-s"
  | "tag-m";

interface TextProps {
  children: ReactNode;
  variant: TextVariant;
  className?: string;
}

export function Text({ children, variant, className }: TextProps) {
  const variantStyles = {
    h1: "font-bold text-[62px] leading-[74px] tracking-[-1.86px] font-montserrat",
    h2: "font-bold text-[56px] leading-[64px] tracking-[-0.56px] font-montserrat",
    h3: "font-bold text-[32px] leading-[38px] tracking-[-0.48px] font-montserrat",
    h4: "font-bold text-[24px] leading-[29px] font-montserrat",
    h5: "font-bold text-[20px] leading-[24px] font-montserrat",
    title: "font-bold text-[16px] leading-[19px] font-montserrat",
    "label-m-regular":
      "font-regular text-[16px] leading-[22px] tracking-[-0.32px] font-montserrat",
    "label-s-regular":
      "font-regular text-[14px] leading-[20px] tracking-[-0.35px] font-montserrat",
    "nav-unselected":
      "font-regular text-[16px] leading-[22px] tracking-[-0.48px] font-montserrat",
    "nav-selected":
      "font-bold text-[16px] leading-[22px] tracking-[-0.48px] font-montserrat",
    "paragraph-m":
      "font-regular text-[16px] leading-[26px] tracking-[-0.48px] space-y-[8px] font-montserrat",
    "caption-s": "font-bold text-[12px] leading-[14px] font-montserrat",
    "tag-m":
      "font-regular text-[14px] leading-[14px] tracking-[-0.42px] font-montserrat",
  };

  const Component = "p";

  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
