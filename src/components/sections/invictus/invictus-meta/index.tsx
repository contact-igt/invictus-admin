/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import InvictusMetaTable from './invictusMetaTable';
import { deleteInvictusMetaByIdQuery, useInvictusMetaQuery } from 'components/hooks/useInvictusQuery';
import { Popup } from 'components/common/Popup';
import InvictusMetaView from './InvictusMetaView';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { handleCSVDownloadData, handleXlsxDownloadData } from 'components/hooks/useExportDataToExcel';

const InvictusMetaSection = () => {
    const { data: usersData, isLoading } = useInvictusMetaQuery()
    const [searchText, setSearchText] = useState('');
    const { mutate: deleteInvictusMetaUserMutate, isLoading: deleteLoading } = deleteInvictusMetaByIdQuery();
    const [openConfirmAlertModal, setOpenConfirmAlertModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const [viewModal, setviewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const handleOpenConfirmAlertModal = (id: number) => {
        setSelectedUserId(id);
        setOpenConfirmAlertModal(true);


    }
    const handleRemoveTip = () => {
        deleteInvictusMetaUserMutate({
            id: selectedUserId
        }, {
            onSuccess: () => {
                setOpenConfirmAlertModal(false)
            }
        })

        console.log("hh", selectedUserId)
    }
    const handleOpenViewModal = (id: number) => {
        const user = usersData?.data?.find((user: any) => user.id === id);
        setviewModal(!viewModal);
        setviewModal(!viewModal);
        setSelectedUser(user);
    }


    const handleCloseViewModal = () => {
        setviewModal(false);
        setSelectedUser(null);
    }

    if (isLoading) return <PageLoader />;

    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Invictus Meta Users"
                    btnText="Invictus Meta Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                    isCsvExportEnable={usersData?.data?.length > 0}
                    isXslxExportEnable={usersData?.data?.length > 0}
                    handleXslxExportData={() => handleXlsxDownloadData(usersData?.data, "Invictus Meta")}
                    handleCsvExportData={() => handleCSVDownloadData(usersData?.data, "Invictus Meta")}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <InvictusMetaTable
                        searchText={searchText}
                        usersData={usersData?.data}
                        handleView={handleOpenViewModal}
                        handleRemove={handleOpenConfirmAlertModal}

                    />
                </Paper>
            </Stack>
            <Popup
                open={openConfirmAlertModal}
                onClose={() => setOpenConfirmAlertModal(false)}
                showOnClose={false}
            >
                <ConfirmAlert
                    title={`Are you sure you want to delete this user ?`}
                    onConfirm={handleRemoveTip}
                    onCancel={() => setOpenConfirmAlertModal(false)}
                    isLoading={deleteLoading}
                />
            </Popup>
            <Popup open={viewModal} onClose={handleCloseViewModal}>
                <InvictusMetaView selectedUser={selectedUser} />
            </Popup>
        </>
    );
};

export default InvictusMetaSection;
