"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/ui/SearchModal";
import { siteLogo, siteShortName, navItems } from "@/lib/site-config";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setIsDarkMode(stored === "true");
      document.documentElement.classList.toggle("dark", stored === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 dark:bg-sporting-dark/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container-sporting">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-lg shadow-sporting-green/30 group-hover:shadow-sporting-green/50 transition-all duration-300 group-hover:scale-105 bg-white/90 flex items-center justify-center">
                <Image src={siteLogo} alt="Directivo Algarve logo" width={48} height={48} className="object-contain w-full h-full p-1" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-lg md:text-xl text-sporting-dark dark:text-white leading-tight">
                  {siteShortName}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                  Claque Sporting CP • Algarve
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link px-4 py-2 rounded-lg text-sm",
                    pathname === item.href
                      ? "nav-link-active bg-sporting-green/5 dark:bg-sporting-green-light/10"
                      : ""
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-ghost p-2 rounded-xl text-lg"
                aria-label="Pesquisar"
                title="Pesquisar (Ctrl+K)"
              >
                🔍
              </button>
              <button
                onClick={toggleDarkMode}
                className="btn-ghost p-2 rounded-xl text-lg"
                aria-label="Alternar modo escuro"
                title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn-ghost p-2 rounded-xl"
                aria-label="Abrir menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={cn("block h-0.5 w-full bg-sporting-dark dark:bg-white rounded transition-all duration-300", isMenuOpen && "rotate-45 translate-y-[9px]")} />
                  <span className={cn("block h-0.5 w-full bg-sporting-dark dark:bg-white rounded transition-all duration-300", isMenuOpen && "opacity-0")} />
                  <span className={cn("block h-0.5 w-full bg-sporting-dark dark:bg-white rounded transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-[9px]")} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("lg:hidden transition-all duration-300 overflow-hidden", isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
          <nav className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-xl">
            <div className="container-sporting py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-sporting-green/10 text-sporting-green dark:bg-sporting-green-light/10 dark:text-sporting-green-light"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}