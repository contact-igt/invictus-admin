/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormButton from 'components/common/Forms/AppFormButton';
import { editPetAboutValidationSchema } from 'schemas/validations';
import AppFormTextField from 'components/common/Forms/AppTextFeild';
import AppFormImagePicker from 'components/common/Forms/AppFormIndieImagePicker';
import { useQuery } from 'react-query';
import { PetApis } from 'services/pet';
import AppFormSelect from 'components/common/Forms/AppFormSelectFeild';
import { PetTypes } from 'services/pet/script';

interface AboutFormProps {
  pet: {
    pet_name?: string;
    pet_type?: string;
    gender?: string;
    pet_breed?: string;
    color?: string;
    nuetered?: string;
    physically_active?: string;
    microchip_number?: number;
    pet_address?: { city?: string; country?: string };
    date_of_birth?: string;
    pet_profile_picture: string;
  };
}

const AboutForm: React.FC<AboutFormProps> = ({ pet }) => {
  const { getPetTypes } = new PetApis();
  const { data: petTypesData, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
    staleTime: 1000 * 60 * 5,
  });
  const { pet_types } = petTypeLoading ? { pet_types: [] } : petTypesData;

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Stack width={500} flexDirection="column" p={2} overflow={'scroll'}>
      {petTypeLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.7)"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography align="left" variant="h4">
        Edit About{' '}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            pet_name: pet?.pet_name || '',
            pet_profile_picture: pet?.pet_profile_picture || '',
            pet_type: pet?.pet_type || '',
          }}
          validationSchema={editPetAboutValidationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormImagePicker name="pet_profile_picture" />

          <AppFormTextField
            name="pet_name"
            label="Pet Name"
            placeholder="Enter Pet Name"
            icon="mdi:paw"
            variant="standard"
          />

          <AppFormSelect
            name="pet_type"
            label="Pet Type(s)"
            options={
              Array.isArray(pet_types)
                ? pet_types.map((pet: PetTypes) => ({ label: pet.label, value: pet.value }))
                : []
            }
            placeholder="Select Pet Type(s)"
            icon="hugeicons:type-cursor"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />

          <AppFormButton label="Save" type="submit" fullWidth={true} size="medium" />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default AboutForm;
