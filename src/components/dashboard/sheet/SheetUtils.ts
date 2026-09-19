// ─── Sheet Utilities ──────────────────────────────────────────────────────────
//
// Shared pure helper functions used across all sheet components.
// Import from the barrel: `import { formatDate } from "@/features/dashboard/sheet"`.

/**
 * Formats an ISO date string into a human-readable date + time label.
 *
 * Output examples:
 * - "Jan 15, 2025, 10:30 AM"
 * - "Mar 4, 2024, 2:05 PM"
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}
