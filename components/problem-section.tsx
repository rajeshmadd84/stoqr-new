const cards = [
  {
    title: "Blind Visits",
    description:
      "Agents lack real-time context, pushing generic stock instead of targeting neighborhood specific demand.",
  },
  {
    title: "The Data Entry Trap",
    description:
      "Your best agents spend 15 minutes typing and only 2 minutes selling. It's a robotic task killing your ROI.",
  },
  {
    title: "Static Incentives",
    description:
      "Flat discounts don't drive impulse buying. Without \"Live Challenges,\" you're leaving basket-size growth on the table.",
  },
]

export function ProblemSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      {/* Section header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          The <span className="text-blue-400">Last-Mile Blackbox</span> is leaking your revenue.
        </h2>
        <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
          From van sales to modern trade, Stoqr gives your distribution teams the intelligence they need to win at the last mile.
        </p>
      </div>

      {/* Three cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-rose-700/40 backdrop-blur-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ backgroundColor: '#ffaaaa' }}
          >
            <h3 className="text-2xl font-semibold text-black">{card.title}</h3>
            <p className="text-black/70 leading-relaxed text-sm sm:text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
