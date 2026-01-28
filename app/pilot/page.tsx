"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { useRouter } from "next/navigation"
import { GrainOverlay } from "@/components/grain-overlay"
import { submitPilotForm } from "@/app/actions/submit-pilot-form"
import Image from "next/image"

export default function PilotPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      companyType: formData.get("companyType") as string,
      phone: formData.get("phone") as string,
      challenges: formData.get("challenges") as string,
    }

    const result = await submitPilotForm(data)

    if (result.success) {
      setIsSuccess(true)
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } else {
      setError(result.error || "Failed to submit application")
    }

    setIsSubmitting(false)
  }

  return (
    <main
      className={`relative min-h-screen w-full overflow-hidden bg-background transition-opacity duration-500 ${isPageLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <GrainOverlay />

      <div className="absolute inset-0 z-0">
        <img
          src="/modern-construction-site-with-digital-technology-o.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <button
          onClick={() => router.push("/")}
          className="absolute left-6 top-6 flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground md:left-12 md:top-12"
          aria-label="Return to home"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="absolute right-6 top-6 md:right-12 md:top-12">
          <Image
            src="/images/stoqr-pilot.svg"
            alt="Stoqr"
            width={96}
            height={27}
            className="h-7 w-auto transition-transform hover:scale-105"
          />
        </div>

        {!isSuccess ? (
          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="mb-4 font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Start automating your supply chain today.
            </h1>
            <p className="mb-12 text-lg leading-relaxed text-foreground/80 md:text-xl">
              Be among the first to experience the future of Supply chains. Limited spots
              available for early adopters.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
                    placeholder="John Smith"
                  />
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
                  placeholder="ABC Distribution"
                  />
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">Type of Company</label>
                  <select
                    name="companyType"
                    required
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors focus:border-foreground"
                  >
                    <option value="">Select type</option>
                    <option value="Real Estate Developer">FMCG Distribution</option>
                    <option value="General Contractor">Automaobile Spare Parts Distriution</option>
                    <option value="Equipment Vendor">Pharmaceutical Distribution</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

               

                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="group">
                  <label className="mb-2 block text-sm font-medium text-foreground/70">
                    What challenges are you facing? (Optional)
                  </label>
                  <textarea
                    name="challenges"
                    rows={4}
                    className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
                    placeholder="Tell us about your supply chain challenges..."
                  />
                </div>
              </div>

              {error && <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500">{error}</div>}

              <div className="pt-6">
                <MagneticButton type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </MagneticButton>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-center duration-500">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
              <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-4 font-sans text-3xl font-light text-foreground md:text-5xl">
              Thank you for your interest
            </h2>
            <p className="text-lg text-foreground/80">
              We've received your application. Our team will reach out within 24 hours to discuss next steps.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
