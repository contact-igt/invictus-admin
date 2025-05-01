import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import PageTitle from 'components/common/PageTitle';

const UpcomingEvents = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
        openModal={() => {}}
      />
    </Stack>
  );
};

export default UpcomingEvents;
