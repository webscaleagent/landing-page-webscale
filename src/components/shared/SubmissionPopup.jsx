// src/components/shared/SubmissionPopup.jsx
import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Reusable popup component for form submission results
 * @param {Object} props
 * @param {Object|null} props.modal - {type: 'success'|'error', message: string} or null
 * @param {Function} props.onClose - Function to call when popup is closed
 * @param {number} props.autoCloseDelay - Auto-close delay in milliseconds (default: 8000)
 * @param {string|HTMLElement|null} props.scrollTarget - Element selector or element to scroll to before showing popup
 */
export default function SubmissionPopup({ modal, onClose, autoCloseDelay = 8000, scrollTarget = null }) {
  const popupRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Scroll to form/target and prevent body scroll when popup appears
  useEffect(() => {
    if (modal) {
      // Save current scroll position
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
      
      // First, scroll to the form or target element to center user's attention
      let targetElement = null;
      
      if (scrollTarget) {
        if (typeof scrollTarget === 'string') {
          // It's a selector
          targetElement = document.querySelector(scrollTarget);
        } else if (scrollTarget instanceof HTMLElement) {
          // It's already an element
          targetElement = scrollTarget;
        }
      }
      
      // If no specific target, try to find the form or scroll to top
      if (!targetElement) {
        // Try to find the nearest form
        const forms = document.querySelectorAll('form');
        if (forms.length > 0) {
          targetElement = forms[forms.length - 1]; // Get the last form (most likely the submitted one)
        }
      }
      
      // Scroll to target element
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      } else {
        // Scroll to top of page as fallback
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      
      // Prevent body scroll after scrolling
      setTimeout(() => {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPositionRef.current}px`;
        document.body.style.width = "100%";
        
        // Haptic feedback for mobile devices (if supported)
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]); // Vibrate pattern: 100ms on, 50ms off, 100ms on
        }
      }, 300); // Wait for scroll animation to complete
      
    } else {
      // Restore body scroll
      const scrollY = scrollPositionRef.current;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [modal, scrollTarget]);

  // Auto-close after delay
  useEffect(() => {
    if (modal && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [modal, autoCloseDelay, onClose]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
          style={{ 
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            touchAction: "none"
          }}
        >
          {/* Stronger Backdrop with pulse animation */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Popup with attention-grabbing animations */}
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className={`relative z-10 w-full max-w-sm sm:max-w-md mx-4 rounded-3xl p-6 sm:p-8 shadow-2xl text-center
              border-4
              ${
                modal.type === "success"
                  ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50 border-green-400 text-green-900 dark:from-green-900/30 dark:via-green-800/30 dark:to-green-900/30 dark:border-green-500 dark:text-green-100"
                  : "bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-400 text-red-900 dark:from-red-900/30 dark:via-red-800/30 dark:to-red-900/30 dark:border-red-500 dark:text-red-100"
              }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: "translateZ(0)", // Force GPU acceleration
              willChange: "transform"
            }}
          >
            {/* Pulsing icon */}
            <motion.div 
              className="text-5xl sm:text-6xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {modal.type === "success" ? "✅" : "⚠️"}
            </motion.div>
            
            <motion.h3 
              className="text-2xl sm:text-3xl font-extrabold mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {modal.type === "success" ? "تم بنجاح!" : "حدث خطأ"}
            </motion.h3>
            
            <motion.p 
              className="leading-relaxed text-base sm:text-lg mb-6 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {modal.message}
            </motion.p>
            
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all
                ${
                  modal.type === "success"
                    ? "bg-[#FABC05] text-black hover:bg-[#FABC05]/90 active:bg-[#FABC05]/80"
                    : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              إغلاق
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

