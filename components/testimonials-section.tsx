"use client"

import { useEffect, useRef } from "react"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      heading: "Autonomous Procurement",
      description: "AI predicts demand, auto-creates POs, selects suppliers, and prevents stockouts—without manual follow-ups.",
    },
    {
      heading: "Intelligent Sales Order Flow",
      description: "Auto-validates orders, reserves inventory, confirms delivery timelines, and synchronizes dispatch in real time.",
    },
    {
      heading: "Self-Optimizing Warehousing",
      description: "Dynamic putaway, smart pick paths, live bin visibility, and continuous throughput optimization.",
    },
    {
      heading: "Agentic AI Operations",
      description: "AI agents observe, reason, and act across ERP workflows - resolving issues before humans notice.",
    },
    {
      heading: "Real-Time Visibility",
      description: "Single live view across inventory, orders, suppliers, warehouses, and exceptions.",
    },
    {
      heading: "Zero Manual Firefighting",
      description: "Proactive risk detection replaces spreadsheets, calls, and late-night escalations.",
    },
    {
      heading: "Predictive Risk Management",
      description: "Anticipates delays, shortages, and cost overruns before they impact operations.",
    },
    {
      heading: "Auto-Recovery Workflows",
      description: "AI detects failures and autonomously reroutes orders, inventory, or resources to restore flow.",
    },
    {
      heading: "Continuous Learning Engine",
      description: "Improves forecasts, decisions, and workflows with every transaction and outcome.",
    },
  ]

  return (
    <section id="ai" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Features
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
          Powerful Features.  <span className="font-medium italic">Fully Autonomous.</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Everything you need to run procurement, sales, and warehouse operations - powered by Agentic AI.
          </p>
        </div>

        {/* Fixed 3x3 Grid */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.slice(0, 9).map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-white font-semibold text-lg lg:text-xl mb-4">
                  {feature.heading}
                </h3>
                <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
