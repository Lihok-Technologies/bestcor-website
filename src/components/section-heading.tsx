import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  id,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 md:mb-14",
        align === "center" && "items-center text-center",
        align === "left" && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "flex flex-col items-center")}>
        {kicker ? (
          <p className={cn("eyebrow", align === "center" && "eyebrow--center")}>{kicker}</p>
        ) : null}
        <h2
          id={id}
          className="display mt-4 text-[2.1rem] text-foreground sm:text-[2.7rem] lg:text-[3.2rem]"
        >
          {title}
        </h2>
      </div>
      {intro ? (
        <p
          className={cn(
            "text-[0.95rem] leading-relaxed text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-md lg:pb-2",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
