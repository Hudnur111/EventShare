import { create } from 'zustand';
import type { Event, Upload, AdminSession, GuestSession } from '@/types';

interface EventStoreState {
  // Admin state
  currentEvent: Event | null;
  adminSession: AdminSession | null;
  events: Event[];
  uploads: Upload[];
  
  // Guest state
  guestSession: GuestSession | null;
  eventUploads: Upload[]; // uploads for current event
  
  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentEvent: (event: Event | null) => void;
  setAdminSession: (session: AdminSession | null) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  setGuestSession: (session: GuestSession | null) => void;
  addUpload: (upload: Upload) => void;
  setEventUploads: (uploads: Upload[]) => void;
  
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}

export const useEventStore = create<EventStoreState>((set) => ({
  // Initial state
  currentEvent: null,
  adminSession: null,
  events: [],
  uploads: [],
  guestSession: null,
  eventUploads: [],
  isLoading: false,
  error: null,

  // Admin Actions
  setCurrentEvent: (event) => set({ currentEvent: event }),
  
  setAdminSession: (session) => set({ adminSession: session }),
  
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
      currentEvent: event,
    })),
  
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      currentEvent:
        state.currentEvent?.id === id
          ? { ...state.currentEvent, ...updates }
          : state.currentEvent,
    })),
  
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
      currentEvent: state.currentEvent?.id === id ? null : state.currentEvent,
    })),

  // Guest Actions
  setGuestSession: (session) => set({ guestSession: session }),
  
  addUpload: (upload) =>
    set((state) => ({
      uploads: [...state.uploads, upload],
      eventUploads: [...state.eventUploads, upload],
    })),
  
  setEventUploads: (uploads) => set({ eventUploads: uploads }),

  // UI Actions
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearStore: () =>
    set({
      currentEvent: null,
      adminSession: null,
      events: [],
      uploads: [],
      guestSession: null,
      eventUploads: [],
      error: null,
    }),
}));