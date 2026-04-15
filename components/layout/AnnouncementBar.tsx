"use client"

import * as React from "react"
import { X } from "lucide-react"

export default function AnnouncementBar() {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#1a1a1a] text-white relative flex items-center justify-center p-2 text-[11px] tracking-wide overflow-hidden whitespace-nowrap md:whitespace-normal">
      <div className="animate-marquee md:animate-none flex items-center gap-4">
        <span>🚚 Free shipping on orders above ₹599</span>
        <span>·</span>
        <span>Use code WELCOME10 for 10% off</span>
        <span>·</span>
        <span>Easy 30-day returns</span>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-[#1a1a1a] pl-2 z-10"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-marquee { animation: none; transform: none; }
        }
      `}</style>
    </div>
  )
}
