"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Crown, Rocket } from "lucide-react"

interface PricingSectionProps {
  onSignupClick: () => void
}

export default function PricingSection({ onSignupClick }: PricingSectionProps) {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "Free",
      period: "forever",
      description: "Perfect for getting started with AI-powered execution",
      features: [
        "Basic Focus Page",
        "5 AI agent interactions/day",
        "Weekly founder rituals",
        "Basic task management",
        "Community support",
      ],
      cta: "Get Started Free",
      popular: false,
      gradient: "from-[#10b981] to-[#059669]",
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$29",
      period: "/month",
      description: "For serious founders ready to scale their execution",
      features: [
        "Advanced Focus Page with AI insights",
        "Unlimited AI agent interactions",
        "Custom agent marketplace",
        "Advanced analytics & reporting",
        "Priority support",
        "Team collaboration (up to 3 members)",
        "Custom integrations",
      ],
      cta: "Start Pro Trial",
      popular: true,
      gradient: "from-[#7f5af0] to-[#a855f7]",
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations scaling with AI",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Custom AI agent development",
        "Advanced security & compliance",
        "Dedicated success manager",
        "Custom integrations & API access",
        "White-label options",
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-[#facc15] to-[#f59e0b]",
    },
  ]

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] bg-clip-text text-transparent">
              Execution Level
            </span>
          </h2>
          <p className="text-xl text-[#9ca3af] max-w-3xl mx-auto">
            Start free and scale as you grow. Every plan includes Toro AI and core execution tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-[#7f5af0] scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#7f5af0] to-[#10b981] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  <CardTitle className="text-2xl font-bold text-[#e6ebf4] mb-2">{plan.name}</CardTitle>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#e6ebf4]">{plan.price}</span>
                    <span className="text-[#9ca3af] ml-1">{plan.period}</span>
                  </div>

                  <p className="text-[#9ca3af] text-sm leading-relaxed">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#10b981] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-[#9ca3af] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onSignupClick}
                    className={`w-full font-medium ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#7f5af0] to-[#10b981] hover:from-[#7f5af0]/80 hover:to-[#10b981]/80 text-white"
                        : "bg-white/10 hover:bg-white/20 text-[#e6ebf4] border border-white/20"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#9ca3af] mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <p className="text-sm text-[#9ca3af]">
            Questions about pricing?{" "}
            <a href="#" className="text-[#7f5af0] hover:text-[#7f5af0]/80">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
