"use client";
// Loading splash: shows until the app has hydrated, then React removes it.
// Rendered as a React-managed component (not raw body HTML) so client-side
// navigation (router.push) never collides with the splash DOM nodes.
import { useEffect, useRef, useState } from "react";

export function LoadingSplash() {
  const ref = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Detect user/system preference from the theme class set by the root script.
    setDark(document.documentElement.classList.contains("dark"));
    // Remove the splash after hydration + first paint.
    const t = setTimeout(() => {
      if (ref.current) ref.current.remove();
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      id="__ot_loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        // Detect system/user preference: dark → dark bg, else light.
        backgroundColor: dark ? "#0a0a0f" : "#f4f6fa",
        color: dark ? "#e0e0e0" : "#1f2430",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: ".15em" }}>
        ⚡ OFFICETOOLS
      </div>
      <div
        style={{
          width: "min(220px,70vw)",
          height: 3,
          background: "rgba(0,255,245,.15)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "100%",
            background: "linear-gradient(90deg,#00fff5,#ff00ff)",
            animation: "__otslide 1.2s ease-in-out infinite",
          }}
        />
      </div>
      <div style={{ fontSize: ".75rem", letterSpacing: ".2em", opacity: 0.6 }}>
        LOADING...
      </div>
    </div>
  );
}