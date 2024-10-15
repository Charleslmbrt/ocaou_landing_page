"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Images
import logoOcaou from "/public/image/logo-ocaou.svg";
import iconCart from "/public/image/icon-cart-2.svg";
import iconAccount from "/public/image/icon-account.svg";

// Packages
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const links = document.querySelectorAll(
      "li.cursor-pointer.underline-hover"
    );

    links.forEach((link) => {
      const underline = document.createElement("div");
      underline.className = "underline";
      underline.style.position = "absolute";
      underline.style.left = "0";
      underline.style.bottom = "0";
      underline.style.width = "0";
      underline.style.height = "2px";
      underline.style.backgroundColor = "#d7ac05";
      underline.style.transition = "width 0.2s ease-in-out";
      link.style.position = "relative";
      link.style.paddingBottom = "5px";
      link.appendChild(underline);

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { width: "100%", duration: 0.1 });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { width: "0%", duration: 0.1 });
      });
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.1, ease: "expo.inOut" });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.1,
        ease: "expo.inOut",
      });
    }
  }, [menuOpen]);

  const scrollToSection = (className) => {
    const section = document.querySelector(`.${className}`);
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      const isMobile = window.innerWidth <= 768;
      const isSacSection = className === "bags-content";
      const offsetPosition =
        isMobile && isSacSection
          ? sectionPosition - headerHeight - 130
          : sectionPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMenuItemClick = (className) => {
    scrollToSection(className);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="hidden sm:h-5 sm:w-full sm:bg-lin"></div>
      <div
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white border-b border-slate-200" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 sm:py-5 sm:px-24">
          <Link href="/">
            <Image
              src={logoOcaou}
              alt="logo O'CAOU"
              width={135}
              onClick={scrollToTop}
              className="cursor-pointer"
            />
          </Link>

          <ul className="hidden sm:flex sm:items-center sm:text-base sm:gap-10">
            <li
              onClick={() => scrollToSection("bags-content")}
              className="cursor-pointer underline-hover"
            >
              Le Sac
            </li>
            <li
              onClick={() => scrollToSection("use-content")}
              className="cursor-pointer underline-hover"
            >
              L&rsquo;Usage
            </li>
            <li
              onClick={() => scrollToSection("spirit-content")}
              className="cursor-pointer underline-hover"
            >
              L&rsquo;Esprit
            </li>
            <li className="cursor-pointer underline-hover">
              <a href="mailto:hello@ocaou.com">Contact</a>
            </li>

            <div className="flex sm:gap-5">
              <li className="bg-gold text-white rounded-lg py-2 px-6 cursor-pointer transition-transform transform hover:scale-95">
                <a target="_blank" href="">
                  Acheter
                </a>
              </li>
              <li className="bg-sand text-white rounded-lg py-2 px-6 cursor-pointer transition-transform transform hover:scale-95">
                <a target="_blank" href="">
                  Revendeur
                </a>
              </li>
              <li className="w-11 h-11 flex justify-center items-center rounded-full border border-black p-2 cursor-pointer transition-transform transform hover:scale-95">
                <Image
                  src={iconCart}
                  alt="Voir mon panier"
                  width={25}
                  height={25}
                />
              </li>
              <li className="w-11 h-11 flex justify-center items-center rounded-full border border-black p-2 cursor-pointer transition-transform transform hover:scale-95">
                <Image
                  src={iconAccount}
                  alt="Créer un compte"
                  width={16}
                  height={16}
                />
              </li>
            </div>
          </ul>

          <div
            id="hamburger"
            onClick={toggleMenu}
            className="sm:hidden cursor-pointer relative z-50 flex items-center"
          >
            <div className="rounded-full border border-black p-1 cursor-pointer transition-transform transform hover:scale-95">
              <Image src={iconCart} alt="icon panier" width={25} height={25} />
            </div>
            <div className="ml-4">
              <span
                className={`block h-1 w-10 bg-black mb-1 transition-transform duration-200 ease-in-out ${
                  menuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-10 bg-black mb-1 transition-opacity duration-200 ease-in-out ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-10 bg-black transition-transform duration-200 ease-in-out ${
                  menuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={menuRef}
        className={`fixed top-0 right-0 w-full h-full bg-sand transform translate-x-full transition-transform duration-500 ease-in-out z-40`}
      >
        <ul className="flex flex-col items-center px-6 h-screen justify-center space-y-7 text-white text-3xl uppercase font-bold">
          <li
            onClick={() => handleMenuItemClick("bags-content")}
            className="cursor-pointer underline-hover"
          >
            Le Sac
          </li>
          <li
            onClick={() => handleMenuItemClick("use-content")}
            className="cursor-pointer underline-hover"
          >
            L&rsquo;Usage
          </li>
          <li
            onClick={() => handleMenuItemClick("spirit-content")}
            className="cursor-pointer underline-hover"
          >
            L&rsquo;Esprit
          </li>
          <li className="cursor-pointer underline-hover">
            <a href="mailto:hello@ocaou.com"> Contact</a>
          </li>
          <li className="cursor-pointer underline-hover">
            <a href="mailto:hello@ocaou.com"> Acheter</a>
          </li>
          <li className="cursor-pointer underline-hover">
            <a href="mailto:hello@ocaou.com"> Revendeur</a>
          </li>
        </ul>
      </div>
    </>
  );
}
