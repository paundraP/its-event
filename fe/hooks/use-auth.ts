"use client"

import { useState, useEffect, useCallback } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, role: "user" | "admin") => Promise<void>
  logout: () => void
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string, role: "user" | "admin") => {
    // Simulate API call
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
    }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  return { user, loading, login, logout }
}

export { useAuth }
