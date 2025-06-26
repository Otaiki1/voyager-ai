"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  MapPin,
  DollarSign,
  Calendar,
  Plane,
  Hotel,
  Utensils,
  Camera,
  TrendingDown,
  Star,
  Zap,
  Lightbulb,
  Target,
  Globe,
  Share2,
  Bookmark,
  Bell,
} from "lucide-react"
import Image from "next/image"

export function AITripAdvisorScreen({ user, onNavigate }) {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hi! I'm your AI Travel Advisor. I can help you plan amazing trips, find the best deals, and discover hidden gems. What kind of adventure are you looking for?",
      timestamp: new Date(),
      suggestions: [
        "Plan a budget trip to Europe",
        "Find cheap flights to Tokyo",
        "Recommend hotels in Bali",
        "Best time to visit Thailand",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage) => {
    const responses = {
      budget: {
        content: "Great! I'd love to help you plan a budget-friendly trip. Here are some money-saving strategies:",
        recommendations: [
          {
            type: "route",
            title: "Cheapest Route to Europe",
            description: "Fly to Dublin or Madrid first, then use budget airlines like Ryanair for connections",
            savings: "$300-500",
            icon: <Plane className="w-5 h-5 text-blue-600" />,
          },
          {
            type: "accommodation",
            title: "Budget Accommodation",
            description: "Mix hostels in city centers with Airbnb in residential areas",
            savings: "$40-60/night",
            icon: <Hotel className="w-5 h-5 text-green-600" />,
          },
          {
            type: "timing",
            title: "Off-Season Travel",
            description: "Visit in shoulder seasons (April-May, September-October) for 40% savings",
            savings: "40% off peak prices",
            icon: <Calendar className="w-5 h-5 text-purple-600" />,
          },
        ],
      },
      tokyo: {
        content: "Tokyo is amazing! Here's how to get there affordably and what to expect:",
        recommendations: [
          {
            type: "flight",
            title: "Best Flight Deals",
            description: "Book 2-3 months ahead, fly Tuesday-Thursday, consider layovers in Seoul",
            savings: "$200-400",
            icon: <Plane className="w-5 h-5 text-blue-600" />,
          },
          {
            type: "area",
            title: "Affordable Neighborhoods",
            description: "Stay in Asakusa or Ueno - authentic, well-connected, and budget-friendly",
            savings: "$50-80/night",
            icon: <MapPin className="w-5 h-5 text-red-600" />,
          },
          {
            type: "food",
            title: "Local Food Tips",
            description: "Eat at convenience stores, try standing bars, and look for lunch sets",
            savings: "$20-30/day",
            icon: <Utensils className="w-5 h-5 text-orange-600" />,
          },
        ],
      },
      default: {
        content: "I can help you with that! Here are some personalized recommendations based on your travel history:",
        recommendations: [
          {
            type: "destination",
            title: "Perfect Match: Vietnam",
            description: "Based on your love for culture and budget travel, Vietnam offers incredible value",
            savings: "70% less than Japan",
            icon: <Globe className="w-5 h-5 text-green-600" />,
          },
          {
            type: "timing",
            title: "Optimal Travel Window",
            description: "March-April offers perfect weather and pre-peak season pricing",
            savings: "30% off peak rates",
            icon: <Calendar className="w-5 h-5 text-blue-600" />,
          },
        ],
      },
    }

    const messageKey = userMessage.toLowerCase().includes("budget")
      ? "budget"
      : userMessage.toLowerCase().includes("tokyo")
        ? "tokyo"
        : "default"

    return {
      id: Date.now(),
      type: "ai",
      content: responses[messageKey].content,
      timestamp: new Date(),
      recommendations: responses[messageKey].recommendations,
      suggestions: ["Tell me more about this", "Show me alternatives", "Help me book this", "Save this recommendation"],
    }
  }

  const quickPrompts = [
    { text: "Plan a 2-week Europe trip under $2000", icon: <MapPin className="w-4 h-4" /> },
    { text: "Find the cheapest way to get to Bali", icon: <Plane className="w-4 h-4" /> },
    { text: "Best neighborhoods to stay in Paris", icon: <Hotel className="w-4 h-4" /> },
    { text: "When is the cheapest time to visit Japan?", icon: <Calendar className="w-4 h-4" /> },
    { text: "Hidden gems in Southeast Asia", icon: <Camera className="w-4 h-4" /> },
    { text: "Budget food guide for Italy", icon: <Utensils className="w-4 h-4" /> },
  ]

  const trendingDestinations = [
    {
      name: "Vietnam",
      reason: "70% cheaper than Thailand",
      avgCost: "$30/day",
      bestTime: "Mar-Apr",
      image: "/placeholder.svg?height=100&width=150&text=Vietnam",
      aiTip: "Street food costs $1-2, motorbike rentals $5/day",
    },
    {
      name: "Portugal",
      reason: "Europe's best value",
      avgCost: "$50/day",
      bestTime: "May-Jun",
      image: "/placeholder.svg?height=100&width=150&text=Portugal",
      aiTip: "Stay in Porto, visit Lisbon as day trip",
    },
    {
      name: "Mexico City",
      reason: "Cultural hub, low cost",
      avgCost: "$35/day",
      bestTime: "Oct-Dec",
      image: "/placeholder.svg?height=100&width=150&text=Mexico+City",
      aiTip: "Use metro system, eat at local markets",
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">AI Trip Advisor</h1>
            <p className="text-gray-600">Get personalized travel recommendations and money-saving tips</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "chat" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2 inline" />
            AI Chat
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "recommendations" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Lightbulb className="w-4 h-4 mr-2 inline" />
            Smart Recommendations
          </button>
          <button
            onClick={() => setActiveTab("deals")}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "deals" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <TrendingDown className="w-4 h-4 mr-2 inline" />
            Best Deals
          </button>
        </div>
      </div>

      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col border-0 shadow-sm">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user" ? "bg-rose-500" : "bg-gradient-to-r from-blue-500 to-purple-600"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}>
                          <div
                            className={`inline-block p-4 rounded-2xl ${
                              message.type === "user" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>

                          {/* AI Recommendations */}
                          {message.recommendations && (
                            <div className="mt-4 space-y-3">
                              {message.recommendations.map((rec, index) => (
                                <Card key={index} className="p-4 border-0 shadow-sm bg-white">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                      {rec.icon}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                                      <div className="flex items-center justify-between">
                                        <Badge className="bg-green-100 text-green-800">Save {rec.savings}</Badge>
                                        <div className="flex space-x-2">
                                          <Button size="sm" variant="outline">
                                            <Bookmark className="w-3 h-3 mr-1" />
                                            Save
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            <Share2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          )}

                          {/* Quick Suggestions */}
                          {message.suggestions && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSendMessage(suggestion)}
                                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}

                          <p className="text-xs text-gray-500 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex space-x-3 max-w-3xl">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about travel..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Prompts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
            <div className="space-y-3">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">{prompt.icon}</div>
                    <span className="text-sm text-gray-700">{prompt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-8">
          {/* Trending Destinations */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI-Curated Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingDestinations.map((dest, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-32">
                    <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Best Value
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{dest.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{dest.reason}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Daily budget:</span>
                        <span className="font-medium text-gray-900">{dest.avgCost}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Best time:</span>
                        <span className="font-medium text-gray-900">{dest.bestTime}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p className="text-sm text-blue-800">{dest.aiTip}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                      Plan Trip to {dest.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Personalized Insights */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personalized for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Your Travel Style</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Budget-conscious</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Culture seeker</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Adventure lover</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Based on your travel history, you prefer cultural experiences with great value for money.
                </p>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Money-Saving Tips</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Book flights 6-8 weeks in advance for 20% savings</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Travel Tuesday-Thursday for cheaper accommodation</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Use local transport apps instead of taxis</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">Eat where locals eat for authentic, cheap meals</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "deals" && <DealsScreen user={user} />}
    </div>
  )
}

function DealsScreen({ user }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Deals", icon: <Globe className="w-4 h-4" /> },
    { id: "flights", label: "Flights", icon: <Plane className="w-4 h-4" /> },
    { id: "hotels", label: "Hotels", icon: <Hotel className="w-4 h-4" /> },
    { id: "packages", label: "Packages", icon: <Star className="w-4 h-4" /> },
  ]

  const deals = [
    {
      id: 1,
      type: "flight",
      title: "San Francisco → Tokyo",
      description: "Round-trip flights with JAL",
      originalPrice: 1200,
      salePrice: 850,
      savings: 350,
      validUntil: "Dec 31, 2024",
      image: "/placeholder.svg?height=100&width=150&text=Tokyo+Flight",
      aiInsight: "Best price in 6 months. Book now for cherry blossom season!",
      tags: ["Limited Time", "Best Price"],
    },
    {
      id: 2,
      type: "hotel",
      title: "Luxury Resort in Bali",
      description: "5-star beachfront resort with breakfast",
      originalPrice: 300,
      salePrice: 180,
      savings: 120,
      validUntil: "Jan 15, 2025",
      image: "/placeholder.svg?height=100&width=150&text=Bali+Resort",
      aiInsight: "40% off during low season. Perfect weather guaranteed!",
      tags: ["Flash Sale", "5-Star"],
    },
    {
      id: 3,
      type: "package",
      title: "Europe Rail Pass + Hotels",
      description: "14-day Eurail pass + accommodation",
      originalPrice: 2500,
      salePrice: 1800,
      savings: 700,
      validUntil: "Nov 30, 2024",
      image: "/placeholder.svg?height=100&width=150&text=Europe+Train",
      aiInsight: "Covers 8 countries. Cheaper than individual bookings by $700!",
      tags: ["Bundle Deal", "Multi-Country"],
    },
    {
      id: 4,
      type: "flight",
      title: "Los Angeles → Barcelona",
      description: "Direct flights with premium economy",
      originalPrice: 900,
      salePrice: 650,
      savings: 250,
      validUntil: "Dec 15, 2024",
      image: "/placeholder.svg?height=100&width=150&text=Barcelona+Flight",
      aiInsight: "Rare direct route deal. Usually requires 1-2 stops.",
      tags: ["Direct Flight", "Premium"],
    },
  ]

  const filteredDeals =
    selectedCategory === "all"
      ? deals
      : deals.filter(
          (deal) => deal.type === selectedCategory || (selectedCategory === "packages" && deal.type === "package"),
        )

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-rose-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.icon}
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="w-32 h-32 relative">
                <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500 text-white text-xs">Save ${deal.savings}</Badge>
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{deal.title}</h3>
                    <p className="text-sm text-gray-600">{deal.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${deal.salePrice}</p>
                    <p className="text-sm text-gray-500 line-through">${deal.originalPrice}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {deal.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-2 mb-3">
                  <div className="flex items-start space-x-2">
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-800">{deal.aiInsight}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Valid until {deal.validUntil}</p>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Deal Alert */}
      <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">AI Deal Alerts</h3>
            <p className="text-gray-600 mb-3">
              Get notified when prices drop for your dream destinations. Our AI monitors millions of deals 24/7.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Bell className="w-4 h-4 mr-2" />
              Set Up Alerts
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function AIChatModal({ isOpen, onClose, context, user }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (context) {
      const contextMessage = {
        id: 1,
        type: "ai",
        content: `I can help you with ${context.type}. What would you like to know?`,
        timestamp: new Date(),
      }
      setMessages([contextMessage])
    }
  }, [context])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "I'd be happy to help you with that! Let me provide some personalized recommendations based on your preferences.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>AI Travel Assistant</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-96">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
