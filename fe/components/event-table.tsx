"use client"

import type { Event } from "@/lib/mock-events"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EventTableProps {
  events: Event[]
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
}

export default function EventTable({ events, onEdit, onDelete }: EventTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Location</th>
              <th className="px-6 py-3 text-left font-semibold">Start Date</th>
              <th className="px-6 py-3 text-left font-semibold">Attendees</th>
              <th className="px-6 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-3">{event.title}</td>
                <td className="px-6 py-3">{event.location}</td>
                <td className="px-6 py-3">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{event.attendees}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {events.length === 0 && (
        <div className="px-6 py-8 text-center text-muted-foreground">No events found. Create one to get started!</div>
      )}
    </Card>
  )
}
