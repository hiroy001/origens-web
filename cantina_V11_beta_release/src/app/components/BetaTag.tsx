import React from 'react';
import { clsx } from 'clsx';

interface BetaTagProps {
  label?: string;
  className?: string;
}

// Small, muted-but-visible tag used across the app to signal that a
// screen or feature is still an early/experimental preview. Purely
// visual — never gates functionality.
export const BetaTag = ({ label = 'BETA', className }: BetaTagProps) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[var(--color-violet)]/10 text-[var(--color-violet)]/60 align-middle",
      className
    )}
  >
    {label}
  </span>
);
