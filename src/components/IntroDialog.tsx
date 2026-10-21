import React, { useEffect, useRef } from 'react';

interface IntroDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroDialog: React.FC<IntroDialogProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (typeof dialog.showModal === 'function' && !dialog.open) {
        dialog.showModal();
      }
      document.body.classList.add('dialog-open');
    } else {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      document.body.classList.remove('dialog-open');
    }

    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      id="intro-dialog"
      aria-labelledby="intro-title"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="open block"
      style={{
        color: 'var(--ink)',
        background: 'var(--paper)',
        border: 0,
        borderRadius: '10px',
        padding: 0,
        width: 'min(720px, calc(100% - 32px))',
        maxHeight: 'calc(100dvh - 40px)',
        boxShadow: '0 25px 100px rgba(0,0,0,0.3)',
        overscrollBehavior: 'contain',
        margin: 'auto',
        position: 'fixed',
        inset: 0,
        zIndex: 100,
      }}
    >
      <div className="dialog-topline">
        <span className="small-label">From the manuscript · Review edition</span>
        <button
          className="dialog-close"
          type="button"
          aria-label="Close introduction"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="dialog-content">
        <p className="eyebrow">A first look</p>
        <h2 id="intro-title">
          Introduction:
          <br />
          <em>Optimistic Africa</em>
        </h2>
        <p className="lead">
          What if optimism was a measurable asset and not just a frame of mind?
        </p>
        <p>
          Optimism is not naïve hope, nor is it a sentimental attachment to possibility. It is a forward-looking assessment that the future can be better than the present.
        </p>
        <p>
          In economic terms, optimism shapes expectations, lowers the perceived risks of investment and unlocks capital and skills. In political terms, it sustains legitimacy by building confidence, hope and trust. In social terms, it influences whether citizens choose to stay in a nation, build social capital and be included.
        </p>
        <p>
          Nations rise not only on the strength of their resources, but on the strength of their expectations. Where people believe progress is possible, they start businesses, educate their children, innovate and collaborate. Where investors perceive upward trajectories, they allocate capital. Where institutions signal stability and reform, markets respond.
        </p>
        <p className="excerpt-credit">
          An excerpt from the introduction to <em>Optimistic Africa</em> by Dr. Anand Kulkarni.
        </p>
        <a
          className="button dark"
          href="/assets/optimistic-africa-review-edition.pdf"
          download="Optimistic-Africa-Review-Edition.pdf"
        >
          Continue in the review edition <span aria-hidden="true">↓</span>
        </a>
      </div>
    </dialog>
  );
};
