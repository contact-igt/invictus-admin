
import { useEffect } from 'react';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { useNavigate } from 'react-router-dom';
import { Pet } from 'services/user/script';
import ActionMenu from 'components/sections/ActionMenu';
import { Chip, Stack } from '@mui/material';

interface PetsTableProps {
    searchText: string;
    usersData: []
}

const VlsLawPracticeTable = ({ searchText, usersData }: PetsTableProps) => {
    const navigate = useNavigate();
    const apiRef = useGridApiRef<GridApi>();

    useEffect(() => {
        apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((w) => w));
    }, [searchText]);

    const columns: GridColDef<Pet>[] = [

        {
            field: 'name',
            headerName: 'Name',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const data = params?.value;
                return data ? data : "---";
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'payment_status',
            headerName: 'Payment Status',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const color = params.value === 'paid' ? 'success' : 'error';
                return (
                    <Stack direction="column" alignItems="center" justifyContent="center" height={1}>
                        <Chip label={params.value ? params?.value : "failed"} size="small" color={color} />
                    </Stack>
                );
            }
        },
        {
            field: 'razorpay_payment_id',
            headerName: 'Razorpay Payment ID',
            flex: 1.5,
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const data = params?.value;
                return data ? data : "---";
            },

        },

        {
            field: 'domain_source',
            headerName: 'Domain',
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
                    onEdit={() => { }}
                    onRemove={() => { }}
                />
            ),
        },
    ];

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
                '& .MuiDataGrid-cell': {
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                },
            }}
        />
    );
};

export default VlsLawPracticeTable;
