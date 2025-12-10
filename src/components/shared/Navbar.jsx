// src/components/shared/Navbar.jsx
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = ({ navConfig }) => {
  const { links, actions } = navConfig;
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ تحميل وضع الداكن/الفاتح من localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleNavbar = () => setMobileDrawerOpen((prev) => !prev);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b transition-colors duration-300
                 bg-white/80 border-neutral-300 text-neutral-800
                 dark:bg-neutral-900/80 dark:border-neutral-700 dark:text-neutral-100"
    >
      <div className="container px-4 mx-auto relative flex justify-between items-center">
        
        {/* 🔹 Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center hover:text-[#FABC05] transition-colors duration-200 font-medium">
            <img className="h-10 w-10 mr-2 rounded-md" src={logo} alt="Logo" />
            <span className="text-xl font-bold tracking-tight">WEBSCALE</span>
          </Link>
        </div>

        {/* 🔹 Desktop Menu */}
        <ul className="hidden lg:flex ml-14 space-x-12 rtl:space-x-reverse">
          {links.map((item, index) => (
            <li key={index}>
              {item.href.startsWith('/') ? (
                <Link to={item.href} className="hover:text-[#FABC05] transition-colors duration-200 font-medium">
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className="hover:text-[#FABC05] transition-colors duration-200 font-medium">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* 🔹 Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
          {actions.map((action, index) => (
            action.href.startsWith('/') ? (
              <Link
                key={index}
                to={action.href}
                className={
                  action.type === "primary"
                    ? "py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-500 bg-gradient-to-r from-[#FABC05]/90 to-[#c89d1b]/90 text-neutral-100 font-medium shadow-sm hover:scale-105 transition-all duration-100"
                    : "py-2 px-4 rounded-md bg-neutral-200 text-neutral-700 dark:text-[#FABC05] dark:bg-neutral-600 font-medium shadow-sm hover:opacity-90 transition-opacity"
                }
              >
                {action.label}
              </Link>
            ) : (
              <a
                key={index}
                href={action.href}
                className={
                  action.type === "primary"
                    ? "py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-500 bg-gradient-to-r from-[#FABC05]/90 to-[#c89d1b]/90 text-neutral-100 font-medium shadow-sm hover:scale-105 transition-all duration-100"
                    : "py-2 px-4 rounded-md bg-neutral-200 text-neutral-700 dark:text-[#FABC05] dark:bg-neutral-600 font-medium shadow-sm hover:opacity-90 transition-opacity"
                }
              >
                {action.label}
              </a>
            )
          ))}

          {/* DarkMode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 
                       hover:bg-neutral-100 dark:hover:bg-neutral-800 
                       transition-all hover:scale-110"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
          </button>
        </div>

        {/* 🔹 Mobile Actions & Menu Button */}
        <div className="lg:hidden flex items-center gap-1.5">
          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-1.5">
            {actions.map((action, index) => (
              action.href.startsWith('/') ? (
                <Link
                  key={index}
                  to={action.href}
                  className={
                    action.type === "primary"
                      ? "py-2 px-2.5 text-xs sm:text-sm rounded-md bg-gradient-to-r from-[#FABC05]/90 to-[#c89d1b]/90 text-neutral-100 font-semibold shadow-sm hover:scale-105 transition-all whitespace-nowrap"
                      : "py-2 px-2.5 text-xs sm:text-sm rounded-md bg-neutral-200 text-neutral-700 dark:text-[#FABC05] dark:bg-neutral-600 font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                  }
                >
                  {action.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={action.href}
                  className={
                    action.type === "primary"
                      ? "py-2 px-2.5 text-xs sm:text-sm rounded-md bg-gradient-to-r from-[#FABC05]/90 to-[#c89d1b]/90 text-neutral-100 font-semibold shadow-sm hover:scale-105 transition-all whitespace-nowrap"
                      : "py-2 px-2.5 text-xs sm:text-sm rounded-md bg-neutral-200 text-neutral-700 dark:text-[#FABC05] dark:bg-neutral-600 font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                  }
                >
                  {action.label}
                </a>
              )
            ))}
          </div>
          <button onClick={toggleNavbar} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition">
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Drawer */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden p-6 flex flex-col items-center space-y-6 
                     bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 
                     transition-colors duration-300 border-t border-neutral-300 dark:border-neutral-700"
        >
          {links.map((item, index) => (
            item.href.startsWith('/') ? (
              <Link
                key={index}
                to={item.href}
                className="hover:text-[#FABC05] transition-colors"
                onClick={() => setMobileDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={index}
                href={item.href}
                className="hover:text-[#FABC05] transition-colors"
                onClick={() => setMobileDrawerOpen(false)}
              >
                {item.label}
              </a>
            )
          ))}

          {actions.map((action, index) => (
            action.href.startsWith('/') ? (
              <Link
                key={index}
                to={action.href}
                className={
                  action.type === "primary"
                    ? "py-2 px-4 rounded-md bg-gradient-to-r from-[#FABC05] to-[#977b25] text-white font-medium shadow-sm hover:opacity-90 transition"
                    : "py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                }
                onClick={() => setMobileDrawerOpen(false)}
              >
                {action.label}
              </Link>
            ) : (
              <a
                key={index}
                href={action.href}
                className={
                  action.type === "primary"
                    ? "py-2 px-4 rounded-md bg-gradient-to-r from-[#FABC05] to-[#977b25] text-white font-medium shadow-sm hover:opacity-90 transition"
                    : "py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                }
                onClick={() => setMobileDrawerOpen(false)}
              >
                {action.label}
              </a>
            )
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 
                       hover:bg-neutral-100 dark:hover:bg-neutral-800 
                       transition-all hover:scale-110"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




// // src/components/shared/Navbar.jsx
// import { Menu, X, Sun, Moon } from "lucide-react";
// import { useState, useEffect } from "react";
// import logo from "../../assets/logo.png";
// import { navItems } from "../../constants";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedMode = localStorage.getItem("theme");
//     if (savedMode === "dark") {
//       document.documentElement.classList.add("dark");
//       setDarkMode(true);
//     }
//   }, []);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen((prev) => !prev);
//   };

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);

//     if (newMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   return (
//     <nav
//       className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b transition-colors duration-300
//                  bg-white/80 border-neutral-300 text-neutral-800
//                  dark:bg-neutral-900/80 dark:border-neutral-700 dark:text-neutral-100"
//     >
//       <div className="container px-4 mx-auto relative flex justify-between items-center">
        
//         {/* Logo */}
//         <div className="flex items-center flex-shrink-0">
//               <a
//                 href="#hero"
//                 className="flex items-center flex-shrink-0 hover:text-[#FABC05] transition-colors duration-200 font-medium"
//               >
//           <img className="h-10 w-10 mr-2 rounded-md" src={logo} alt="Logo" />
//           <span className="text-xl font-bold tracking-tight">ملتقى WEBSCALE</span>
//                 {/* {item.label} */}
//               </a>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex ml-14 space-x-12 rtl:space-x-reverse">
//           {navItems.map((item, index) => (
//             <li key={index}>
//               <a
//                 href={item.href}
//                 className="hover:text-[#FABC05] transition-colors duration-200 font-medium"
//               >
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop Actions */}
//         <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
//           <a
//             href="#register"
//             className="py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-500 
//                        bg-gradient-to-r from-[#FABC05]/90 to-[#977b25]/90 
//                        text-neutral-100 dark:text-neutral-100 font-medium
//                        hover:from-[#FABC05] hover:to-[#977b25] 
//                        transition-colors duration-200 shadow-sm"
//           >
//             تسجيل الحضور
//           </a>

//           <a
//             href="#about"
//             className="py-2 px-4 rounded-md bg-gradient-to-r bg-neutral-200 text-neutral-700 dark:text-[#FABC05] dark:bg-neutral-600 
//                         font-medium shadow-sm
//                        hover:opacity-90 transition-opacity"
//           >
//             تفاصيل الملتقى
//           </a>

//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 
//                        hover:bg-neutral-100 dark:hover:bg-neutral-800 
//                        transition-all hover:scale-110"
//           >
//             {darkMode ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden">
//           <button
//             onClick={toggleNavbar}
//             className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition"
//           >
//             {mobileDrawerOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       {mobileDrawerOpen && (
//         <div
//           className="lg:hidden p-6 flex flex-col items-center space-y-6 
//                      bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 
//                      transition-colors duration-300 border-t border-neutral-300 dark:border-neutral-700"
//         >
//           {navItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className="hover:text-[#FABC05] transition-colors"
//               onClick={() => setMobileDrawerOpen(false)}
//             >
//               {item.label}
//             </a>
//           ))}
//           <a
//             href="#register"
//             className="py-2 px-4 rounded-md bg-gradient-to-r from-[#FABC05] to-[#977b25] 
//                        text-white font-medium shadow-sm hover:opacity-90 transition"
//             onClick={() => setMobileDrawerOpen(false)}
//           >
//             تسجيل الحضور
//           </a>
//           <a
//             href="#about"
//             className="py-2 px-4 rounded-md border border-neutral-300 dark:border-neutral-600 
//                        text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
//             onClick={() => setMobileDrawerOpen(false)}
//           >
//             تفاصيل الملتقى
//           </a>
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full border border-neutral-300 dark:border-neutral-600 
//                        hover:bg-neutral-100 dark:hover:bg-neutral-800 
//                        transition-all hover:scale-110"
//           >
//             {darkMode ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
