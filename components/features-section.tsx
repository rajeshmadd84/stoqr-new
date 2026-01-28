"use client"

import { useEffect, useRef, useState } from "react"

const AnimatedChatDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true, visible: false },
    { text: "I'd like to book an appointment", isBot: false, visible: false },
    { text: "Perfect! I can help with that. What service are you interested in?", isBot: true, visible: false },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const scenarios = [
      [
        { text: "Product ID 1234567890 is out of stock. Should i raise PO for this product?", isBot: true },
        { text: "Yes. Also confirm with supplier if they can deliver in 2 days.", isBot: false },
        { text: "Perfect! I can help do that. Let me check the status of other products from the supplier that are covered in 2 days.", isBot: true },
        { text: "I've checked with the supplier. They have the product in stock and can deliver in 2 days. Should I proceed with raising the PO?", isBot: true },
        { text: "I have now made a PO togeher with Product ID 1234567891 and 1234567892. Can you please confirm the delivery date?", isBot: true },
      ],
      
     
    ]

    const currentScenario = scenarios[cycleCount % scenarios.length]
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })))
    setTypingDots(0)

    let timeoutIds: NodeJS.Timeout[] = []
    let currentIndex = 0

    const showNextMessage = () => {
      if (currentIndex >= currentScenario.length) {
        // All messages shown, wait then cycle
        const cycleTimeout = setTimeout(() => {
          setCycleCount((prev) => prev + 1)
        }, 3000)
        timeoutIds.push(cycleTimeout)
        return
      }

      const message = currentScenario[currentIndex]
      const isFirstMessage = currentIndex === 0

      if (isFirstMessage) {
        // Show first message immediately
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
        currentIndex++
        
        const nextTimeout = setTimeout(() => {
          showNextMessage()
        }, 800)
        timeoutIds.push(nextTimeout)
      } else {
        // Show typing indicator before every message (except first)
          const typingInterval = setInterval(() => {
            setTypingDots((prev) => (prev + 1) % 4)
          }, 500)

        // Hide typing and show message after delay
        const typingTimeout = setTimeout(() => {
            clearInterval(typingInterval)
          setTypingDots(0)
          setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
          currentIndex++
          
          // Show next message after a delay
          const nextTimeout = setTimeout(() => {
            showNextMessage()
          }, 500)
          timeoutIds.push(nextTimeout)
        }, 1500 + Math.random() * 500) // 1.5-2 seconds typing delay
        
        timeoutIds.push(typingTimeout)
      }
    }

    // Start showing messages after initial delay
    const startTimeout = setTimeout(() => {
      showNextMessage()
    }, 500)
    timeoutIds.push(startTimeout)

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded p-4 h-[400px] overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500 font-medium">24/7</span>
      </div>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"} transition-all duration-500 ${
              msg.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-1.5 rounded-sm text-sm ${
                msg.isBot ? "bg-slate-200 text-slate-700" : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="bg-slate-200 px-3 py-1.5 rounded-full">
              <div className="flex space-x-1">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`w-1 h-1 bg-slate-500 rounded-full transition-opacity duration-300 ${
                      typingDots >= dot ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



const AnimatedLeadsDemo = ({ isActive }: { isActive: boolean }) => {
  const [leads, setLeads] = useState([
    { name: "Sarah M.", score: 0, qualified: false },
    { name: "John D.", score: 0, qualified: false },
    { name: "Mike R.", score: 0, qualified: false },
  ])

  useEffect(() => {
    if (!isActive) return

    leads.forEach((_, index) => {
      setTimeout(() => {
        const targetScore = [85, 92, 78][index]
        const interval = setInterval(() => {
          setLeads((prev) =>
            prev.map((lead, i) => {
              if (i === index && lead.score < targetScore) {
                const newScore = Math.min(lead.score + 5, targetScore)
                return {
                  ...lead,
                  score: newScore,
                  qualified: newScore >= 80,
                }
              }
              return lead
            }),
          )
        }, 50)

        setTimeout(() => clearInterval(interval), 1000)
      }, index * 600)
    })
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-[230px] overflow-hidden">
      <div className="space-y-2">
        {leads.map((lead, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-slate-700 w-12">{lead.name}</span>
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  lead.qualified ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${lead.score}%` }}
              />
            </div>
            <span className="text-xs font-medium w-8">{lead.score}%</span>
            {lead.qualified && <span className="text-xs text-green-600">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const ContentSection = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 h-[276px] flex flex-col justify-center items-center text-center border-2 border-slate-200">
      <div className="space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const AnimatedIntegrationsDemo = ({ isActive }: { isActive: boolean }) => {
  const [connections, setConnections] = useState([
    { name: "CRM", connected: false },
    { name: "WhatsApp", connected: false },
    { name: "Calendar", connected: false },
    { name: "Email", connected: false },
  ])

  useEffect(() => {
    if (!isActive) return

    connections.forEach((_, index) => {
      setTimeout(
        () => {
          setConnections((prev) => prev.map((conn, i) => (i === index ? { ...conn, connected: true } : conn)))
        },
        500 + index * 400,
      )
    })
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-[230px]">
      <div className="grid grid-cols-2 gap-2">
        {connections.map((conn, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              conn.connected ? "bg-green-100" : "bg-white"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                conn.connected ? "bg-green-500" : "bg-slate-300"
              }`}
            />
            <span className="text-xs text-slate-700">{conn.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-slate-500">{connections.filter((c) => c.connected).length}/4 connected</div>
      </div>
    </div>
  )
}

// Procurement-specific demo component
const AnimatedProcurementDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Product ID 1234567890 is out of stock. Should i raise PO for this product?", isBot: true, visible: false },
    { text: "Yes. Also confirm with supplier if they can deliver in 2 days.", isBot: false, visible: false },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const scenarios = [
      [
        { text: "Product ID 1234567890 is out of stock. Should i raise PO for this product?", isBot: true },
        { text: "Yes. Also confirm with supplier if they can deliver in 2 days.", isBot: false },
        { text: "Perfect! I can help do that. Let me check the status of other products from the supplier that are covered in 2 days.", isBot: true },
        { text: "I've checked with the supplier. They have the product in stock and can deliver in 2 days. Should I proceed with raising the PO?", isBot: true },
        { text: "PO has been raised successfully. Order confirmation sent to supplier. Expected delivery: 2 days.", isBot: true },
      ],
    ]

    const currentScenario = scenarios[cycleCount % scenarios.length]
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })))
    setTypingDots(0)

    let timeoutIds: NodeJS.Timeout[] = []
    let currentIndex = 0

    const showNextMessage = () => {
      if (currentIndex >= currentScenario.length) {
        const cycleTimeout = setTimeout(() => {
          setCycleCount((prev) => prev + 1)
        }, 3000)
        timeoutIds.push(cycleTimeout)
        return
      }

      const message = currentScenario[currentIndex]
      const isFirstMessage = currentIndex === 0

      if (isFirstMessage) {
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
        currentIndex++
        
        const nextTimeout = setTimeout(() => {
          showNextMessage()
        }, 800)
        timeoutIds.push(nextTimeout)
      } else {
        const typingInterval = setInterval(() => {
          setTypingDots((prev) => (prev + 1) % 4)
        }, 500)

        const typingTimeout = setTimeout(() => {
          clearInterval(typingInterval)
          setTypingDots(0)
          setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
          currentIndex++
          
          const nextTimeout = setTimeout(() => {
            showNextMessage()
          }, 500)
          timeoutIds.push(nextTimeout)
        }, 1500 + Math.random() * 500)
        
        timeoutIds.push(typingTimeout)
      }
    }

    const startTimeout = setTimeout(() => {
      showNextMessage()
    }, 500)
    timeoutIds.push(startTimeout)

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded p-4 h-[400px] overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500" suppressHydrationWarning>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex flex-col gap-3 mt-8 h-full overflow-y-auto pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} transition-opacity duration-300 ${msg.visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${msg.isBot ? 'bg-white text-slate-800' : 'bg-blue-500 text-white'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3">
              <div className="flex gap-1">
                {[...Array(typingDots)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-slate-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Sales Order-specific demo component
const AnimatedSalesOrderDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "New sales order received from Customer ABC. Order #SO-12345", isBot: true, visible: false },
    { text: "Please validate and confirm delivery timeline.", isBot: false, visible: false },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const scenarios = [
      [
        { text: "New sales order received from Customer ABC. Order #SO-12345", isBot: true },
        { text: "Please validate and confirm delivery timeline.", isBot: false },
        { text: "Validating order... Checking stock availability and credit limits.", isBot: true },
        { text: "Order validated! All items in stock. Credit limit approved. Estimated delivery: 3 business days. Should I confirm with customer?", isBot: true },
        { text: "Yes, confirm and allocate to Warehouse A.", isBot: false },
        { text: "Order confirmed! Allocation done. Dispatch scheduled. Customer notified. Order #SO-12345 is ready for fulfillment.", isBot: true },
      ],
    ]

    const currentScenario = scenarios[cycleCount % scenarios.length]
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })))
    setTypingDots(0)

    let timeoutIds: NodeJS.Timeout[] = []
    let currentIndex = 0

    const showNextMessage = () => {
      if (currentIndex >= currentScenario.length) {
        const cycleTimeout = setTimeout(() => {
          setCycleCount((prev) => prev + 1)
        }, 3000)
        timeoutIds.push(cycleTimeout)
        return
      }

      const message = currentScenario[currentIndex]
      const isFirstMessage = currentIndex === 0

      if (isFirstMessage) {
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
        currentIndex++
        
        const nextTimeout = setTimeout(() => {
          showNextMessage()
        }, 800)
        timeoutIds.push(nextTimeout)
      } else {
        const typingInterval = setInterval(() => {
          setTypingDots((prev) => (prev + 1) % 4)
        }, 500)

        const typingTimeout = setTimeout(() => {
          clearInterval(typingInterval)
          setTypingDots(0)
          setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= currentIndex })))
          currentIndex++
          
          const nextTimeout = setTimeout(() => {
            showNextMessage()
          }, 500)
          timeoutIds.push(nextTimeout)
        }, 1500 + Math.random() * 500)
        
        timeoutIds.push(typingTimeout)
      }
    }

    const startTimeout = setTimeout(() => {
      showNextMessage()
    }, 500)
    timeoutIds.push(startTimeout)

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded p-4 h-[400px] overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500" suppressHydrationWarning>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex flex-col gap-3 mt-8 h-full overflow-y-auto pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} transition-opacity duration-300 ${msg.visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${msg.isBot ? 'bg-white text-slate-800' : 'bg-blue-500 text-white'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3">
              <div className="flex gap-1">
                {[...Array(typingDots)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-slate-400 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const procurementFeatures = [
  {
    title: "Stoqr AI Agent",
    demo: AnimatedProcurementDemo,
    size: "large",
  },
]

const salesOrderFeatures = [
  {
    title: "Stoqr AI Agent",
    demo: AnimatedSalesOrderDemo,
    size: "large",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("[v0] Features Section is now visible") // Added debug log
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="erp" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-t-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-200 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-base font-medium mb-6">
              <svg className="w-4 h-4 mr-2 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H1V9H3V15H1V17H3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V17H23V15H21V9H23ZM19 9V15H5V9H19ZM7.5 11.5C7.5 10.67 8.17 10 9 10S10.5 10.67 10.5 11.5 9.83 13 9 13 7.5 12.33 7.5 11.5ZM13.5 11.5C13.5 10.67 14.17 10 15 10S16.5 10.67 16.5 11.5 15.83 13 15 13 13.5 12.33 13.5 11.5ZM12 16C13.11 16 14.08 16.59 14.71 17.5H9.29C9.92 16.59 10.89 16 12 16Z" />
              </svg>
              AI Working 24/7 - Never Miss a data point.
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance mb-4 sm:mb-6">
            Your ERP Runs Itself
              
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            Watch Stoqr AI manage procurement and sales orders end-to-end predicting demand, auto-creating orders, validating availability, and coordinating fulfillment in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left side - Features */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {procurementFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group transition-all duration-1000"
                  style={{
                    transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                  }}
                  onMouseEnter={() => setActiveDemo(index)}
                  onMouseLeave={() => setActiveDemo(null)}
                >
                  <div className="bg-white rounded-lg p-6 sm:p-8 min-h-[500px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300">
                    <div className="mb-6">
                      <feature.demo isActive={activeDemo === index || isVisible} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                      {feature.title}
                    </h3>

                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Content */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="min-h-[500px] flex flex-col justify-center space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">
                   Procurement Automation
                  </h3>

                  <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
                    <p>
                    <strong>Stoqr AI</strong> automates the entire purchase order lifecycle without manual follow-ups or spreadsheets. It continuously monitors inventory levels, demand patterns, lead times, and supplier performance to <strong>predict purchase needs before shortages occur</strong>.
                    </p>

                    <p>
                    When thresholds are reached, <strong>Stoqr auto-generates purchase orders</strong>, recommends optimal quantities and pricing, and routes approvals automatically. It tracks confirmations, delivery timelines, and exceptions in real time flagging risks early and adjusting plans proactively.
                    </p>

                  </div>
                </div>
                
                <div className="p-4 lg:p-6 bg-slate-50 rounded-xl border-l-4 border-slate-900">
                  <h4 className="text-slate-900 font-semibold text-base lg:text-lg mb-4">Key Advantages:</h4>
                  <ul className="space-y-3 text-slate-800 text-sm lg:text-base">
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Predicts purchase needs before stockouts occur.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Reduces manual follow-ups and approvals.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Prevents overbuying and excess inventory.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Tracks confirmations, deliveries, and exceptions in real time.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Learns and improves with every order placed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Replicated Section */}
          <div className="mt-16 lg:mt-24 pt-16 lg:pt-24 border-t border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left side - Content */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="h-full flex flex-col justify-center space-y-6 lg:space-y-8">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">
                     Sales order Automation
                    </h3>

                    <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
                      <p>
                      <strong>Stoqr AI </strong>automates sales order processing from intake to fulfillment. It intelligently captures orders from multiple channels, validates pricing, credit limits, and stock availability, and confirms delivery timelines instantly.
                      </p>

                      <p>
                      Orders are automatically prioritized, allocated to the right warehouse, and synced with dispatch and invoicing without manual intervention. Stoqr predicts fulfillment risks in advance and proactively adjusts allocations or schedules to ensure on-time delivery.
                      </p>

                    </div>
                  </div>
                  
                  <div className="p-4 lg:p-6 bg-slate-50 rounded-xl border-l-4 border-slate-900">
                    <h4 className="text-slate-900 font-semibold text-base lg:text-lg mb-4">Key Advantages:</h4>
                    <ul className="space-y-3 text-slate-800 text-sm lg:text-base">
                      <li className="flex items-start">
                        <span className="text-slate-900 mr-2">•</span>
                        <span>Faster sales order processing from intake to fulfillment.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-slate-900 mr-2">•</span>
                        <span>Instant validation of pricing, credit limits, and stock.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-slate-900 mr-2">•</span>
                        <span>Seamless sync with warehouse, dispatch, and invoicing.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-slate-900 mr-2">•</span>
                        <span>Fewer order errors and manual interventions.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-slate-900 mr-2">•</span>
                        <span>Better customer experience and predictable revenue.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right side - Features */}
              <div
                className={`transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
            {salesOrderFeatures.map((feature, index) => (
              <div
                key={index}
                    className="group transition-all duration-1000"
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300">
                  <div className="mb-6">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                </div>
              </div>
            ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
