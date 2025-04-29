import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from './ActionMenu';
import { users, User } from 'data/users';
import { Box } from '@mui/material';

const columns: GridColDef<User>[] = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          paddingY: '8px',
        }}
      >
        <Avatar alt={params.row.name} src={params.value as string} sx={{ width: 36, height: 36 }} />
      </Box>
    ),
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    minWidth: 150,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    minWidth: 200,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    flex: 1.5,
    minWidth: 150,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'profileType',
    headerName: 'Profile Type',
    flex: 1.5,
    minWidth: 150,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'joinDate',
    headerName: 'Join Date',
    flex: 1,
    minWidth: 120,
    align: 'left',
    headerAlign: 'left',
    valueFormatter: () => '15 Sept 2020',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      const color = params.value === 'active' ? 'success' : 'warning';
      return <Chip label={params.value} size="small" color={color} />;
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    flex: 1,
    minWidth: 100,
    sortable: false,
    align: 'right',
    headerAlign: 'right',
    renderCell: () => <ActionMenu />,
  },
];

interface UsersTableProps {
  searchText: string;
}

const UsersTable = ({ searchText }: UsersTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      rows={users}
      columns={columns}
      pageSizeOptions={[5, 10, 20]}
      initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      rowHeight={60}
      disableColumnMenu
      disableRowSelectionOnClick
      slots={{ pagination: DataGridFooter }}
      sx={{
        '& .MuiDataGrid-columnHeaderTitle': {
          overflow: 'visible',
          textOverflow: 'clip',
          whiteSpace: 'normal',
        },
      }}
    />
  );
};

export default UsersTable;
