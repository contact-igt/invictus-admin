export interface EventContactDetails {
  email: string;
  contact_number: string;
}

export interface EventJoiner {
  id: number;
  user_id: number;
  event_id: number;
  user_name: string;
  user_profile: string;
}

export interface Event {
  id: number;
  user_id: number;
  event_title: string;
  event_description: string;
  full_address: string;
  pin_location: string;
  city: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  joiners: EventJoiner[];
  contact_details: EventContactDetails;
  pet_types: string[];
  gallery_images: string[];
}

export interface EventsResponse {
  message: string;
  upcoming_events: Event[];
}

export interface PetEventsDetailsProps {
  eventId: number | string;
}
