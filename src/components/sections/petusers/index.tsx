<<<<<<< Updated upstream
import { useState, ChangeEvent } from 'react';
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, Suspense } from 'react';
>>>>>>> Stashed changes
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import UsersTable from './UsersTable';
<<<<<<< Updated upstream

const TaskOverview = () => {
  const [searchText, setSearchText] = useState('');
=======
import PageTitle from 'components/common/PageTitle';
import { useQuery } from 'react-query';
import { UserApis } from 'services/user';
import PageLoader from 'components/loader/PageLoader';
import { Popup } from 'components/common/Popup';
import UserForm from './UserForm';

const UsersSection = () => {
  const { getAllUsers } = new UserApis();
  const { data: usersData, isLoading } = useQuery(['all-users'], getAllUsers);
  const [searchText, setSearchText] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
>>>>>>> Stashed changes

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

<<<<<<< Updated upstream
  return (
    <Stack direction="column" spacing={1} width={1}>
      <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2" minWidth={200}>
          Our Users
        </Typography>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search User"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 1, maxWidth: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon={'mynaui:search'} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
        <UsersTable searchText={searchText} />
      </Paper>
    </Stack>
=======
  const handleOpenUserAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleOpenUserEditModal = (id: number) => {
    console.log(id);
    const user = usersData?.users?.find((user: any) => user.id === id);
    setSelectedUser(user);
    setOpenEditModal(!openEditModal);
  };

  const handleCloseUserEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  if (isLoading) return <Suspense fallback={<PageLoader />}></Suspense>;

  return (
    <>
      <Stack direction="column" spacing={1} width={1}>
        <PageTitle
          title="Users"
          searchText={searchText}
          handleInputChange={handleInputChange}
          openModal={handleOpenUserAddModal}
        />
        <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
          <UsersTable
            searchText={searchText}
            usersData={usersData?.users}
            handleEdit={(id) => handleOpenUserEditModal(id)}
          />
        </Paper>
      </Stack>
      <Popup open={openAddModal} onClose={handleOpenUserAddModal}>
        <UserForm />
      </Popup>

      <Popup open={openEditModal} onClose={handleCloseUserEditModal}>
        <UserForm isEdit={true} userData={selectedUser} />
      </Popup>
    </>
>>>>>>> Stashed changes
  );
};

export default TaskOverview;
