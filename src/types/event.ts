export type EventType = "Showing" | "Call" | "Meeting" | "Open House";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
  location?: string;
}