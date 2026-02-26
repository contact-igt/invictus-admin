/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import { deleteOphthallWebinarMutation, useOphthallWebinarQuery } from 'components/hooks/useOphthallWebinarQuery';
import WebinarTable from './webinarTable';
import { handleCSVDownloadData, handleXlsxDownloadData } from 'components/hooks/useExportDataToExcel';
import { Popup } from 'components/common/Popup';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebinarView from './webinarView';

const OphthallWebinarSection = () => {
    const { data: usersData, isLoading } = useOphthallWebinarQuery();
    const { mutate: deleteWebinarMutate, isLoading: deleteLoading } = deleteOphthallWebinarMutation();
    const [searchText, setSearchText] = useState('');
    const [openConfirmAlertModal, setOpenConfirmAlertModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | string>(0);
    const [viewModal, setviewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleOpenConfirmAlertModal = (id: number | string) => {
        setSelectedUserId(id);
        setOpenConfirmAlertModal(true);
    };

    const handleRemoveUser = () => {
        deleteWebinarMutate(
            { id: selectedUserId },
            {
                onSuccess: () => {
                    setOpenConfirmAlertModal(false);
                },
            },
        );
    };

    const handleOpenViewModal = (id: number | string) => {
        const user = usersData?.data?.find((u: any) => u.id === id);
        setSelectedUser(user);
        setviewModal(true);
    };

    const handleCloseViewModal = () => {
        setviewModal(false);
        setSelectedUser(null);
    };

    if (isLoading) return <PageLoader />;

    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Ophthall Academy Webinar Users"
                    btnText="Ophthall Academy Webinar Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                    isCsvExportEnable={usersData?.data?.length > 0}
                    isXslxExportEnable={usersData?.data?.length > 0}
                    handleXslxExportData={() => handleXlsxDownloadData(usersData?.data, 'ophthall-webinar')}
                    handleCsvExportData={() => handleCSVDownloadData(usersData?.data, 'ophthall-webinar')}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <WebinarTable
                        searchText={searchText}
                        usersData={usersData?.data}
                        handleRemove={(id) => handleOpenConfirmAlertModal(id)}
                        handleView={(id) => handleOpenViewModal(id)}
                    />
                </Paper>
            </Stack>
            <Popup open={openConfirmAlertModal} onClose={() => setOpenConfirmAlertModal(false)} showOnClose={false}>
                <ConfirmAlert
                    title={`Are you sure you want to delete this user?`}
                    onConfirm={handleRemoveUser}
                    onCancel={() => setOpenConfirmAlertModal(false)}
                    isLoading={deleteLoading}
                />
            </Popup>

            <Popup open={viewModal} onClose={handleCloseViewModal}>
                <WebinarView selectedUser={selectedUser} />
            </Popup>
        </>
    );
};

export default OphthallWebinarSection;
