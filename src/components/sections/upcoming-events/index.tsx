/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import PageTitle from 'components/common/PageTitle';
import { Popup } from 'components/common/Popup';
import EvetsForm from './EvetsForm';
import { useQuery } from 'react-query';
import { PetApis } from 'services/pet';
import PageLoader from 'components/loader/PageLoader';

const UpcomingEvents = () => {
  const { getPetTypes } = new PetApis();
  const { data, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
    staleTime: 1000 * 60 * 3,
  });
  

  const [searchText, setSearchText] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenEventsAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  if (petTypeLoading) return <PageLoader />;

  return (
    <Stack direction="column" spacing={1} width={1}>
      <PageTitle
        title="Upcoming Events"
        btnText="Event"
        isSearchEnable={true}
        isAddEnable={true}
        searchText={searchText}
        handleInputChange={handleInputChange}
        openModal={handleOpenEventsAddModal}
      />
      <Popup open={openAddModal} onClose={handleOpenEventsAddModal}>
        <EvetsForm data={data?.pet_types} isEdit={false} />
      </Popup>
    </Stack>
  );
};

export default UpcomingEvents;
