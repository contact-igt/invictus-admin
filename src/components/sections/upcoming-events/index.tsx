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
import { useDeleteEventMutation, useEventsQuery } from 'components/hooks/useEventsQuery';
import { Event } from 'services/events/script';
import ConfirmAlert from 'components/common/ConfirmAlert';

const UpcomingEvents = () => {
  const { getPetTypes } = new PetApis();
  const { data: eventData, isLoading: eventsLoading } = useEventsQuery();

  const { data: petTypes, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
    staleTime: 1000 * 60 * 3,
  });

  const deleteEvent = useDeleteEventMutation();

  const [searchText, setSearchText] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>({} as Event);
  const [openConfirmAlertModal, setOpenConfirmAlertModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | string>(0);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenEventsAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleRemoveEvent = () => {
    deleteEvent.mutate(selectedEventId, {
      onSuccess: () => {
        setOpenConfirmAlertModal(false);
      },
    });
  };
  const handleOpenEventModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleCloseEventEditModal = () => {
    setOpenEditModal(false);
    setSelectedEvent(null);
  };

  const handleOpenEventAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleEditEvent = (id: number | string) => {
    const event = eventData?.upcoming_events?.find((event: Event) => event.id === id); 
    if (event) {
      setSelectedEvent(event);
      setOpenEditModal(!openEditModal);
    }
  };

  const handleOpenConfirmAlertModal = (id: number | string) => {
    setSelectedEventId(id);
    const selectedEventDetails: Event | undefined = eventData?.upcoming_events?.find(
      (i: Event) => i?.id === id,
    );
    setSelectedEventTitle(selectedEventDetails?.event_title);
    setOpenConfirmAlertModal(!openConfirmAlertModal);
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
            <EventCard
              data={event}
              onEdit={handleEditEvent}
              onRemove={handleOpenConfirmAlertModal}
            />
          </Grid>
        ))}
      </Grid>

      <Popup
        open={openAddModal || openEditModal}
        onClose={openAddModal ? handleOpenEventModal : handleCloseEventEditModal}
      >
        <EvetsForm
          selectedEvent={openEditModal ? selectedEvent : undefined}
          data={petTypes?.pet_types}
          isEdit={false}
          onSuccess={() => {
            if (openEditModal) {
              handleCloseEventEditModal();
            } else {
              handleOpenEventAddModal();
            }
          }}
        />
      </Popup>

      <Popup
        open={openConfirmAlertModal}
        onClose={() => setOpenConfirmAlertModal(false)}
        showOnClose={false}
      >
        <ConfirmAlert
          title={`Are you sure you want to delete Event (${selectedEventTitle})?`}
          onConfirm={handleRemoveEvent}
          onCancel={() => setOpenConfirmAlertModal(false)}
          isLoading={deleteEvent?.isLoading}
        />
      </Popup>
    </Stack>
  );
};

export default UpcomingEvents;
