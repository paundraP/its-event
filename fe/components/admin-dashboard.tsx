"use client"

import { useState } from "react"
import type { User } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventTable from "@/components/event-table"
import EventForm from "@/components/event-form"
import { mockEvents } from "@/lib/mock-events"
import type { Event } from "@/lib/mock-events"

interface AdminDashboardProps {
  user: User
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleAddEvent = (event: Event) => {
    setEvents([...events, event])
    setShowForm(false)
  }

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId))
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage all events - {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Events ({events.length})</TabsTrigger>
            <TabsTrigger value="add">Add New Event</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="mt-6">
            <EventTable
              events={events}
              onEdit={(event) => {
                setEditingEvent(event)
              }}
              onDelete={handleDeleteEvent}
            />
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <EventForm
              onSubmit={handleAddEvent}
              onCancel={() => setShowForm(false)}
              initialEvent={editingEvent || undefined}
            />
          </TabsContent>
        </Tabs>

        {editingEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-card">
              <div className="border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold">Edit Event</h2>
              </div>
              <div className="p-6">
                <EventForm
                  onSubmit={(event) => {
                    handleUpdateEvent(event)
                  }}
                  onCancel={() => setEditingEvent(null)}
                  initialEvent={editingEvent}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
