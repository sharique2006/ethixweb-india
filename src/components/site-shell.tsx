
"use client";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("ethixweb-theme");
    const isDark = savedTheme !== "light";

    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;

    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    localStorage.setItem("ethixweb-theme", nextDark ? "dark" : "light");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link
          href="/"
          className="wordmark"
          aria-label="Ethixweb home"
          onClick={closeMenu}
        >
          <img
            src="/images/ethixweb-ind.png"
            alt="ETHIXWEB IND"
            className="site-logo"
            width={270}
            height={60}
          />
        </Link>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              dark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={dark ? "Light theme" : "Dark theme"}
            disabled={!ready}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="main-navigation"
          className="menu-panel"
          aria-label="Main navigation"
        >
          <div className="menu-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="menu-link"
                onClick={closeMenu}
              >
                {link.label}
                {link.href === "/" && (
                  <span className="menu-active-indicator" />
                )}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="menu-cta"
            onClick={closeMenu}
          >
            Start a project <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link
            href="/"
            className="wordmark footer-wordmark"
            aria-label="Ethixweb home"
          >
            <img
              src="/ethixweb-logo.svg"
              alt="ETHIXWEB"
              className="site-logo"
              width={270}
              height={52}
            />
          </Link>

          <p>Digital craft. Practical AI. Measurable growth.</p>
        </div>

        <div className="footer-links">
          <div className="footer-link-group">
            <span className="footer-heading">COMPANY</span>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-link-group">
            <span className="footer-heading">GET IN TOUCH</span>
            <Link href="/contact">
              Start a project <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Ethixweb India. All rights reserved.
        </span>
        <span>Built for ambitious Indian businesses.</span>
      </div>
    </footer>
  );
}
