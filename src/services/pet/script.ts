export interface PetTypes {
  id: number;
  label: string;
  value: string;
}

export interface EventsFormProps {
  isEdit: boolean;
  data: PetTypes[]; 
}
