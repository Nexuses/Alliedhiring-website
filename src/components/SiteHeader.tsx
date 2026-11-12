"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteHeader() {
  useEffect(() => {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    if (!burger || !menu) return;

    const onBurger = () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    };
    const onMenuClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    };

    burger.addEventListener("click", onBurger);
    menu.addEventListener("click", onMenuClick);
    return () => {
      burger.removeEventListener("click", onBurger);
      menu.removeEventListener("click", onMenuClick);
    };
  }, []);

  return (
    <>
      <div className="topbar">
        <b>Top 1% talent. Fully managed.</b>{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          Share your requirement
        </Link>
      </div>

      <header className="nav">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="Allied Hiring">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Allied Hiring" width={136} height={43} />
          </Link>
          <nav className="menu" id="menu">
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/#services">Services</Link>
            <Link href="/insights">Insights</Link>
          </nav>
          <Link className="btn btn-navy" href="/contact">
            Book a call <span className="arr">↗</span>
          </Link>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            aria-expanded="false"
            type="button"
          >
            ☰
          </button>
        </div>
      </header>
    </>
  );
}
