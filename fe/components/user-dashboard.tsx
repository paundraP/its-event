"use client"

import { useState, useMemo } from "react"
import type { User } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventCard from "@/components/event-card"
import { mockEvents } from "@/lib/mock-events"

interface UserDashboardProps {
  user: User
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [logoutClick, setLogoutClick] = useState(false)

  const now = new Date()

  const { upcoming, ongoing, past } = useMemo(() => {
    return {
      upcoming: mockEvents.filter((event) => new Date(event.startDate) > now),
      ongoing: mockEvents.filter((event) => new Date(event.startDate) <= now && new Date(event.endDate) >= now),
      past: mockEvents.filter((event) => new Date(event.endDate) < now),
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setLogoutClick(true)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Event Browser</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name}!</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing ({ongoing.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.length > 0 ? (
                upcoming.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="col-span-full rounded-lg border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No upcoming events at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ongoing.length > 0 ? (
                ongoing.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="col-span-full rounded-lg border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No ongoing events right now.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {past.length > 0 ? (
                past.map((event) => <EventCard key={event.id} event={event} />)
              ) : (
                <div className="col-span-full rounded-lg border border-border bg-card p-8 text-center">
                  <p className="text-muted-foreground">No past events to display.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
