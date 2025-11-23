"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import Login from "@/components/login"
import UserDashboard from "@/components/user-dashboard"
import AdminDashboard from "@/components/admin-dashboard"

export default function Home() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <main className="min-h-screen bg-background">
      {user.role === "admin" ? <AdminDashboard user={user} /> : <UserDashboard user={user} />}
    </main>
  )
}
