"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { projectCategories, projectCategory, type CaseStudy } from "@/lib/projects";

/**
 * Client-side filter over the verified completed-works register.
 * Data stays centralized in /src/lib/projects.ts; this component only
 * filters. Lightweight by design — no over-engineered UI.
 */
export function ProjectRegister({ rows }: { rows: CaseStudy[] }) {
  const [active, setActive] = useState<string>("All");
  const shown = useMemo(() => {
    if (active === "All") return rows;
    return rows.filter((r) => projectCategory(r) === active);
  }, [rows, active]);

  const chips = ["All", ...projectCategories];

  return (
    <div className="w-full min-w-0">
      <div
        role="group"
        aria-label="Filter completed projects by category"
        className="mb-6 flex flex-wrap gap-2"
      >
        {chips.map((chip) => {
          const count = chip === "All" ? rows.length : rows.filter((r) => projectCategory(r) === chip).length;
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={active === chip}
              onClick={() => setActive(chip)}
              className={cn(
                "border px-4 py-2 text-[0.8125rem] font-semibold transition",
                active === chip
                  ? "border-brand-bright bg-brand/15 text-brand-bright"
                  : "border-border bg-card text-foreground/80 hover:border-white/40",
              )}
            >
              {chip}
              <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto border border-border bg-canvas-raised">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">Completed projects register — filtered view</caption>
          <thead>
            <tr className="border-b border-border text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
              <th scope="col" className="px-5 py-4 font-bold">Project</th>
              <th scope="col" className="px-5 py-4 font-bold">Client</th>
              <th scope="col" className="px-5 py-4 font-bold">Location</th>
              <th scope="col" className="px-5 py-4 font-bold">Year</th>
              <th scope="col" className="px-5 py-4 font-bold">Category</th>
              <th scope="col" className="px-5 py-4 font-bold">Scope</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((cs) => (
              <tr key={cs.slug} className="border-b border-border/70 align-top last:border-0 hover:bg-white/[0.03]">
                <td className="px-5 py-4 text-[0.875rem] font-semibold text-foreground">{cs.title}</td>
                <td className="px-5 py-4 text-[0.875rem] text-foreground/90">{cs.client ?? "—"}</td>
                <td className="px-5 py-4 text-[0.875rem] text-muted-foreground">{cs.location ?? "—"}</td>
                <td className="px-5 py-4 text-[0.875rem] whitespace-nowrap text-muted-foreground">{cs.year ?? "—"}</td>
                <td className="px-5 py-4">
                  <span className="inline-block border border-border/70 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.14em] text-brand-bright uppercase">
                    {projectCategory(cs)}
                  </span>
                </td>
                <td className="px-5 py-4 text-[0.8125rem] leading-relaxed text-muted-foreground">{cs.summary}</td>
              </tr>
            ))}
            {shown.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[0.875rem] text-muted-foreground">
                  No entries in this category yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.75rem] text-muted-foreground">
        Showing {shown.length} of {rows.length} verified register entries.
      </p>
    </div>
  );
}
