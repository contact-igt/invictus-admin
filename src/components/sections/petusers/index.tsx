/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, useMemo, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import UsersTable from './UsersTable';
import PageTitle from 'components/common/PageTitle';
import { useQuery } from 'react-query';
import { UserApis } from 'services/user';
import PageLoader from 'components/loader/PageLoader';
import { Popup } from 'components/common/Popup';
import UserForm from './UserForm';

const UsersSection = () => {
  const userApis = useMemo(() => new UserApis(), []);
  const getAllUsers = useCallback(() => userApis.getAllUsers(), [userApis]);
  const { data: usersData, isLoading } = useQuery(['all-users'], getAllUsers);
  const [searchText, setSearchText] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

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

  if (isLoading) return <PageLoader />

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
  );
};

export default UsersSection;
