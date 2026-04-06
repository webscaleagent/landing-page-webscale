import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER_DISPLAY = "+213 799 92 32 48";
const WHATSAPP_NUMBER_LINK = "213799923248";

export default function WhatsAppFloat() {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(true);

      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        setShowScrollHint(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact us on WhatsApp: ${WHATSAPP_NUMBER_DISPLAY}`}
      className="group fixed bottom-12 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#25D366]"
    >
      <span
        className={`pointer-events-none absolute right-[calc(100%+0.85rem)] top-1/2 whitespace-nowrap rounded-2xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-[0_10px_30px_rgba(2,6,23,0.18)] backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-slate-900/85 dark:text-white group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 group-hover:opacity-100 group-focus-visible:opacity-100 ${
          showScrollHint ? "-translate-y-1/2 opacity-100" : "-translate-y-[45%] opacity-0"
        }`}
      >
        تواصل معنا الان
        <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-b border-white/20 bg-white/90 dark:border-white/10 dark:bg-slate-900/85" />
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-6 w-6 shrink-0 fill-current"
        aria-hidden="true"
      >
        <path d="M16 3C8.818 3 3 8.818 3 16c0 2.288.596 4.523 1.728 6.493L3 29l6.69-1.695A12.94 12.94 0 0 0 16 29c7.182 0 13-5.818 13-13S23.182 3 16 3zm0 23.812a10.74 10.74 0 0 1-5.48-1.502l-.392-.232-3.972 1.006 1.06-3.868-.256-.397A10.76 10.76 0 1 1 16 26.812zm5.903-8.043c-.323-.162-1.91-.944-2.206-1.052-.297-.108-.513-.162-.73.162-.216.323-.837 1.051-1.027 1.267-.189.216-.378.243-.702.081-.323-.162-1.365-.503-2.6-1.603-.961-.857-1.609-1.915-1.798-2.239-.189-.323-.02-.498.142-.659.146-.145.323-.378.485-.567.162-.189.216-.324.323-.54.108-.216.054-.405-.027-.567-.081-.162-.73-1.76-1-2.41-.262-.63-.528-.545-.73-.555l-.621-.011c-.216 0-.567.081-.865.405-.297.324-1.135 1.108-1.135 2.698s1.162 3.125 1.324 3.341c.162.216 2.288 3.495 5.542 4.9.774.334 1.377.533 1.847.682.776.247 1.482.212 2.04.129.623-.093 1.91-.78 2.179-1.533.27-.753.27-1.398.189-1.533-.081-.135-.297-.216-.621-.378z" />
      </svg>
    </a>
  );
}
