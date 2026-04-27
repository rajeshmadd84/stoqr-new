"use client"

import { useEffect, useState } from "react"
import { Linkedin } from "lucide-react"

const team = [
  { name: "Rajesh Maddineni", role: "Founder & CEO", initials: "RM", linkedin: "#" },
  { name: "Tahrun Sai Kalimili", role: "CTO", initials: "TS", linkedin: "#" },
  { name: "Vishnu Srujan Kolli", role: "CPO", initials: "VK", linkedin: "#" },
  { name: "Hari Sagaran", role: "CGO", initials: "HS", linkedin: "#" },
]

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("team")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" className="py-16 md:py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="text-sm font-medium text-white/80">The Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            People Behind{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Stoqr
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            A focused team building AI that thinks, plans, and acts for your business.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-full p-6 md:p-8 rounded-2xl border border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/10%),theme(backgroundColor.white/3%))] backdrop-blur-sm hover:border-white/20 transition-colors duration-300 flex flex-col">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center mb-5">
                  <span className="text-lg font-semibold text-white">{member.initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-white/50 font-medium">{member.role}</p>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                  <a
                    href={member.linkedin}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-200"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
