"use client"

import type { Event } from "@/lib/mock-events"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const now = new Date()
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  let status = "upcoming"
  if (startDate <= now && endDate >= now) {
    status = "ongoing"
  } else if (endDate < now) {
    status = "past"
  }

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
    past: "bg-gray-100 text-gray-800",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="mt-1">{event.location}</CardDescription>
          </div>
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">
            {startDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            - {startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-muted-foreground">
            Attendees: <span className="font-semibold">{event.attendees}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
