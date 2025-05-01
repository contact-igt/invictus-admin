export interface Location {
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
  
  export interface Pet {
    id: number;
    user_id: number;
    pet_profile_picture: string;
    pet_type: string;
    pet_name: string;
    pet_breed: string;
    color: string;
    microchip_number: number;
    gender: string;
    date_of_birth: string;
  }
  
  export interface UserProps {
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
    connection_id: number | null;
    status: string | null;
    location: Location[];
    user_pets: Pet[];
  }