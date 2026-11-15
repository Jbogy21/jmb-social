import { Button } from "./Button";
import { scheduleCallHref } from "@/lib/data";

// "Schedule a call": opens your booking calendar when `bookingUrl` is set in
// src/lib/data.ts, and otherwise the contact form set up for a call request.
export default function ScheduleCallButton({
  variant = "ghost",
  className = "",
  children = "Schedule a call",
}: {
  variant?: "primary" | "secondary" | "ghost" | "light" | "signal";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button href={scheduleCallHref()} variant={variant} className={className}>
      {children}
    </Button>
  );
}
