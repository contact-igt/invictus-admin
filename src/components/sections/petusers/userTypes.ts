export interface UserProps {
  id?: number;
  username: string;
  email: string;
  phone_number: string;
  country_code: string;
  profile_picture?: string;
  role: string;
  profile_types: string[];
  password: string;
}

export interface UserForm {
  isEdit?: boolean;
  userData?: UserProps;
}
