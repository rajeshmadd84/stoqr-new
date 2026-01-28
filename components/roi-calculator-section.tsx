"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

interface CalculatorInputs {
  monthlyVisitors: number
  salesOrders: number
  currentProcessingTime: number
  businessType: string
}

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyVisitors: 1000,
    salesOrders: 1000,
    currentProcessingTime: 15,
    businessType: "ecommerce",
  })

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

  const getBusinessDefaults = () => {
    const businessDefaults = {
      ecommerce: { avgOrder: 85, maxOrder: 500, conversion: 35, response: 80, satisfaction: 45 },
      retail: { avgOrder: 65, maxOrder: 300, conversion: 30, response: 75, satisfaction: 40 },
      realestate: { avgOrder: 5000, maxOrder: 50000, conversion: 40, response: 85, satisfaction: 50 },
      hospitality: { avgOrder: 180, maxOrder: 1000, conversion: 25, response: 70, satisfaction: 35 },
      healthcare: { avgOrder: 250, maxOrder: 2000, conversion: 45, response: 90, satisfaction: 55 },
      finance: { avgOrder: 1200, maxOrder: 10000, conversion: 35, response: 85, satisfaction: 50 },
      automotive: { avgOrder: 25000, maxOrder: 100000, conversion: 30, response: 75, satisfaction: 40 },
      default: { avgOrder: 150, maxOrder: 2000, conversion: 35, response: 80, satisfaction: 45 },
    }

    return businessDefaults[inputs.businessType as keyof typeof businessDefaults] || businessDefaults.default
  }


  const businessConfig = getBusinessDefaults()
  const improvements = {
    conversion: businessConfig.conversion,
    response: businessConfig.response,
    satisfaction: businessConfig.satisfaction,
  }

  // Current metrics
  const totalOrders = inputs.monthlyVisitors + inputs.salesOrders // Purchase Orders + Sales Orders
  const currentTotalTime = totalOrders * inputs.currentProcessingTime // total minutes
  const currentHours = Math.round(currentTotalTime / 60)
  const currentTotalTimeHours = (currentTotalTime / 60).toFixed(1)

  // Improved metrics with Stoqr AI - Fixed 10 seconds per document
  const stoqrProcessingTimeSeconds = 10 // Fixed 10 seconds per document
  const stoqrProcessingTimeMinutes = stoqrProcessingTimeSeconds / 60 // Convert to minutes (0.167 minutes)
  const newTotalTime = totalOrders * stoqrProcessingTimeMinutes // total minutes with Stoqr AI
  const newHours = Math.round(newTotalTime / 60)
  const newTotalTimeHours = (newTotalTime / 60).toFixed(1)

  // Gains
  const timeSaved = currentTotalTime - newTotalTime
  const hoursSaved = Math.round(timeSaved / 60)
  const timeSavedHours = (timeSaved / 60).toFixed(1)
  const timeReduction = ((currentTotalTime - newTotalTime) / currentTotalTime) * 100 // Calculate percentage reduction

  return (
    <section id="roi-calculator" className="pt-4 pb-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">AI in Action</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
          AI That {" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Thinks. Plans. Acts.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-balance">
          Calculate how much time, cost, and revenue leakage Stoqr can eliminate using AI-driven ERP automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Calculator Inputs */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] border-white/20 backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">Time spent on manual processing</h3>

              <div className="space-y-8 flex-1">
                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Business Type</label>
                  <div className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white">
                    General FMCG distribution companies
                  </div>
                </div>

                {/* Purchase Orders */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Purchase Orders:{" "}
                    <span className="text-white font-semibold">{inputs.monthlyVisitors.toLocaleString()}</span>
                  </label>
                  <Slider
                    value={[inputs.monthlyVisitors]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, monthlyVisitors: value }))}
                    max={5000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>100</span>
                    <span>5000</span>
                  </div>
                </div>

                {/* Sales Orders */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Sales Orders:{" "}
                    <span className="text-white font-semibold">{inputs.salesOrders.toLocaleString()}</span>
                  </label>
                  <Slider
                    value={[inputs.salesOrders]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, salesOrders: value }))}
                    max={5000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>100</span>
                    <span>5000</span>
                  </div>
                </div>

                {/* Processing Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Processing time per document:{" "}
                    <span className="text-white font-semibold">{inputs.currentProcessingTime} min</span>
                  </label>
                  <Slider
                    value={[inputs.currentProcessingTime]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, currentProcessingTime: value }))}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5 min</span>
                    <span>60 min</span>
                  </div>
                </div>

                {/* Total Time Spent Per Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Total time spent per month
                  </label>
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white">
                      {currentTotalTimeHours} hours
                    </div>
                  </div>
                </div>

                <div className="flex-1"></div>
              </div>

              <div className="mt-6 lg:hidden">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="animate-bounce">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-primary font-medium">Scroll down to see your results</span>
                </div>
              </div>

            </Card>
          </div>

          {/* Results */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] border-white/20 backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
                Your savingswith Stoqr AI
              </h3>

              <div className="space-y-6 flex-1">
                {/* Current vs New Metrics */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 rounded-lg bg-gray-700/30">
                    <div className="text-xs md:text-sm text-gray-400 mb-1">Processing time per document</div>
                    <div className="text-xl md:text-2xl font-bold text-white">{inputs.currentProcessingTime}</div>
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
