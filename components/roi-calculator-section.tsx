"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

export function ROICalculatorSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("roi-calculator")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Fixed defaults
  const monthlyVisitors = 1000
  const salesOrders = 1000
  const currentProcessingTime = 15

  // Current metrics
  const totalOrders = monthlyVisitors + salesOrders
  const currentTotalTime = totalOrders * currentProcessingTime
  // Improved metrics with Stoqr AI - Fixed 10 seconds per document
  const stoqrProcessingTimeSeconds = 10
  const stoqrProcessingTimeMinutes = stoqrProcessingTimeSeconds / 60
  const newTotalTime = totalOrders * stoqrProcessingTimeMinutes

  // Gains
  const timeSaved = currentTotalTime - newTotalTime
  const hoursSaved = Math.round(timeSaved / 60)
  const timeReduction = ((currentTotalTime - newTotalTime) / currentTotalTime) * 100

  return (
    <section id="roi-calculator" className="pt-4 pb-16 md:py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">AI in Action</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
            AI That{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Thinks. Plans. Acts.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Calculate how much time, cost, and revenue leakage Stoqr can eliminate using AI-driven ERP automation.
          </p>
        </div>

        {/* Results */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="p-6 md:p-8 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] border-white/20 backdrop-blur-sm shadow-2xl flex flex-col">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
              Your savings with Stoqr AI
            </h3>

            <div className="space-y-6 flex-1">
              {/* Current vs New Metrics */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 rounded-lg bg-gray-700/30">
                  <div className="text-xs md:text-sm text-gray-400 mb-1">Processing time per document</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{currentProcessingTime}</div>
                  <div className="text-xs text-gray-400">minutes</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-white/10 border border-white/20">
                  <div className="text-xs md:text-sm text-gray-300 mb-1">With Stoqr AI</div>
                  <div className="text-xl md:text-2xl font-bold text-white">{stoqrProcessingTimeSeconds}</div>
                  <div className="text-xs text-gray-300">seconds</div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                    <span className="text-sm md:text-base text-white">Time Saved</span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white">{hoursSaved} hours/month</span>
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                    <span className="text-sm md:text-base text-white">Time Reduction</span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white">{timeReduction.toFixed(0)}%</span>
                </div>
              </div>

              {/* Annual Projection */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="text-center">
                  <div className="text-xs md:text-sm text-gray-300 mb-2">Projected Annual Time Saved</div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {(hoursSaved * 12).toLocaleString()} hours
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Based on your current metrics and industry benchmarks
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm text-gray-400 mt-4">* Results based on industry averages and may vary by business</p>
        </div>
      </div>
    </section>
  )
}
