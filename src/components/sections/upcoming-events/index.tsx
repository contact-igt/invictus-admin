import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import PageTitle from 'components/common/PageTitle';
import { Popup } from 'components/common/Popup';
import EvetsForm from './EvetsForm';
import { useQuery } from 'react-query';
import { PetApis } from 'services/pet';
import PageLoader from 'components/loader/PageLoader';
import EventCard from './EventCard';
import { useEventsQuery } from 'components/hooks/useEventsQuery';
import { Event } from 'services/events/script';

const UpcomingEvents = () => {
  const { getPetTypes } = new PetApis();
  const { data: eventData, isLoading: eventsLoading } = useEventsQuery();
  

  const { data: petTypes, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
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

  if (petTypeLoading || eventsLoading) return <PageLoader />;

  return (
    <Stack direction="column" spacing={2} width={1}>
      <PageTitle
        title="Upcoming Events"
        btnText="Event"
        isSearchEnable={true}
        isAddEnable={true}
        searchText={searchText}
        handleInputChange={handleInputChange}
        openModal={handleOpenEventsAddModal}
      />

      <Grid container spacing={2}>
        {eventData?.upcoming_events.map((event: Event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <EventCard data={event} />
          </Grid>
        ))}
      </Grid>

      <Popup open={openAddModal} onClose={handleOpenEventsAddModal}>
        <EvetsForm data={petTypes?.pet_types} isEdit={false} />
      </Popup>
    </Stack>
  );
};

export default UpcomingEvents;
