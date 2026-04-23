"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const features = [
  {
    number: "01",
    title: "AI-Powered Visit Intelligence",
    description:
      "Every outlet visit is guided by live data. Stoqr shows your agents which SKUs are at risk, which shelves need filling, and exactly what to pitch — before they even walk in.",
    image: "/images/aibot.jpg",
  },
  {
    number: "02",
    title: "Automated Order Capture",
    description:
      "Orders are captured in seconds via voice or scan — no manual entry, no errors. Stoqr auto-validates stock, confirms pricing, and pushes orders downstream instantly.",
    image: "/images/michael-ai-agent.jpg",
  },
  {
    number: "03",
    title: "Dynamic Sales Challenges",
    description:
      "Replace flat discounts with live, gamified challenges that push basket size and priority SKU sell-through. Agents are motivated, retailers are engaged, and revenue moves.",
    image: "/images/dealership-showroom.jpg",
  },
]

export function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    featureRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTransitioning(true)
            setTimeout(() => {
              setActiveIndex(i)
              setTransitioning(false)
            }, 150)
          }
        },
        { threshold: 0.55 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="relative bg-black py-24 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          The <span className="text-blue-400">Stoqr</span> Solution
        </h2>
        <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
          Replace guesswork with intelligence. Every step of the last mile — automated, optimised, and measurable.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Left — scrollable features */}
        <div className="w-full md:w-1/2 flex flex-col">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => { featureRefs.current[i] = el }}
              className={`min-h-[60vh] flex flex-col justify-center py-16 border-l-2 pl-8 transition-all duration-500 ${
                activeIndex === i
                  ? "border-blue-400"
                  : "border-white/10"
              }`}
            >
              <span className={`text-sm font-mono font-semibold mb-4 tracking-widest transition-colors duration-500 ${
                activeIndex === i ? "text-blue-400" : "text-white/30"
              }`}>
                {feature.number}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-500 ${
                activeIndex === i ? "text-white" : "text-white/40"
              }`}>
                {feature.title}
              </h3>
              <p className={`text-base sm:text-lg leading-relaxed max-w-md transition-colors duration-500 ${
                activeIndex === i ? "text-white/70" : "text-white/25"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right — sticky image (dealership card style) */}
        <div className="hidden md:flex w-full md:w-1/2 sticky top-1/4 self-start">
          <div className="relative w-full aspect-video bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 z-10 pointer-events-none" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 z-10 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Crossfading images */}
            {features.map((feature, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeIndex === i && !transitioning ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
