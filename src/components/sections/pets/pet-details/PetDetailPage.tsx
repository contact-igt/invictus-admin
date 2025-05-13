import { FC } from 'react';
import Box from '@mui/material/Box';

interface PetDetailsProps {
  petId: string | number;
}

const PetDetails: FC<PetDetailsProps> = ({ petId }) => {
  return (
    <Box mx="auto" my={4} padding="0px 50px">
      <p>Pet ID: {petId}</p>
    </Box>
  );
};

export default PetDetails;
