import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Thumb1,
  Thumb2,
  Thumb3,
  Thumb4,
  Thumb5,
  Thumb6,
  Thumb7,
  Thumb8,
} from './images';

export interface Event {
  id: number;
  title: string;
  category: string;
  thumb: string;
  daysLeft: number;
  avatars: string[];
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Tip: Regular Brushing for Shiny Coat',
    category: 'Cat Grooming',
    thumb: Thumb1,
    daysLeft: 7,
    avatars: [Avatar3, Avatar1, Avatar6, Avatar8, Avatar2],
  },
  {
    id: 2,
    title: 'Tip: Daily Walks Maintain Health',
    category: 'Dog Exercise',
    thumb: Thumb2,
    daysLeft: 5,
    avatars: [Avatar5, Avatar2, Avatar7, Avatar3, Avatar1],
  },
  {
    id: 3,
    title: 'Tip: Fresh Water Always Available',
    category: 'General Care',
    thumb: Thumb3,
    daysLeft: 3,
    avatars: [Avatar4, Avatar6, Avatar1, Avatar5, Avatar7],
  },
  {
    id: 4,
    title: 'Tip: Proper Dental Hygiene',
    category: 'Pet Dental Care',
    thumb: Thumb4,
    daysLeft: 10,
    avatars: [Avatar8, Avatar3, Avatar5, Avatar2, Avatar6],
  },
  {
    id: 5,
    title: 'Tip: Balanced Diet for Growth',
    category: 'Nutrition',
    thumb: Thumb5,
    daysLeft: 14,
    avatars: [Avatar7, Avatar4, Avatar1, Avatar6, Avatar3],
  },
  {
    id: 6,
    title: 'Tip: Safe Toys for Mental Stimulation',
    category: 'Pet Enrichment',
    thumb: Thumb6,
    daysLeft: 4,
    avatars: [Avatar2, Avatar5, Avatar8, Avatar4, Avatar7],
  },
  {
    id: 7,
    title: 'Tip: Regular Vet Check-ups',
    category: 'Health Care',
    thumb: Thumb7,
    daysLeft: 30,
    avatars: [Avatar1, Avatar7, Avatar3, Avatar8, Avatar5],
  },
  {
    id: 8,
    title: 'Tip: Comfortable Bedding for Rest',
    category: 'Habitat Comfort',
    thumb: Thumb8,
    daysLeft: 2,
    avatars: [Avatar6, Avatar8, Avatar2, Avatar1, Avatar4],
  },
];
