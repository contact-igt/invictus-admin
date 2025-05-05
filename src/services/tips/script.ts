export interface Tip {
  id: number;
  title: string;
  overview: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface TipFormValues {
  title: string;
  category: string[];
  overview: string;
  description: string;
  image: File;
}

export interface PetTipsDetailsProps {
  tipId: number;
}
