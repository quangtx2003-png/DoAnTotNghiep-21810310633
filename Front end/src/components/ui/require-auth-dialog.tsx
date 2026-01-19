import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

interface RequireAuthDialogProps {
  open: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onClose: () => void
  onConfirm: () => void
}

export function RequireAuthDialog({
  open,
  title = 'Yêu cầu đăng nhập',
  description = 'Bạn cần đăng nhập để sử dụng chức năng này.',
  confirmText = 'Đăng nhập',
  cancelText = 'Hủy',
  onClose,
  onConfirm,
}: RequireAuthDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Close on ESC
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          onClick={onClose} // click overlay to close
        >
          <motion.div
            ref={dialogRef}
            className="w-full max-w-sm rounded-xl bg-background p-6 shadow-xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // prevent overlay click
          >
            <h3 className="text-lg font-semibold mb-2">{title}</h3>

            <p className="text-sm text-muted-foreground mb-6">{description}</p>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>
                {cancelText}
              </Button>
              <Button onClick={onConfirm}>{confirmText}</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
