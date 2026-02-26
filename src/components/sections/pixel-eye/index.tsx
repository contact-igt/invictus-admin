/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import { deletePixelEyeByIdQuery, usePixelEyeQuery } from 'components/hooks/usePixelEyeQuery';
import PixelEyeTable from './pixelEyeTable';
import { handleCSVDownloadData, handleXlsxDownloadData } from 'components/hooks/useExportDataToExcel';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { Popup } from 'components/common/Popup';
import { Typography, Box, Divider, Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';


const PixelEyeSection = () => {
    const { data: usersData, isLoading } = usePixelEyeQuery();
    const [searchText, setSearchText] = useState('');
    const { mutate: deletePixelEyeUserMutate, isLoading: deleteLoading } = deletePixelEyeByIdQuery();
    const [openConfirmAlertModal, setOpenConfirmAlertModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const [viewModal, setviewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [copied, setcopied] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };


    const handleOpenConfirmAlertModal = (id: number) => {
        setSelectedUserId(id);
        setOpenConfirmAlertModal(true);


    }
    const handleRemoveTip = () => {
        deletePixelEyeUserMutate({
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


    const shareurl: any = [
        `Name : ${selectedUser?.name ?? '---'} `,
        `Mobile : ${selectedUser?.mobile ?? '---'} `,
        `Age: ${selectedUser?.age ?? '---'}`,
        `City : ${selectedUser?.city ?? '---'}`,
        `Page Name : ${selectedUser?.page_name ?? '---'} `,
        `Enquiry Count : ${selectedUser?.enquiry_count ?? '---'}`,
        `Enquiry Date : ${dayjs(selectedUser?.registered_date).format("YYYY-MMM-DD") ?? '---'}`,

    ]

    const handleurl = async () => {
        try {
            await navigator.clipboard.writeText(shareurl);
            setcopied(true);
            setTimeout(() => {
                setcopied(false);
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <PageLoader />;

    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Pixel Eye Users"
                    btnText="Pixel Eye Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                    isCsvExportEnable={usersData?.data?.length > 0}
                    isXslxExportEnable={usersData?.data?.length > 0}
                    handleXslxExportData={() => handleXlsxDownloadData(usersData?.data, "Pixel eye")}
                    handleCsvExportData={() => handleCSVDownloadData(usersData?.data, "Pixel eye")}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <PixelEyeTable
                        searchText={searchText}
                        usersData={usersData?.data}
                        handleRemove={(id) => handleOpenConfirmAlertModal(id)}
                        handleView={(id) => handleOpenViewModal(id)}
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
                <Box sx={{ p: 4, width: { xs: '100%', sm: 400, md: 450 } }}>
                    <Typography variant="h5" mb={4} sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Pixel Eye User
                    </Typography>

                    <Stack direction="column" spacing={3} mb={4} alignItems="flex-start">
                        {[
                            { label: 'Name', value: selectedUser?.name },
                            { label: 'Mobile', value: selectedUser?.mobile },
                            { label: 'Age', value: selectedUser?.age },
                            { label: 'City', value: selectedUser?.city },
                            { label: 'Page Name', value: selectedUser?.page_name },
                            { label: 'Enquiry Count', value: selectedUser?.enquiry_count },
                            { label: 'Enquiry Date', value: selectedUser?.registered_date ? dayjs(selectedUser.registered_date).format("DD MMM YYYY") : null },
                        ].map((detail, index) => (
                            detail.value && (
                                <Stack key={index} direction="column" spacing={0.5} width="100%">
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        {detail.label}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        {detail.value || '---'}
                                    </Typography>
                                </Stack>
                            )
                        ))}
                    </Stack>

                    <Divider sx={{ mb: 3 }} />

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<IconifyIcon icon={copied ? "mingcute:check-fill" : "hugeicons:copy-01"} />}
                        onClick={handleurl}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.2,
                            borderRadius: '8px',
                            borderColor: copied ? 'success.main' : 'divider',
                            color: copied ? 'success.main' : 'text.primary',
                            '&:hover': {
                                borderColor: copied ? 'success.dark' : 'text.primary',
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        {copied ? 'Details Copied' : 'Copy All Details'}
                    </Button>
                </Box>
            </Popup>




        </>
    );
};

export default PixelEyeSection;