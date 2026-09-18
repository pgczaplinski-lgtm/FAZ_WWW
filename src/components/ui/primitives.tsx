import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={`py-14 sm:py-20 ${muted ? "bg-surface" : ""} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionTitle({
  children,
  centered = false,
  className = "",
}: {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </h2>
  );
}

type ButtonVariant = "solid" | "outline";

const buttonClasses = (variant: ButtonVariant) =>
  variant === "solid"
    ? "inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-brand"
    : "inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white";

export function ButtonLink({
  to,
  children,
  variant = "solid",
  external = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}) {
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={`${buttonClasses(variant)} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={`${buttonClasses(variant)} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button type={type} className={`${buttonClasses(variant)} ${className}`}>
      {children}
    </button>
  );
}
