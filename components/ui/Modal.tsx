"use client"
import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-background p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
        <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
