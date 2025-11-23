"use client"

import type React from "react"

import { useState } from "react"
import type { Event } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EventFormProps {
  onSubmit: (event: Event) => void
  onCancel: () => void
  initialEvent?: Event
}

export default function EventForm({ onSubmit, onCancel, initialEvent }: EventFormProps) {
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: initialEvent?.title || "",
    description: initialEvent?.description || "",
    location: initialEvent?.location || "",
    startDate: initialEvent?.startDate || "",
    endDate: initialEvent?.endDate || "",
    attendees: initialEvent?.attendees || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const event: Event = {
      id: initialEvent?.id || `event-${Date.now()}`,
      ...formData,
    }
    onSubmit(event)
    if (!initialEvent) {
      setFormData({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        attendees: 0,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendees" ? Number.parseInt(value) || 0 : value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialEvent ? "Update Event" : "Create New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title *</label>
              <Input
                type="text"
                name="title"
                placeholder="Event title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input
                type="text"
                name="location"
                placeholder="Event location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea
              name="description"
              placeholder="Event description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date *</label>
              <Input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date *</label>
              <Input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Attendees</label>
              <Input
                type="number"
                name="attendees"
                placeholder="0"
                value={formData.attendees}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {initialEvent ? "Update Event" : "Create Event"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
