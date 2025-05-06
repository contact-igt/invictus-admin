/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridCellParams, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from './ActionMenu';
import { Box } from '@mui/material';
import { UserProps } from 'services/user/script';

interface UsersTableProps {
  searchText: string;
  usersData: UserProps[];
  handleEdit: (userId: number) => void;
}

const UsersTable = ({ searchText, usersData, handleEdit }: UsersTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const columns: GridColDef<UserProps>[] = [
    {
      field: 'profile_picture',
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
          <Avatar alt={params.row.username} src={params.value as string} sx={{ width: 36, height: 36 }} />
        </Box>
      ),
      flex: 1,
      minWidth: 80,
    },
    {
      field: 'username',
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
      field: 'phone_number',
      headerName: 'Phone Number',
      flex: 1.5,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) => `+971-${params}`,
    },
    {
      field: 'profile_types',
      headerName: 'Profile Type(s)',
      flex: 1.5,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) => {
        const values = params as string[];
        if (!Array.isArray(values)) return '';
    
        return values
          .map((str: string) =>
            str
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          )
          .join(', ');
      },
    },
    {
      field: 'created_at',
      headerName: 'Join Date',
      flex: 1,
      minWidth: 120,
      align: 'left',
      headerAlign: 'left',
      valueFormatter: (params: GridCellParams) => {      
        const raw = params as unknown as string;
        if (!raw) return '';
        const date = new Date(raw);
        const day = date.getDate();
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const color = params.value === 'user' ? 'success' : 'warning';
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
      renderCell: (params) => (
        <ActionMenu
          onEdit={() => handleEdit(params.row.id)}
          onRemove={()=>{}}
        />
      ),
    }
  ];

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      rows={usersData}
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
