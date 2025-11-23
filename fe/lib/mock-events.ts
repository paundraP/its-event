export interface Event {
  id: string
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  attendees: number
}

const now = new Date()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Tech Conference 2025",
    description: "Join industry leaders for discussions on emerging technologies.",
    location: "San Francisco Convention Center",
    startDate: twoWeeks.toISOString(),
    endDate: new Date(twoWeeks.getTime() + 8 * 60 * 60 * 1000).toISOString(),
    attendees: 250,
  },
  {
    id: "event-2",
    title: "React Workshop",
    description: "Hands-on workshop for advanced React patterns and hooks.",
    location: "Online",
    startDate: nextWeek.toISOString(),
    endDate: new Date(nextWeek.getTime() + 4 * 60 * 60 * 1000).toISOString(),
    attendees: 50,
  },
  {
    id: "event-3",
    title: "Networking Lunch",
    description: "Casual networking event with fellow developers.",
    location: "Downtown Coffee House",
    startDate: tomorrow.toISOString(),
    endDate: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    attendees: 30,
  },
  {
    id: "event-4",
    title: "Web Design Masterclass",
    description: "Learn modern design principles and UI/UX best practices.",
    location: "Design Studio NYC",
    startDate: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    attendees: 40,
  },
  {
    id: "event-5",
    title: "Past Webinar: AI Trends",
    description: "Retrospective on key trends in artificial intelligence.",
    location: "Online",
    startDate: lastMonth.toISOString(),
    endDate: new Date(lastMonth.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    attendees: 120,
  },
  {
    id: "event-6",
    title: "JavaScript Basics Meetup",
    description: "Monthly meetup for JavaScript enthusiasts.",
    location: "Tech Hub Downtown",
    startDate: lastWeek.toISOString(),
    endDate: new Date(lastWeek.getTime() + 3 * 60 * 60 * 1000).toISOString(),
    attendees: 60,
  },
]
