// Utility to merge class names (tailwind-merge + clsx pattern)
export function cn(...inputs: Array<string | undefined | false | null>) {
  return inputs.filter(Boolean).join(' ')
}
