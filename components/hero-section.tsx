"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-neutral-950 overflow-hidden">
      {/* Animated path background */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-0 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left — Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-heading">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in-badge">
            <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse" />
            Turn Every Sales Visit into a Data Driven Opportunity
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-4 leading-tight">
            Retail Intelligence for{" "}
            <span className="text-blue-400">the Last Mile</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 text-balance max-w-2xl mb-8 leading-relaxed animate-fade-in-subheading">
            Stoqr equips field sales teams with real-time insights, predictive ordering, and intelligent execution tools to drive retail growth across fragmented distribution networks.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 animate-fade-in-buttons">
            <Button
              size="lg"
              className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-lg group cursor-pointer"
            >
              Start Automating
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in-hero">
          <div className="relative w-full max-w-sm md:max-w-none aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
            <Image
              src="/images/hero.webp"
              alt="AI-powered sales automation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
