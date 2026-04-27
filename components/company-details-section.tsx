"use client"

export function CompanyDetailsSection() {
  return (
    <section id="company-details" className="px-4 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/15 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/12%),theme(backgroundColor.white/4%))] backdrop-blur-sm p-6 md:p-10">
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-white">Company Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-sm uppercase tracking-wider text-white/60 mb-3">India</p>
            <p className="text-white font-medium mb-2">Fraakt India Pvt. Ltd.</p>
            <p className="text-sm text-gray-300 leading-relaxed">
            A102, Bhavya Serene Apt, Kasavanahalli

              <br />
              560035, Bangalore 
              Karnataka, India
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-sm uppercase tracking-wider text-white/60 mb-3">Singapore</p>
            <p className="text-white font-medium mb-2">C/O Rio Logistics Pte Ltd</p>
            <p className="text-sm text-gray-300 leading-relaxed">
            21 Pandan Avenue #04-A Senkee Logistics Hub,
              <br />
              609388, Singapore
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
