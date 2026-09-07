"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2Icon, SendIcon, MailIcon, AlertTriangleIcon } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "delivered" }
  | { kind: "not-configured" }
  | { kind: "error"; message: string };

const initial = {
  name: "",
  company: "",
  company_website: "", // honeypot — must stay empty for humans
  email: "",
  phone: "",
  location: "",
  service: "",
  description: "",
  schedule: "",
  consent: false,
};

export function QuotationForm() {
  const formId = useId();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof typeof initial) => (value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.description.trim() || form.description.trim().length < 20)
      next.description =
        "Please describe your project or scope (at least a few sentences helps us respond well).";
    if (!form.consent) next.consent = "Please consent to being contacted.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
      };
      if (res.ok && data.ok) {
        setStatus({ kind: "delivered" });
      } else if (data.code === "UNCONFIGURED") {
        setStatus({ kind: "not-configured" });
      } else {
        setStatus({
          kind: "error",
          message: data.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Could not reach the server. Please try again or email us directly.",
      });
    }
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Quotation request — ${form.name ? form.name : "website inquiry"}`,
  )}&body=${encodeURIComponent(
    [
      `Quotation request from the Bestcor website`,
      ``,
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.location ? `Project location: ${form.location}` : null,
      form.service ? `Service required: ${form.service}` : null,
      form.schedule ? `Desired schedule: ${form.schedule}` : null,
      ``,
      `Project description / scope:`,
      form.description,
    ]
      .filter(Boolean)
      .join("\n"),
  )}`;

  const inputClass =
    "w-full border bg-canvas-deep px-3.5 py-3 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/60 transition focus:border-ring focus:outline-none disabled:opacity-60";
  const labelClass = "mb-2 block text-[0.8125rem] font-semibold text-foreground";
  const errClass = "mt-1.5 block text-[0.75rem] text-destructive";

  return (
    <div>
      {status.kind === "delivered" ? (
        <div
          role="status"
          className="border border-brand/40 bg-brand/10 p-8 text-center"
        >
          <p className="display text-[1.4rem] text-brand-bright">Request received</p>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-foreground/85">
            Thank you — Bestcor has received your quotation request and will
            follow up at the email address you provided.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 md:p-8">
          {/* honeypot — hidden from humans */}
          <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
            <label htmlFor={`${formId}-fax`}>Leave this field empty</label>
            <input
              id={`${formId}-fax`}
              name="fax"
              tabIndex={-1}
              autoComplete="off"
              value={form.company_website}
              onChange={(e) => set("company_website")(e.target.value)}
            />
          </div>

          {status.kind === "not-configured" ? (
            <div
              role="alert"
              className="mb-6 flex flex-col gap-4 border border-amber-500/40 bg-amber-500/10 p-5 sm:flex-row sm:items-center"
            >
              <AlertTriangleIcon className="size-6 shrink-0 text-amber-400" aria-hidden="true" />
              <div>
                <p className="text-[0.9375rem] font-bold text-amber-200">
                  Direct delivery is not enabled on this deployment yet.
                </p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-amber-100/80">
                  Your request was not lost — nothing was pretended to be sent.
                  Please use the button below to send your request by email, or
                  contact Bestcor directly at {site.email}.
                </p>
                <a
                  href={mailtoHref}
                  className="btn btn--red mt-4 !min-h-12 text-[0.8125rem] uppercase tracking-[0.06em]"
                >
                  <MailIcon className="size-4" aria-hidden="true" /> Email this request now
                </a>
              </div>
            </div>
          ) : null}

          {status.kind === "error" ? (
            <p role="alert" className="mb-6 border border-destructive/40 bg-destructive/10 p-4 text-[0.875rem] text-destructive">
              {status.message}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-name`} className={labelClass}>
                Full name <span className="text-signal-bright" aria-hidden="true">*</span>
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                className={inputClass + (errors.name ? " border-destructive" : " border-border")}
                placeholder="Juan dela Cruz"
              />
              {errors.name ? (
                <span id={`${formId}-name-err`} className={errClass}>{errors.name}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-company`} className={labelClass}>
                Company / organization
              </label>
              <input
                id={`${formId}-company`}
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => set("company")(e.target.value)}
                className={inputClass + " border-border"}
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className={labelClass}>
                Email <span className="text-signal-bright" aria-hidden="true">*</span>
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                className={inputClass + (errors.email ? " border-destructive" : " border-border")}
                placeholder="you@company.com"
              />
              {errors.email ? (
                <span id={`${formId}-email-err`} className={errClass}>{errors.email}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className={labelClass}>
                Phone / mobile
              </label>
              <input
                id={`${formId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                className={inputClass + " border-border"}
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-location`} className={labelClass}>
                Project location
              </label>
              <input
                id={`${formId}-location`}
                name="location"
                value={form.location}
                onChange={(e) => set("location")(e.target.value)}
                className={inputClass + " border-border"}
                placeholder="City / province / site"
              />
            </div>

            <div>
              <label htmlFor={`${formId}-service`} className={labelClass}>
                Service required <span className="text-signal-bright" aria-hidden="true">*</span>
              </label>
              <select
                id={`${formId}-service`}
                name="service"
                required
                value={form.service}
                onChange={(e) => set("service")(e.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? `${formId}-service-err` : undefined}
                className={inputClass + (errors.service ? " border-destructive" : " border-border")}
              >
                <option value="">Select a service…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Multiple / not listed">Multiple services / not listed</option>
              </select>
              {errors.service ? (
                <span id={`${formId}-service-err`} className={errClass}>{errors.service}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-schedule`} className={labelClass}>
                Desired schedule
              </label>
              <input
                id={`${formId}-schedule`}
                name="schedule"
                value={form.schedule}
                onChange={(e) => set("schedule")(e.target.value)}
                className={inputClass + " border-border"}
                placeholder="e.g. Next quarter, 2026"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-description`} className={labelClass}>
                Project description / scope <span className="text-signal-bright" aria-hidden="true">*</span>
              </label>
              <textarea
                id={`${formId}-description`}
                name="description"
                rows={6}
                required
                value={form.description}
                onChange={(e) => set("description")(e.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? `${formId}-description-err` : undefined}
                className={inputClass + " resize-y " + (errors.description ? " border-destructive" : " border-border")}
                placeholder="Equipment involved, location, what needs to be done, and anything else that helps us scope the work…"
              />
              {errors.description ? (
                <span id={`${formId}-description-err`} className={errClass}>{errors.description}</span>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor={`${formId}-consent`} className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                <input
                  id={`${formId}-consent`}
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent")(e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? `${formId}-consent-err` : undefined}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--brand)]"
                />
                <span>
                  I consent to {site.legalName} using the information I provide
                  on this form to respond to my quotation request.{" "}
                  <span className="text-signal-bright" aria-hidden="true">*</span>
                </span>
              </label>
              {errors.consent ? (
                <span id={`${formId}-consent-err`} className={errClass}>{errors.consent}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.75rem] leading-relaxed text-muted-foreground">
                Need to share drawings or equipment lists? Mention them in the
                description, or email files to {site.email} with the subject
                &ldquo;Quotation&rdquo;.
              </p>
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="btn btn--red shrink-0 uppercase tracking-[0.06em]"
              >
                {status.kind === "sending" ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4" aria-hidden="true" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
