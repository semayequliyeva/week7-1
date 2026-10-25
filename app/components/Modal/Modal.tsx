'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  // verilerse modal bu qeder milisaniyeden sonra ozu baglanir
  autoCloseMs?: number
  children: ReactNode
}

export default function Modal({
  isOpen,
  title,
  onClose,
  autoCloseMs,
  children,
}: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // modal acilanda fokus baglama duymesine kecir
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  // Escape duymesi ile baglanma
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // komponent baglananda dinleyici silinir
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // avtomatik baglanma taymeri
  useEffect(() => {
    if (!isOpen || !autoCloseMs) return

    const timerId = setTimeout(onClose, autoCloseMs)
    // taymer temizlenmese komponent silinenden sonra da isleyer
    return () => clearTimeout(timerId)
  }, [isOpen, autoCloseMs, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="rounded bg-white p-6"
      >
        <h2 id="modal-title" className="mb-2 text-lg font-semibold">
          {title}
        </h2>
        <div className="mb-4">{children}</div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="rounded border px-3 py-1"
        >
          Close
        </button>
      </div>
    </div>
  )
}