import React from "react";
import { Text } from "@/components/ui/Text";
interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-[10px]">
      {tags.map((tag) => (
        <div
          key={tag}
          className="bg-surface-inverse px-[10px] py-[5px] rounded-xs border border-border-low-contrast"
        >
          <Text variant="tag-m" className="text-content-primary">
            {tag}
          </Text>
        </div>
      ))}
    </div>
  );
}
