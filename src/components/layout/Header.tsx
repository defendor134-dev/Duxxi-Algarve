"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteLogo, siteShortName, navItems } from "@/lib/site-config";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-ultra-gray"
            : "bg-transparent"
        )}
      >
        <div className="container-ultra">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden border border-ultra-green/50 flex items-center justify-center bg-black">
                <Image src={siteLogo} alt="DA" width={48} height={48} className="object-contain w-full h-full p-1" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-black text-lg md:text-xl text-white uppercase tracking-widest leading-tight">
                  {siteShortName}
                </h1>
                <p className="text-[10px] text-gray-600 -mt-0.5 font-heading font-semibold uppercase tracking-[0.2em]">
                  Claque Ultra • Algarve
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
                    "nav-link-ultra",
                    pathname === item.href && "nav-link-ultra-active"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Link href="/socios" className="hidden md:inline-flex btn-ultra text-[10px] px-5 py-2.5">
                Ser Sócio
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden btn-ultra-ghost p-2"
                aria-label="Menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span className={cn("block h-[1.5px] w-full bg-white rounded transition-all duration-300", isMenuOpen && "rotate-45 translate-y-[7px]")} />
                  <span className={cn("block h-[1.5px] w-full bg-white rounded transition-all duration-300", isMenuOpen && "opacity-0")} />
                  <span className={cn("block h-[1.5px] w-full bg-white rounded transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-[7px]")} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn("lg:hidden transition-all duration-300 overflow-hidden", isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
          <nav className="bg-black border-t border-ultra-gray">
            <div className="container-ultra py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider transition-all duration-200 border-l-2",
                    pathname === item.href
                      ? "text-ultra-green-bright border-l-ultra-green-bright bg-ultra-green/5"
                      : "text-gray-500 border-l-transparent hover:text-white hover:border-l-ultra-green"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link href="/socios" className="btn-ultra w-full justify-center text-xs py-3">
                  Ser Sócio
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}