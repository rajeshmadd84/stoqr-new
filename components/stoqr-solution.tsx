"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import Image from "next/image"

export function StoqrSolution() {
  const [sectionInView, setSectionInView] = useState(false)
  const [whatsappInView, setWhatsappInView] = useState(false)
  const [voiceInView, setVoiceInView] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const whatsappSectionRef = useRef<HTMLDivElement>(null)
  const voiceSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setSectionInView(true)
          } else if (entry.target === whatsappSectionRef.current) {
            setWhatsappInView(true)
          } else if (entry.target === voiceSectionRef.current) {
            setVoiceInView(true)
          }
        }
      })
    }, observerOptions)

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (whatsappSectionRef.current) observer.observe(whatsappSectionRef.current)
    if (voiceSectionRef.current) observer.observe(voiceSectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollY(0)
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getParallaxOffset = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (!sectionRef.current || typeof window === "undefined" || window.innerWidth < 1024) {
      return 0
    }

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const sectionHeight = rect.height
    const windowHeight = window.innerHeight

    // Calculate how far we've scrolled into this section
    const scrollIntoSection = scrollY + windowHeight / 2 - sectionTop
    const scrollProgress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight))

    // Simple linear movement from 0 to 80px as you scroll through the section
    // This creates smooth downward movement without any jumps
    return scrollProgress * 80
  }

  const whatsappParallax = getParallaxOffset(whatsappSectionRef)
  const voiceParallax = getParallaxOffset(voiceSectionRef)

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 relative z-10">
      <div>
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div
              className={`transition-all duration-1000 ease-out ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative aspect-[3/3.2] rounded-2xl overflow-hidden">
                <Image
                  src="/images/stoqrsolution.png"
                  alt="Modern car dealership showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-balance leading-[1.5]">
                <span className="text-slate-900">Agentic Ai for <br></br></span>{" "}
                <span className="text-blue-400">
                High Frequency Sales.
                </span>
              </h2>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border-2 border-blue-400 bg-slate-50 p-5">
                  <h2 className="font-bold text-slate-900 text-2xl mb-2">Smart visits</h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    AI pre-fills carts based on 12 months of purchase history. Validation takes 10 seconds, allowing for 30% more visits per day.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-blue-400 bg-slate-50 p-5">
                  <h2 className="font-bold text-slate-900 text-2xl mb-2">Behavioral Gamification</h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    "Live Challenges" trigger during the visit. Psychologically motivate retailers to hit new tiers in real-time.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-blue-400 bg-slate-50 p-5">
                  <h2 className="font-bold text-slate-900 text-2xl mb-2">Offline-First Architecture</h2>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Designed for the real world—basements, rural kiosks, and dead zones. Syncs automatically when back online.
                  </p>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </section>
  )
}
