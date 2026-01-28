"use server"

interface PilotFormData {
  name: string
  email: string
  company: string
  companyType: string
  phone: string
  challenges?: string
}

export async function submitPilotForm(data: PilotFormData) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        name: data.name,
        email: data.email,
        company: data.company,
        company_type: data.companyType,
        phone: data.phone,
        challenges: data.challenges || "Not provided",
        subject: "New Pilot Program Application from Stoqr",
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true }
    } else {
      return { success: false, error: "Failed to submit application" }
    }
  } catch (error) {
    console.error("Pilot form submission error:", error)
    return { success: false, error: "Failed to submit application" }
  }
}
