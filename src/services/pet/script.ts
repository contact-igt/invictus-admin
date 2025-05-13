export interface PetTypes {
  id: number;
  label: string;
  value: string;
}

export interface EventsFormProps {
  isEdit: boolean;
  data: PetTypes[];
  onSuccess?: () => void;
}

interface PetAddress {
  id: number;
  user_id: number;
  full_name: string;
  address_type: string;
  location_url: string;
  address: string;
  country: string;
  city: string;
  country_code: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

interface PetOwner {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  country_code: string;
  profile_picture: string;
  role: string;
  created_at: string;
  updated_at: string;
  profile_types: string[];
}

interface Pet {
  id: number;
  user_id: number;
  pet_profile_picture: string;
  pet_type: string;
  pet_name: string;
  pet_breed: string;
  color: string;
  microchip_number: number;
  gender: string;
  nuetered: string | null;
  physically_active: string | null;
  weight: string | null;
  height: string | null;
  description: string | null;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  pet_address: PetAddress;
  liked_count: number;
  super_liked_count: number;
  super_liked: boolean;
  liked: boolean;
  owner: PetOwner;
}

export interface PetResponse {
  message: string;
  pets: Pet[];
}
