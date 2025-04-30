import { useState, ChangeEvent, Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import UsersTable from './UsersTable';
import PageTitle from 'components/common/PageTitle';
import { useQuery } from 'react-query';
import { UserApis } from 'services/user';
import PageLoader from 'components/loader/PageLoader';

const UsersSection = () => {
  const { getAllUsers } = new UserApis();
  const { data: usersData, isLoading } = useQuery(["all-users"], getAllUsers);
  const [searchText, setSearchText] = useState('');
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if(isLoading) return <Suspense fallback={<PageLoader />}></Suspense>

  return (
    
    <Stack direction="column" spacing={1} width={1}>
      <PageTitle title="Users" searchText={searchText} handleInputChange={handleInputChange} />
      <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
        <UsersTable searchText={searchText} usersData={usersData?.users}/>
      </Paper>
    </Stack>
  );
};

export default UsersSection;
