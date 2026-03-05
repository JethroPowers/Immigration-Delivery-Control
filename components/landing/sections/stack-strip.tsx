"use client";

import type { ReactNode } from "react";
import { Mail, MessageSquare, FolderKanban, BriefcaseBusiness, Sheet } from "lucide-react";

import { stackStripCopy, stackTools } from "@/lib/demoData";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/landing/sections/section-shell";

const iconMap: Record<string, ReactNode> = {
  Email: <Mail className="h-3.5 w-3.5" />,
  "WhatsApp forwarding (optional)": <MessageSquare className="h-3.5 w-3.5" />,
  "Drive/SharePoint": <FolderKanban className="h-3.5 w-3.5" />,
  "Existing case system": <BriefcaseBusiness className="h-3.5 w-3.5" />,
  "Spreadsheet import": <Sheet className="h-3.5 w-3.5" />
};

export function StackStrip() {
  return (
    <SectionShell
      id="works-with-stack"
      title="Works with your existing tools"
      subtitle="Overlay-first setup for teams already running multiple systems."
    >
      <div className="rounded-xl border border-border/70 bg-card/90 p-5">
        <div className="flex flex-wrap gap-2">
          {stackTools.map((tool) => (
            <Badge key={tool.name} variant="secondary" className="flex items-center gap-1.5 rounded-full px-3 py-1.5">
              {iconMap[tool.name] ?? null}
              <span>{tool.name}</span>
            </Badge>
          ))}
        </div>

        <p className="mt-4 rounded-md border border-primary/35 bg-primary/5 px-3 py-2 text-sm text-foreground">
          {stackStripCopy}
        </p>
      </div>
    </SectionShell>
  );
}
