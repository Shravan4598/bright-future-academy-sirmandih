"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function AdmissionPopup() {
  // ===== editable content =====
  const SCHOOL_NAME = "Bright Future Academy";
  const SLOGAN = "Nurturing Young Minds for a Brighter Tomorrow";
  const HEADLINE = "Admissions Open";
  const SESSION = "Session 2026–27";
  const DATE_RANGE = "23 Jan 2026 – 30 Apr 2026";
  const CLASSES = "Nursery to Class 10";
  const NOTE = "Limited seats available • Affordable fees • Safe campus";
  const LOGO_SRC = "/image/logo.jpg";
  const SHOW_AFTER_MS = 3000;

  const WHATSAPP_LINK =
    "https://wa.me/918102223747?text=Hello%20I%20want%20admission%20details%20for%20Bright%20Future%20Academy";
  // ===========================

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const todayLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Opens on every refresh
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // close on Escape
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          style={overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            style={card}
            initial={{ y: -10, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={glowTop} />
            <div style={glowBottom} />

            <button onClick={close} style={closeBtn} aria-label="Close popup">
              ✕
            </button>

            {/* IMPORTANT: scrolling moved inside, so ✕ never gets clipped */}
            <div style={cardBody}>
              <div style={headerRow}>
                <div style={logoWrap}>
                  <img
                    src={LOGO_SRC}
                    alt={`${SCHOOL_NAME} Logo`}
                    style={logoImg}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div style={logoFallback}>BFA</div>
                </div>

                <div style={{ textAlign: "left" }}>
                  <div style={schoolName}>{SCHOOL_NAME}</div>
                  <div style={slogan}>{SLOGAN}</div>
                </div>
              </div>

              <div style={badgesRow}>
                <span style={badgePrimary}>{HEADLINE}</span>
                <span style={badgeSoft}>Updated: {todayLabel}</span>
              </div>

              <h2 style={title}>{SESSION}</h2>

              <div style={infoGrid}>
                <div style={infoPill}>
                  <IconCalendar />
                  <span>
                    <strong>Dates:</strong> {DATE_RANGE}
                  </span>
                </div>

                <div style={infoPill}>
                  <IconBook />
                  <span>
                    <strong>Classes:</strong> {CLASSES}
                  </span>
                </div>

                <div style={infoPill}>
                  <IconStar />
                  <span>{NOTE}</span>
                </div>
              </div>

              <div style={btnRow}>
                <a href="#contact" style={btnPrimary}>
                  Enquiry Form
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnWhatsapp}
                >
                  WhatsApp Now
                </a>
              </div>

              <div style={footerNote}>
                Refresh the page to see this popup again.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ===== icons ===== */

function IconCalendar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 2v3M17 2v3M3.5 9.5h17M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBook() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 5.5A2.5 2.5 0 0 1 7 3h13v17H7a2.5 2.5 0 0 0-2.5 2.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 20.5A2.5 2.5 0 0 1 7 18h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3l2.7 5.7 6.3.9-4.6 4.5 1.1 6.4L12 17.8 6.5 20.5l1.1-6.4L3 9.6l6.3-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ===== styles ===== */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999999,
  paddingLeft: "max(16px, env(safe-area-inset-left))",
  paddingRight: "max(16px, env(safe-area-inset-right))",
  paddingTop: "max(16px, env(safe-area-inset-top))",
  paddingBottom: "max(16px, env(safe-area-inset-bottom))",
};

const card: React.CSSProperties = {
  position: "relative",
  width: "min(420px, calc(100vw - 32px))",
  maxHeight: "90vh",
  overflow: "visible", // IMPORTANT: prevents ✕ from being clipped
  borderRadius: 20,
  color: "#EAF6FF",
  background: "linear-gradient(135deg,#071b2e 0%, #083a5c 45%, #0a7a7c 100%)",
  boxShadow: "0 40px 120px rgba(0,0,0,.65)",
  border: "1px solid rgba(255,255,255,.10)",
  WebkitOverflowScrolling: "touch",
  boxSizing: "border-box",
};

const cardBody: React.CSSProperties = {
  maxHeight: "90vh",
  overflowY: "auto", // scrolling here
  borderRadius: 20,
  padding: "18px 18px 14px 14px",
  paddingRight: 60, // space for ✕ so it never overlaps content
  boxSizing: "border-box",
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  width: 42,
  height: 42,
  borderRadius: 12,
  cursor: "pointer",
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,.28)",
  border: "2px solid rgba(255,255,255,.38)",
  color: "#fff",
  fontSize: 20,
  fontWeight: 900,
  lineHeight: 1,
  boxShadow: "0 8px 18px rgba(0,0,0,.35)",
  textShadow: "0 1px 2px rgba(0,0,0,.55)",
};

const glowTop: React.CSSProperties = {
  position: "absolute",
  top: -120,
  left: -100,
  width: 240,
  height: 240,
  background: "radial-gradient(circle, rgba(22,224,194,.35), transparent 60%)",
  pointerEvents: "none",
};

const glowBottom: React.CSSProperties = {
  position: "absolute",
  bottom: -120,
  right: -100,
  width: 260,
  height: 260,
  background: "radial-gradient(circle, rgba(66,135,245,.35), transparent 60%)",
  pointerEvents: "none",
};

const headerRow: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

const logoWrap: React.CSSProperties = {
  width: 54,
  height: 54,
  borderRadius: 14,
  background: "rgba(255,255,255,.10)",
  border: "1px solid rgba(255,255,255,.14)",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  flex: "0 0 auto",
  position: "relative",
};

const logoImg: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const logoFallback: React.CSSProperties = {
  position: "absolute",
  fontWeight: 900,
  letterSpacing: ".06em",
  opacity: 0.9,
  fontSize: 14,
};

const schoolName: React.CSSProperties = {
  fontWeight: 900,
  letterSpacing: ".02em",
  fontSize: "clamp(14px, 4vw, 16px)",
  lineHeight: 1.15,
};

const slogan: React.CSSProperties = {
  fontSize: "clamp(11px, 3.5vw, 12.5px)",
  opacity: 0.85,
  marginTop: 2,
};

const badgesRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 12,
  alignItems: "center",
};

const badgePrimary: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  background: "rgba(22,224,194,.20)",
  border: "1px solid rgba(22,224,194,.25)",
  padding: "6px 10px",
  borderRadius: 999,
};

const badgeSoft: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  opacity: 0.9,
  background: "rgba(255,255,255,.10)",
  border: "1px solid rgba(255,255,255,.14)",
  padding: "6px 10px",
  borderRadius: 999,
};

const title: React.CSSProperties = {
  margin: "10px 0 10px",
  fontSize: "clamp(18px, 5vw, 22px)",
  lineHeight: 1.1,
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 6,
};

const infoPill: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 14,
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.12)",
  color: "#EAF6FF",
  fontSize: "clamp(12px, 3.2vw, 13.5px)",
};

const btnRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  marginTop: 12,
  flexWrap: "wrap",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  background: "#16e0c2",
  color: "#003b36",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "clamp(12px, 2.5vw, 13px)",
  minWidth: 150,
  textAlign: "center",
  display: "inline-block",
};

const btnWhatsapp: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  background: "#25D366",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: "clamp(12px, 2.5vw, 13px)",
  minWidth: 150,
  textAlign: "center",
  display: "inline-block",
};

const footerNote: React.CSSProperties = {
  marginTop: 12,
  fontSize: 12,
  opacity: 0.8,
  textAlign: "center",
};
