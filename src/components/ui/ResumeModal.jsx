import React, { useEffect, useRef } from 'react';
import { X, FileDown, ExternalLink, FileText } from 'lucide-react';
import { Button } from './Button';
import gsap from 'gsap';

export const ResumeModal = ({ isOpen, onClose, pdfUrl }) => {
  const overlayRef = useRef(null);
  const modalRef  = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.9, y: 30, duration: 0.25,
      onComplete: onClose
    });
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'Swar-Shinde-Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-ink)]/60 backdrop-blur-sm p-3 md:p-6"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header Bar ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg)] border-[3px] border-b-0 border-[var(--color-ink)] wobbly-tag rounded-t-md shadow-hard">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#ff4d4d] border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center shadow-hard-sm">
              <FileText className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-heading font-bold text-xl text-[var(--color-ink)]">
              Swar Shinde — Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download */}
            <button
              onClick={handleDownload}
              title="Download PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-postit)] border-2 border-[var(--color-ink)] wobbly-tag shadow-hard-sm font-handwriting font-bold text-base text-[var(--color-ink)] hover:bg-[#ff4d4d] hover:text-white transition-colors"
            >
              <FileDown className="w-4 h-4 stroke-[2.5]" />
              Download
            </button>

            {/* Open in tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="p-2 bg-[var(--color-muted)] border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center shadow-hard-sm hover:bg-[#2d5da1] hover:text-white hover:border-[#2d5da1] transition-colors text-[var(--color-ink)]"
            >
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </a>

            {/* Close */}
            <button
              onClick={handleClose}
              title="Close"
              className="p-2 bg-[var(--color-muted)] border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center shadow-hard-sm hover:bg-[#ff4d4d] hover:text-white hover:border-[#ff4d4d] transition-colors text-[var(--color-ink)]"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ── PDF Viewer ──────────────────────────────────── */}
        <div className="flex-1 border-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] shadow-hard-xl overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="Resume PDF Viewer"
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-bg)] border-[3px] border-t-0 border-[var(--color-ink)] rounded-b-md shadow-hard">
          <span className="font-handwriting text-sm text-[var(--color-ink)]/70 italic">
            Click anywhere outside to close
          </span>
          <Button
            variant="primary"
            size="sm"
            icon={FileDown}
            onClick={handleDownload}
          >
            Save PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
