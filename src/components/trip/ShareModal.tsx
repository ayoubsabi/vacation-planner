"use client";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Copy, Check, Mail } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

export function ShareModal({ isOpen, onClose, tripId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/share/${tripId}`
    : `/share/${tripId}`;

  useEffect(() => {
    if (!isOpen) return;

    async function generateQR() {
      try {
        const QRCode = (await import("qrcode")).default;
        if (qrRef.current) {
          await QRCode.toCanvas(qrRef.current, shareUrl, {
            width: 180,
            margin: 1,
            color: { dark: "#1E293B", light: "#FFFFFF" },
          });
        }
      } catch {
        // QR unavailable offline
      }
    }

    generateQR();
  }, [isOpen, shareUrl]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text
    }
  }

  function shareViaEmail() {
    const subject = encodeURIComponent("Check out our trip budget");
    const body = encodeURIComponent(`Here's the link to view our trip: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Trip">
      <div className="px-5 py-6 flex flex-col items-center gap-5">
        <p className="text-sm text-[var(--text-secondary)] text-center">
          Share this link with your travel companions so they can view the trip.
        </p>

        {/* QR Code */}
        <canvas
          ref={qrRef}
          className="rounded-xl border border-[var(--border)]"
          width={180}
          height={180}
        />

        {/* URL */}
        <div className="w-full bg-slate-50 border border-[var(--border)] rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm overflow-hidden">
          <span className="flex-1 truncate text-[var(--text-secondary)] text-xs">{shareUrl}</span>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-2">
          <Button onClick={copyLink} className="w-full">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button variant="ghost" onClick={shareViaEmail} className="w-full">
            <Mail size={16} />
            Share via Email
          </Button>
        </div>
      </div>
    </Modal>
  );
}
