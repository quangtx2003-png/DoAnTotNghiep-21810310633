import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface IconExpandButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

export function IconExpandButton({ icon, label, onClick }: IconExpandButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center',
        'h-10 rounded-full border border-border bg-background',
        'px-4 gap-3',
        'transition-colors duration-500 ease-in-out',
        'hover:bg-muted focus:bg-muted',
        'focus:outline-none'
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center',
          'transition-all duration-500 ease-in-out',
          'w-4 h-4',
          'group-hover:w-5 group-hover:h-5',
          'group-focus:w-5 group-focus:h-5',
          'shrink-0'
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          'text-sm whitespace-nowrap',
          'opacity-0 max-w-0 overflow-hidden',
          'transition-all duration-500 ease-in-out',
          'group-hover:opacity-100 group-hover:max-w-50 group-hover:ml-0',
          'group-focus:opacity-100 group-hover:max-w-50 group-focus:ml-0',
          '-ml-3'
        )}
      >
        {label}
      </span>
    </button>
  )
}
