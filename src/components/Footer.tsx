'use client';

import { Text } from "@/components/ui/Text";
import ThemeToggle from "@/components/ThemeToggle";

export default function Footer() {
  return (
    <footer className="flex bg-background-black justify-between px-[40px] py-[20px] gap-[10px]">
      <ThemeToggle />
      <Text variant="label-s-regular" className="text-content-secondary">
        © Aras Digital Products 2024
      </Text>
    </footer>
  );
} 