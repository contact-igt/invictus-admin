/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from './ActionMenu';
import { useNavigate } from 'react-router-dom';
import { Pet } from 'services/user/script';

interface PetsTableProps {
  searchText: string;
  pets: Pet[];
}

const PetsTable = ({ searchText, pets }: PetsTableProps) => {
  const navigate = useNavigate();     
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((w) => w));
  }, [searchText]);

  const columns: GridColDef<Pet>[] = [
    {
      field: 'pet_profile_picture',
      headerName: 'Photo',
      sortable: false,
      filterable: false,
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            py: 1,
          }}
        >
          <Avatar
            alt={params.row.pet_name}
            src={params.value as string}
            sx={{ width: 36, height: 36 }}
          />
        </Box>
      ),
    },
    {
      field: 'pet_name',
      headerName: 'Name',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'pet_type',
      headerName: 'Type',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'pet_breed',
      headerName: 'Breed',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'color',
      headerName: 'Color',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'microchip_number',
      headerName: 'Microchip',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'liked_count',
      headerName: 'Likes',
      type: 'number',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'super_liked_count',
      headerName: 'Super Likes',
      type: 'number',
      flex: 1.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <ActionMenu
          onDetails={() => navigate(`pet-details/${params.row.id}`)}
          onRemove={() => console.log('Remove', params.row.id)}
        />
      ),
    },
  ];

  return (
    <DataGrid
      apiRef={apiRef}
      rows={pets}
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
        '& .MuiDataGrid-cell': {
          display: 'flex',
          alignItems: 'center',
          px: 1,
        },
      }}
    />
  );
};

export default PetsTable;
