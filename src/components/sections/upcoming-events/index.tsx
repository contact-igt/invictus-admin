import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import PageTitle from 'components/common/PageTitle';
import { Popup } from 'components/common/Popup';
import EvetsForm from './EvetsForm';

const UpcomingEvents = () => {
  const [searchText, setSearchText] = useState('');
    const [openAddModal, setOpenAddModal] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

    const handleOpenEventsAddModal = () => {
      setOpenAddModal(!openAddModal);
    };
  

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
        <EvetsForm isEdit={false} />
      </Popup>
    </Stack>
  );
};

export default UpcomingEvents;
