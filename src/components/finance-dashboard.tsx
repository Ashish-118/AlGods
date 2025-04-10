"use client"

import { CreditCard, DollarSign, ShoppingCart } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FinanceDashboard() {
  // Sample data for Income vs Expenses chart
  const incomeExpensesData = [
    { month: "Apr", income: 4200, expenses: 2400 },
    { month: "May", income: 3800, expenses: 2100 },
    { month: "Jun", income: 4000, expenses: 2800 },
    { month: "Jul", income: 4300, expenses: 2300 },
    { month: "Aug", income: 3900, expenses: 2500 },
    { month: "Sep", income: 4100, expenses: 2700 },
    { month: "Oct", income: 4500, expenses: 2600 },
    { month: "Nov", income: 4800, expenses: 2900 },
    { month: "Dec", income: 5200, expenses: 3100 },
    { month: "Jan", income: 4600, expenses: 2800 },
    { month: "Feb", income: 4700, expenses: 2500 },
    { month: "Mar", income: 4550, expenses: 2345 },
  ]

  // Sample data for Expense Breakdown chart
  const expenseBreakdownData = [
    { name: "Housing", value: 1200, color: "#0ea5e9" },
    { name: "Food", value: 400, color: "#10b981" },
    { name: "Transport", value: 350, color: "#6366f1" },
    { name: "Utilities", value: 150, color: "#f59e0b" },
    { name: "Entertainment", value: 120, color: "#ec4899" },
    { name: "Other", value: 125, color: "#8b5cf6" },
  ]

  // Sample data for Savings Growth chart
  const savingsGrowthData = [
    { month: "Jan", savings: 1500 },
    { month: "Feb", savings: 1700 },
    { month: "Mar", savings: 2205 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <CardDescription>Monthly comparison for the past year</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeExpensesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>By category for current month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {expenseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Savings Growth</CardTitle>
          <CardDescription>Year-to-date progress</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="savings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Grocery Store</p>
                <p className="text-xs text-muted-foreground">Mar 28, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$85.40</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Salary Deposit</p>
                <p className="text-xs text-muted-foreground">Mar 25, 2025</p>
              </div>
              <div className="ml-auto font-medium text-green-500">+$3,500.00</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Restaurant</p>
                <p className="text-xs text-muted-foreground">Mar 24, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$64.20</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Online Shopping</p>
                <p className="text-xs text-muted-foreground">Mar 22, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$124.99</div>
            </div>
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Utility Bill</p>
                <p className="text-xs text-muted-foreground">Mar 20, 2025</p>
              </div>
              <div className="ml-auto font-medium text-red-500">-$142.50</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
