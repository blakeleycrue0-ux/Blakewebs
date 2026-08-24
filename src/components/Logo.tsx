import { cn } from "../lib/cn";

export default function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="11"
        fill="none"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <circle
        cx="16"
        cy="16"
        r="11"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="51.8 69.1"
        transform="rotate(-90 16 16)"
      />
    </svg>
  );
}
