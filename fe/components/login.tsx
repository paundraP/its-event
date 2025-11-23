"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password, role)
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const demoLogin = async (demoEmail: string, demoRole: "user" | "admin") => {
    setLoading(true)
    try {
      await login(demoEmail, "demo123", demoRole)
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Event Manager</CardTitle>
          <CardDescription>Sign in to manage or browse events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value as "user" | "admin")}
                  />
                  <span className="text-sm">User</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value as "user" | "admin")}
                  />
                  <span className="text-sm">Admin</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">Demo Accounts</p>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => demoLogin("user@example.com", "user")}
              disabled={loading}
            >
              Demo User
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => demoLogin("admin@example.com", "admin")}
              disabled={loading}
            >
              Demo Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
