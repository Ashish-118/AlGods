"use client"

import { useState } from "react"
import Link from "next/link"
import { DollarSign, Send, Calculator, Receipt, FileText, Home, Briefcase, GraduationCap, Heart, Leaf, PiggyBank, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import { FinanceSidebar } from "@/components/finance-sidebar"

export default function AdvicePage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      content:
        "Welcome to FinFlow! Ask me any questions about personal finance, investments, or financial planning.",
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: message }])

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responses = {
        retirement:
          "For retirement planning, I recommend starting with your employer's 401(k) match if available, then maxing out tax-advantaged accounts like IRAs. Aim to save 15% of your income for retirement.",
        debt: "To tackle debt effectively, consider the avalanche method (paying highest interest first) or the snowball method (paying smallest balances first). Always pay more than the minimum payment when possible.",
        investing:
          "For beginning investors, consider starting with low-cost index funds that provide broad market exposure. They're a simple way to diversify your investments.",
        budget:
          "Creating a budget starts with tracking your expenses for a month, categorizing them, and then setting realistic spending limits based on your income and financial goals.",
        default:
          "That's a great question about personal finance. I'd recommend speaking with one of our financial advisors for personalized advice tailored to your specific situation.",
      }

      // Simple keyword matching for demo purposes
      let responseContent = responses.default
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("retire") || lowerMessage.includes("401k")) {
        responseContent = responses.retirement
      } else if (
        lowerMessage.includes("debt") ||
        lowerMessage.includes("loan") ||
        lowerMessage.includes("credit card")
      ) {
        responseContent = responses.debt
      } else if (lowerMessage.includes("invest") || lowerMessage.includes("stock") || lowerMessage.includes("fund")) {
        responseContent = responses.investing
      } else if (lowerMessage.includes("budget") || lowerMessage.includes("spend") || lowerMessage.includes("save")) {
        responseContent = responses.budget
      }

      setChatHistory([...chatHistory, { role: "user", content: message }, { role: "system", content: responseContent }])
    }, 1000)

    setMessage("")
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <FinanceSidebar />
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/" className="lg:hidden">
            <DollarSign className="h-6 w-6" />
            <span className="sr-only">FinFlow</span>
          </Link>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Financial Advice</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue="chat" className="space-y-4">
            <TabsList>
              <TabsTrigger value="chat">Ask a Question</TabsTrigger>
              <TabsTrigger value="common">Common Questions</TabsTrigger>
              <TabsTrigger value="tax-advisor">Tax Advisor</TabsTrigger>
              <TabsTrigger value="advisor">Speak to an Advisor</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4">
              <Card className="flex flex-col h-[calc(100vh-12rem)]">
                <CardHeader>
                  <CardTitle>Financial Assistant</CardTitle>
                  <CardDescription>Ask any questions about personal finance</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            chat.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {chat.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="Type your financial question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="common" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Retirement Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How much should I save for retirement?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Aim to save 15-20% of your income for retirement. The exact amount depends on your age,
                          current savings, and retirement goals.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">When should I start saving for retirement?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          As early as possible. The power of compound interest means that starting in your 20s can
                          result in significantly more wealth than starting in your 30s or 40s.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">What retirement accounts should I use?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Start with employer-sponsored plans like 401(k)s, especially if they offer matching
                          contributions. Then consider IRAs (Traditional or Roth) for additional tax advantages.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How do I prioritize paying off debt?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Focus on high-interest debt first (usually credit cards), then move to lower-interest debt.
                          Always make minimum payments on all debts to avoid penalties.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">Should I pay off debt or invest?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          If your debt interest rate is higher than what you could reasonably earn from investments
                          (after taxes), prioritize paying off debt. Always contribute enough to get any employer 401(k)
                          match first.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How can I improve my credit score?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay bills on time, keep credit card balances low (below 30% of your limit), don't close old
                          accounts, and limit applications for new credit.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Investing Basics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How do I start investing with little money?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Many brokerages offer no-minimum index funds or ETFs. Consider using a robo-advisor or
                          micro-investing app to start with small amounts.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">What's the difference between stocks and bonds?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Stocks represent ownership in a company and tend to have higher potential returns but more
                          volatility. Bonds are loans to companies or governments and typically offer lower returns with
                          less risk.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How do I build a diversified portfolio?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Spread investments across different asset classes (stocks, bonds, real estate), industries,
                          and geographic regions to reduce risk. Index funds and ETFs offer instant diversification.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Budgeting & Saving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How do I create an effective budget?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Track your income and expenses for a month, categorize spending, set realistic limits for each
                          category, and review regularly. Consider the 50/30/20 rule: 50% for needs, 30% for wants, 20%
                          for savings.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How much should I have in an emergency fund?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Aim for 3-6 months of essential expenses in an easily accessible account. If your income is
                          variable or your job less secure, consider saving up to 12 months of expenses.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">How can I reduce my monthly expenses?</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Review subscriptions and cancel unused ones, negotiate bills (internet, phone, insurance),
                          meal plan to reduce food costs, and consider energy-efficient appliances to lower utility
                          bills.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tax-advisor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Saving Strategies</CardTitle>
                  <CardDescription>Effective methods to legally reduce your tax burden</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Tax-Advantaged Accounts</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">High Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Maximize contributions to 401(k)s and IRAs to reduce taxable income</li>
                          <li>Consider Roth options for tax-free growth and withdrawals in retirement</li>
                          <li>Use HSAs for triple tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses</li>
                          <li>Contribute to 529 plans for tax-free education savings</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Up to $5,000+ annually depending on tax bracket and contribution amounts</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Home className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Homeowner Deductions</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">High Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Deduct mortgage interest on loans up to $750,000</li>
                          <li>Property tax deductions up to $10,000 (combined with state taxes)</li>
                          <li>Home office deduction if you're self-employed</li>
                          <li>Energy-efficient home improvements may qualify for tax credits</li>
                          <li>Track home improvements to reduce capital gains when selling</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: $2,000-$10,000+ depending on property value and mortgage</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Business Deductions</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">High Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Deduct ordinary and necessary business expenses</li>
                          <li>Home office, vehicle, travel, and meal deductions</li>
                          <li>Self-employment health insurance deduction</li>
                          <li>Qualified business income deduction (Section 199A)</li>
                          <li>Retirement plan contributions for self-employed individuals</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Variable based on business income and expenses, often $5,000+</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Education Tax Benefits</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">Medium Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>American Opportunity Tax Credit: up to $2,500 per eligible student</li>
                          <li>Lifetime Learning Credit: up to $2,000 per tax return</li>
                          <li>Student loan interest deduction: up to $2,500</li>
                          <li>Tax-free scholarships and grants</li>
                          <li>Employer-provided educational assistance: up to $5,250 tax-free</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: $500-$2,500 depending on education expenses</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Charitable Giving</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">Medium Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Deduct cash donations up to 60% of AGI</li>
                          <li>Donate appreciated assets to avoid capital gains tax</li>
                          <li>Qualified charitable distributions from IRAs for those 70½+</li>
                          <li>Donor-advised funds for tax deductions now, charitable giving later</li>
                          <li>Bunching donations in alternate years to exceed standard deduction</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Depends on donation amount and tax bracket</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Tax-Loss Harvesting</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">Medium Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Offset capital gains with capital losses</li>
                          <li>Deduct up to $3,000 of net losses against ordinary income</li>
                          <li>Carry forward unused losses to future tax years</li>
                          <li>Avoid wash sale rules by waiting 30+ days to repurchase</li>
                          <li>Consider tax-efficient investment placement across accounts</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Up to $3,000 deduction annually plus capital gains tax savings</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Tax Credits</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">High Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Child Tax Credit: up to $2,000 per qualifying child</li>
                          <li>Child and Dependent Care Credit: up to $1,050 (one dependent) or $2,100 (two+)</li>
                          <li>Earned Income Tax Credit for lower-income workers</li>
                          <li>Saver's Credit: up to $1,000 for retirement contributions</li>
                          <li>Premium Tax Credit for health insurance purchased through marketplace</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Credits directly reduce tax bill, often $1,000-$5,000+</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Green Tax Incentives</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">Moderate Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Electric vehicle tax credits: up to $7,500</li>
                          <li>Residential energy credits for solar panels, heat pumps, etc.</li>
                          <li>Energy-efficient home improvement credits</li>
                          <li>Residential clean energy credit: up to 30% of cost</li>
                          <li>Energy-efficient commercial building deduction</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: $500-$7,500 depending on qualifying purchases</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 bg-gray-800 text-white shadow-md">
                      <CardHeader className="bg-gray-900 rounded-t-lg border-b border-gray-700">
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-5 w-5 text-blue-400" />
                          <CardTitle className="text-lg text-white">Retirement Tax Planning</CardTitle>
                        </div>
                        <Badge className="bg-blue-900 text-blue-100 hover:bg-blue-800">High Impact</Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2 list-disc pl-5 text-sm text-gray-200">
                          <li>Strategic Roth conversions during low-income years</li>
                          <li>Qualified charitable distributions from IRAs</li>
                          <li>Net unrealized appreciation for employer stock</li>
                          <li>Social Security taxation planning</li>
                          <li>Required minimum distribution planning</li>
                        </ul>
                        <p className="text-xs text-gray-300 mt-3">Potential savings: Significant long-term tax reduction, often $10,000+ over retirement</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Note: Tax laws change frequently. Consult a tax professional for personalized advice.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Download Tax Guide</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="advisor" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Consultation</CardTitle>
                  <CardDescription>Speak with a certified financial advisor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="topic" className="text-sm font-medium">
                          Consultation Topic
                        </label>
                        <select
                          id="topic"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a topic</option>
                          <option value="retirement">Retirement Planning</option>
                          <option value="investment">Investment Strategy</option>
                          <option value="tax">Tax Planning</option>
                          <option value="estate">Estate Planning</option>
                          <option value="debt">Debt Management</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Additional Information
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please provide any specific questions or concerns you'd like to discuss"
                      ></textarea>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Schedule Consultation</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Financial Advisors</CardTitle>
                  <CardDescription>Meet our team of certified professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <img
                          src="/placeholder.svg?height=96&width=96"
                          alt="Sarah Johnson"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">CFP®, Retirement Specialist</p>
                      <p className="mt-2 text-sm">
                        15+ years experience helping clients prepare for retirement and manage wealth.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <img
                          src="/placeholder.svg?height=96&width=96"
                          alt="Michael Chen"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium">Michael Chen</h3>
                      <p className="text-sm text-muted-foreground">CFA, Investment Strategist</p>
                      <p className="mt-2 text-sm">
                        Expert in portfolio construction and market analysis with a focus on long-term growth.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <img
                          src="/placeholder.svg?height=96&width=96"
                          alt="Jessica Rodriguez"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium">Jessica Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">EA, Tax Planning Specialist</p>
                      <p className="mt-2 text-sm">
                        Specializes in tax-efficient investing and strategies to minimize tax burden.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
