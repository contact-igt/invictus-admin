import { useMemo } from 'react';

export interface Option {
  label: string;
  value: string;
}
export interface UsePetSelectionsParams {
  petData?: {
    pet_type?: string;
    pet_breed?: string;
    color?: string;
  };
  petTypes?: Option[];
  petBreeds?: Option[];
  petColors?: Option[];
}
export interface PetSelections {
  petType: Option | null;
  petBreed: Option | null;
  petColor: Option | null;
}

const usePetSelections = ({
  petData,
  petTypes = [],
  petBreeds = [],
  petColors = [],
}: UsePetSelectionsParams): PetSelections => {
  const selections = useMemo<PetSelections>(() => {
    const petType = petTypes.find((opt) => opt.value === petData?.pet_type) || null;

    const petBreed = petBreeds.find((opt) => opt.value === petData?.pet_breed) || null;

    const petColor = petColors.find((opt) => opt.value === petData?.color) || null;

    return {
      petType,
      petBreed,
      petColor,
    };
  }, [petData, petTypes, petBreeds, petColors]);

  return selections;
};

export default usePetSelections;
