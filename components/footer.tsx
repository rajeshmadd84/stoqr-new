"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { LinkedinIcon } from "lucide-react"
import Image from "next/image"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "/features" },
      { title: "AI Team", href: "/ai-team" },
      { title: "ROI Calculator", href: "/roi-calculator" },
      { title: "Integration", href: "/integration" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Case Studies", href: "/case-studies" },
      { title: "Documentation", href: "/docs" },
      { title: "Support", href: "/support" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "LinkedIn", href: "https://www.linkedin.com/company/getstoqr", icon: LinkedinIcon },
    ],
  },
]

export function Footer() {
  const socialLinks = footerLinks.find((section) => section.label === "Social Links")?.links || []

  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-white px-6 py-12 lg:py-16">
      <div className="bg-gray-200 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* First Column - Logo (Left Aligned on Desktop, Center on Mobile) */}
        <div className="flex justify-center md:justify-start">
          <AnimatedContainer>
            <Image src="/images/logo.svg" alt="Stoqr Logo" width={72} height={20} className="h-12 w-auto" />
          </AnimatedContainer>
        </div>

        {/* Second Column - Copyright (Center Aligned) */}
        <div className="flex justify-center">
          <AnimatedContainer delay={0.1}>
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Stoqr. All rights reserved.</p>
          </AnimatedContainer>
        </div>

        {/* Third Column - Social Icons (Right Aligned on Desktop, Center on Mobile) */}
        <div className="flex justify-center md:justify-end">
          <AnimatedContainer delay={0.2}>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                link.icon && (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    aria-label={link.title}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                )
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
