"use client"

const steps = [
  {
    number: "01",
    title: "ERP Integration",
    description: "Connect your ERP to Stoqr RI using plug and play connectors. No code, no middleware, no headaches.",
  },
  {
    number: "02",
    title: "Guided In-Store Execution",
    description: "Voice or scan order capture in seconds. Live challenges push basket size and priority SKUs in real-time.",
  },
  {
    number: "03",
    title: "Real-Time ERP Sync",
    description: "Orders are validated and pushed downstream to your ERP in under 10 seconds — zero manual entry.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            How <span className="text-blue-400">Stoqr</span> Works
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            From visit planning to ERP sync — fully automated, fully intelligent.
          </p>
        </div>

        {/* Three cards in a row with arrows */}
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center flex-1">
              <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex-1 w-full">
                {/* Number icon */}
                <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                  <span className="text-blue-400 text-xl font-bold font-mono">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center px-3 py-4 md:py-0 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-400/60 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
