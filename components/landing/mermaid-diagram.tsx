"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

type MermaidDiagramProps = {
  chart: string;
  title: string;
};

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let active = true;

    const render = async () => {
      try {
        setHasError(false);
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "base",
          fontFamily: "Inter, ui-sans-serif, system-ui",
          themeVariables: {
            primaryColor: resolvedTheme === "dark" ? "#1f2937" : "#e8eefb",
            primaryTextColor: resolvedTheme === "dark" ? "#e2e8f0" : "#111827",
            lineColor: resolvedTheme === "dark" ? "#94a3b8" : "#64748b",
            tertiaryColor: resolvedTheme === "dark" ? "#0b1220" : "#f8fafc"
          }
        });
        const { svg: renderedSvg } = await mermaid.render(
          `diagram-${id}-${resolvedTheme ?? "light"}`,
          chart
        );
        if (active) {
          setSvg(renderedSvg);
        }
      } catch (error) {
        if (active) {
          setHasError(true);
        }
        console.error("Mermaid render error", error);
      }
    };

    void render();

    return () => {
      active = false;
    };
  }, [chart, id, resolvedTheme]);

  if (hasError) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Diagram unavailable. Please refresh to re-render this map.
      </div>
    );
  }

  return (
    <figure className="rounded-lg border border-border/80 bg-background/80 p-4">
      <figcaption className="sr-only">{title}</figcaption>
      {svg ? (
        <div
          className="mermaid-diagram overflow-x-auto [&_svg]:h-auto [&_svg]:w-full"
          aria-label={title}
          role="img"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="h-52 animate-pulse rounded-md bg-muted/40" aria-hidden />
      )}
    </figure>
  );
}
