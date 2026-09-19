import { CheckmarkCircle02Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import type { PasswordRequirementsProps } from './password-requirements.d';

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    {
      label: 'At least 8 characters long',
      valid: password.length >= 8,
    },
    {
      label: 'At least 1 uppercase letter',
      valid: /[A-Z]/.test(password),
    },
    {
      label: 'At least 1 number',
      valid: /[0-9]/.test(password),
    },
    {
      label: 'At least 1 special character',
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="border-border/70 bg-muted/30 space-y-1.5 rounded-xl border p-3 text-xs">
      <p className="text-foreground/80 mb-1 font-semibold">
        Password Requirements:
      </p>
      <ul className="space-y-1">
        {requirements.map((req, idx) => (
          <li
            key={idx}
            className={cn(
              'flex items-center gap-2 transition-colors',
              req.valid ? 'text-income font-medium' : 'text-muted-foreground',
            )}
          >
            <HugeiconsIcon
              icon={req.valid ? CheckmarkCircle02Icon : Tick02Icon}
              className={cn(
                'size-3.5 shrink-0',
                req.valid ? 'text-income' : 'text-muted-foreground/40',
              )}
            />
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
