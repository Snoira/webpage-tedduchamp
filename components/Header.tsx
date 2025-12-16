"use client";

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import * as logo from "@/public/ted-duchamp-text-logo.svg";
import IconLink from '@/components/IconLink';

//TODO: 
// Animate menu open/close so it slides down/up
// Look into configuring Next.js Image component to work with Storyblok images
// Improve Storyblok error handeling (missing data/components)
// Render storyblok types using storyblok CLI

const sections = [
    { name: 'About', href: '#about' },
    { name: 'Live', href: '#live' },
    { name: 'Contact', href: '#contact' },
];

const socialMediaLinks = [
    { platform: 'instagram', url: 'https://www.instagram.com/tedduchampband/' },
    { platform: 'spotify', url: 'https://open.spotify.com/artist/62ayUk67CmlRfK4NbA9gve' },
    { platform: 'youtube', url: 'https://www.youtube.com/@TEDDUCHAMP' },
    { platform: 'tiktok', url: 'https://www.tiktok.com/@tedduchamp' },
];

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-3xl font-londrina-solid md:text-base uppercase hover:text-primary focus:text-primary transition-colors"
        >
            {children}
            <span className=" h-0.5 bg-primary transition-all duration-300"></span>
        </Link>
    );
}

export default function Header() {
    const [showNav, setShowNav] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const FOCUS_DELAY = 100;
    const MOBILE_BREAKPOINT = 768;

    const toggleNav = (state?: boolean | null) => {
        setShowNav(state ?? !showNav);
    };

    const handleResize = () => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            setShowNav(false);
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && showNav) {
            setShowNav(false);
            toggleButtonRef.current?.focus();
            return;
        }

        if (showNav && e.key === 'Tab') {
            const focusableElements = navRef.current?.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }, [showNav]);


    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    useEffect(() => {
        if (showNav) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                const focusableElements = navRef.current?.querySelectorAll(
                    'a, button, [tabindex]:not([tabindex="-1"])'
                ) as NodeListOf<HTMLElement>;

                if (focusableElements && focusableElements.length > 1) {
                    focusableElements[1]?.focus();
                }
            }, FOCUS_DELAY);

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [showNav]);

    return (
        <header className="px-8 md:px-16 pt-8 pb-4 sticky top-0 bg-background">
            <nav
                ref={navRef}
                className={`${showNav ? 'h-dvh grid grid-rows-[6rem_auto] items-end' : 'grid'} md:h-auto md:grid-rows-none md:grid-cols-3 md:items-center`}
                aria-label="Main navigation"
            >
                <div className='flex justify-between items-center place-self-start w-full md:w-auto md:order-2 md:justify-self-center'>
                    <Link href="/" onClick={() => { setShowNav(false); }}>
                        <Image
                            src={logo}
                            alt="Logo"
                            width={100}
                            height={100}
                            className="w-20 h-auto"
                        />
                    </Link>
                    <button
                        ref={toggleButtonRef}
                        className="block md:hidden"
                        aria-label={showNav ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={showNav}
                        aria-controls="mobile-navigation"
                        onClick={() => toggleNav()}>
                        <svg className={`transform transition-transform duration-300 ${showNav ? 'rotate-45' : ''}`} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                <ul
                    id="mobile-navigation"
                    className={`${showNav ? 'block' : 'hidden'} md:flex space-x-4 pb-4 md:pb-0 md:order-1 md:justify-self-start`}
                    role="menu"
                    aria-hidden={!showNav}
                >
                    {sections.map((section) => (
                        <li key={section.name}>
                            <NavLink href={section.href} onClick={() => setShowNav(false)}>
                                {section.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul
                    className={`${showNav ? 'flex' : 'hidden'} md:flex md:order-3 md:justify-self-end space-x-4 pb-8 md:pb-0`}
                    role="menu"
                    aria-hidden={!showNav}
                    aria-label="Social media links"
                >

                    {socialMediaLinks.map((socMed) => (
                        <li key={socMed.platform}>
                            <IconLink
                                url={socMed.url}
                                platform={socMed.platform as 'instagram' | 'spotify' | 'youtube' | 'tiktok'}
                                closeNavFunc={() => setShowNav(false)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}