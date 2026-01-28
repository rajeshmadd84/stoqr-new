"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Clock, Zap } from "lucide-react"

const conversations = [
  {
    title: "Multi-Team Warehouse Coordination",
    messages: [
      { text: "Stock status for Item A23?", sender: "warehouse_manager", delay: 0 },
      
      {
        text: "1,240 units available. 320 units in Picking Zone B. Reorder suggested in 3 days",
        sender: "ai",
        delay: 2500,
      },
      {
        text: "Orders delayed today?",
        sender: "warehouse_manager",
        delay: 4000,
      },
      {
        text: "2 orders at risk due to aisle congestion. Pick paths optimized. No delay expected.",
        sender: "ai",
        delay: 5500,
      },
      {
        text: "Prepare dispatch for Order #4582",
        sender: "operations_manager",
        delay: 7000,
      },
      {
        text: "Picking tasks assigned. ETA is 42 minutes. Dock 3 reserved.",
        sender: "ai",
        delay: 8500,
      }
      
      
      
    ],
  },
  
  {
    title: "Inbound and Outbound Logistics",
    messages: [
      {
        text: "What is the status of the inbound delivery for Order from Supplier XYZ?",
        sender: "warehouse_manager",
        delay: 0,
      },
      {
        text: "Let me check and get back to you.",
        sender: "ai",
        delay: 1000,
      },
      
      {
        text: "Vehicle is in transit. ETA is 3 p.m. I will notify you when it arrives.",
        sender: "ai",
        delay: 3500,
      },
      {
        text: "Send me list of all products reaching reorder point.",
        sender: "operations_manager",
        delay: 5000,
      },
      {
        text: "Made list of all products reaching reorder point, Generated Draft PO for 10 products and sent to you for review.",
        sender: "ai",
        delay: 6000,
      },
      {
        text: "Check with suppliers for delivery lead time.",
        sender: "operations_manager",
        delay: 6000,
      },
      {
        text: "I will mail the suppliers for delivery lead time. Will get back to you once they respond.",
        sender: "operations_manager",
        delay: 6000,
      },
    ],
  },
]

export function AITeamSection() {
  const sectionRef = useRef<HTMLElement>(null) // Added section ref for intersection observer
  const [isVisible, setIsVisible] = useState(false)
  const [currentConversation, setCurrentConversation] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("[v0] AI Team Section is now visible")
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [displayedMessages, isTyping])

  useEffect(() => {
    const conversation = conversations[currentConversation]
    setDisplayedMessages([])
    setIsTyping(false)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        // Wait 3 seconds then move to next conversation
        timeoutRef.current = setTimeout(() => {
          setCurrentConversation((prev) => (prev + 1) % conversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      timeoutRef.current = setTimeout(() => {
        // Show typing indicator for AI messages
        if (message.sender === "ai") {
          setIsTyping(true)
          timeoutRef.current = setTimeout(() => {
            setDisplayedMessages((prev) => [...prev, message])
            setIsTyping(false)
            messageIndex++
            showNextMessage()
          }, 800) // Reduced typing delay from 1500ms to 800ms for faster replies
        } else {
          // For other participants, show message directly
          setDisplayedMessages((prev) => [...prev, message])
          messageIndex++
          showNextMessage()
        }
      }, message.delay)
    }

    showNextMessage()

    // Cleanup timeout on unmount or conversation change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentConversation])

  return (
    <section id="wms" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-b-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Warehousing Automation
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              See AI Run Your{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                Warehouse
              </span>
            </h2>

            <p
              className={`text-xl text-slate-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Watch how Stoqr’s AI coordinates inventory, picking, and dispatch through simple conversations - 24/7.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:h-[600px] space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">
                This is what your operations team sees
                </h3>

                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
                  <p>
                  While your team is busy on the floor, <strong>Stoqr AI is actively managing warehouse operations </strong> answering questions, triggering actions, and resolving issues in real time.
                  </p>

                  <p>
                  Every conversation you’re seeing could be happening during peak dispatch hours, night shifts, or stock audits.
                  </p>

                  <p className="text-lg lg:text-xl font-semibold text-slate-900">
                  Your competitors are still clicking through dashboards.
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-800 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="p-4 lg:p-6 bg-slate-50 rounded-xl border-l-4 border-slate-900">
                  <h4 className="text-slate-900 font-semibold text-base lg:text-lg mb-4">Key Advantages:</h4>
                  <ul className="space-y-3 text-slate-800 text-sm lg:text-base">
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>24/7 autonomous warehouse operations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Real-time inventory tracking and stock management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Proactive delay & risk detection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Optimized picking & putaway</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-900 mr-2">•</span>
                      <span>Learns with every operation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="max-w-md w-full">
                <div
                  className={`relative transition-all duration-1000 delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-slate-50 px-6 py-3 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                            <span className="font-medium text-slate-700">ACME Automobiles</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">24/7</span>
                          </div>
                        </div>

                        <div className="bg-slate-900 px-6 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <img
                              src="/images/aibot.jpg"
                              alt="Stoqr - AI Agent"
                              className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">Stoqr - AI Agent</h3>
                              <p className="text-xs text-slate-300">Ask me anything </p>
                            </div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              Online
                            </div>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef}
                          className="h-96 overflow-y-scroll scrollbar-hide p-4 space-y-3 bg-slate-50"
                          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                          {displayedMessages.map((message, index) => {
                            const isAI = message.sender === "ai"
                            const isCustomer = message.sender === "customer"
                            const isManager = message.sender === "warehouse_manager" || message.sender === "operations_manager"
                            const isStaff = message.sender === "warehouse_staff" || message.sender === "supplier"
                            
                            // Determine alignment and styling based on sender
                            const isRightAligned = isCustomer || isManager
                            const avatarColors: Record<string, string> = {
                              ai: "bg-blue-500",
                              customer: "bg-slate-400",
                              warehouse_manager: "bg-green-500",
                              operations_manager: "bg-teal-500",
                              warehouse_staff: "bg-purple-500",
                              supplier: "bg-orange-500",
                            }
                            const avatarInitials: Record<string, string> = {
                              ai: "AI",
                              customer: "C",
                              warehouse_manager: "WM",
                              operations_manager: "OM",
                              warehouse_staff: "WS",
                              supplier: "S",
                            }
                            const senderNames: Record<string, string> = {
                              ai: "AI Agent",
                              customer: "Customer",
                              warehouse_manager: "Warehouse Manager",
                              operations_manager: "Operations Manager",
                              warehouse_staff: "Warehouse Staff",
                              supplier: "Supplier",
                            }

                            return (
                            <div
                              key={index}
                                className={`flex ${isRightAligned ? "justify-end" : "justify-start"}`}
                              >
                                {!isRightAligned && (
                                  <div className={`w-6 h-6 rounded-full ${avatarColors[message.sender] || "bg-slate-400"} mr-2 mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium`}>
                                    {avatarInitials[message.sender] || "U"}
                                  </div>
                                )}
                                <div className="flex flex-col max-w-[80%]">
                                  {!isRightAligned && (
                                    <span className="text-xs text-slate-500 mb-1 ml-1">{senderNames[message.sender] || message.sender}</span>
                              )}
                              <div
                                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                                      isRightAligned
                                    ? "bg-slate-900 text-white rounded-br-md"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-md"
                                }`}
                              >
                                    {message.text.split("\n").map((line: string, i: number) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                                </div>
                                {isRightAligned && (
                                  <div className={`w-6 h-6 rounded-full ${avatarColors[message.sender] || "bg-slate-400"} ml-2 mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium`}>
                                    {avatarInitials[message.sender] || "U"}
                                </div>
                              )}
                            </div>
                            )
                          })}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex justify-start items-start">
                              <img
                                src="/images/michael-ai-agent.jpg"
                                alt="Michael"
                                className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                              />
                              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                            <span className="text-slate-500 text-sm lg:text-base flex-1">Stoqr AI is responding...</span>
                            <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                              <Zap className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
