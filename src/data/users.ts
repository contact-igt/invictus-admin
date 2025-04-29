export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  profileType: string;
  joinDate: string; // ISO date string
  avatar: string;
}

export const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1-202-555-0156',
    status: 'active',
    profileType: 'Pet Owner',
    joinDate: '2023-08-15',
    avatar: '/avatars/alice.jpg',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1-202-555-0198',
    status: 'inactive',
    profileType: 'Veterinarian',
    joinDate: '2022-11-02',
    avatar: '/avatars/bob.jpg',
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol@example.com',
    phone: '+1-202-555-0124',
    status: 'active',
    profileType: 'Pet Groomer',
    joinDate: '2024-01-20',
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@example.com',
    phone: '+1-202-555-0177',
    status: 'active',
    profileType: 'Trainer',
    joinDate: '2023-05-30',
    avatar: '/avatars/david.jpg',
  },
  {
    id: 5,
    name: 'Carol Lee',
    email: 'carol@example.com',
    phone: '+1-202-555-0124',
    status: 'active',
    profileType: 'Pet Groomer',
    joinDate: '2024-01-20',
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david@example.com',
    phone: '+1-202-555-0177',
    status: 'active',
    profileType: 'Trainer',
    joinDate: '2023-05-30',
    avatar: '/avatars/david.jpg',
  },
  {
    id: 7,
    name: 'Carol Lee',
    email: 'carol@example.com',
    phone: '+1-202-555-0124',
    status: 'active',
    profileType: 'Pet Groomer',
    joinDate: '2024-01-20',
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 8,
    name: 'David Kim',
    email: 'david@example.com',
    phone: '+1-202-555-0177',
    status: 'active',
    profileType: 'Trainer',
    joinDate: '2023-05-30',
    avatar: '/avatars/david.jpg',
  },
];
