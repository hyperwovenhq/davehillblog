"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function TagFilter({
  tags,
  activeTag,
}: {
  tags: string[];
  activeTag?: string;
}) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <span className="text-sm font-medium">Filter by tag:</span>
      <Link href="/">
        <Badge
          variant={!activeTag ? "default" : "secondary"}
          className="hover:bg-primary/80"
        >
          All
        </Badge>
      </Link>
      {tags.map((tag) => (
        <Link key={tag} href={`/?tag=${tag}`}>
          <Badge
            variant={activeTag === tag ? "default" : "secondary"}
            className="hover:bg-primary/80"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}