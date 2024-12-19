"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/#projects", label: "Projects" },
    { href: "/#education", label: "Education" },
    { href: "/#experience", label: "Experience" },
  ];

  const socialLinks = [
    {
      href: personalInfo.githubUrl,
      icon: <Github size={20} />,
      condition: true,
    },
    {
      href: personalInfo.linkedinUrl,
      icon: <Linkedin size={20} />,
      condition: personalInfo.linkedinUrl,
    },
    {
      href: `mailto:${personalInfo.email}`,
      icon: <Mail size={20} />,
      condition: true,
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-foreground">
                {personalInfo.name}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center space-x-3">
              {socialLinks.map(
                (link) =>
                  link.condition && (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.icon}
                    </a>
                  ),
              )}
              <ModeToggle />
            </div>
          </div>

          {/* Mobile navigation button */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex space-x-3 pt-2">
                {socialLinks.map(
                  (link) =>
                    link.condition && (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.icon}
                      </a>
                    ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
