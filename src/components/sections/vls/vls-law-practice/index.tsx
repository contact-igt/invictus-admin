/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import { deleteVlsLawPracticeByIdMutation, useVlsLawpracticeQuery } from 'components/hooks/useVlsQuery';
import VlsLawPracticeTable from './vlsTable';
import { handleCSVDownloadData, handleXlsxDownloadData } from 'components/hooks/useExportDataToExcel';
import { Popup } from 'components/common/Popup';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';

const VlsLawPracticeSection = () => {
    const { data: usersData, isLoading } = useVlsLawpracticeQuery();
    const { mutate: deleteVlsLawPracticeUserMutate, isLoading: deleteLoading } = deleteVlsLawPracticeByIdMutation();
    const [searchText, setSearchText] = useState('');
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
        deleteVlsLawPracticeUserMutate({
            id: selectedUserId
        }, {
            onSuccess: () => {
                setOpenConfirmAlertModal(false)
            }
        })
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
        `Email : ${selectedUser?.email ?? '---'} `,
        `Mobile : ${selectedUser?.mobile ?? '---'} `,
        `Amount : ₹${selectedUser?.amount ?? '---'}`,
        `Programm Date : ${dayjs(selectedUser?.programm_date).format("YYYY-MMMM-DD") ?? '---'}`,
        `Registered Date : ${dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") ?? '---'}`,
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
                    title="Vls Law Practice Users"
                    btnText="Vls Law  Practice Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                    isCsvExportEnable={usersData?.data?.length > 0}
                    isXslxExportEnable={usersData?.data?.length > 0}
                    handleXslxExportData={() => handleXlsxDownloadData(usersData?.data, "vls-law-practice")}
                    handleCsvExportData={() => handleCSVDownloadData(usersData?.data, "vls-law-practice")}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <VlsLawPracticeTable
                        searchText={searchText}
                        usersData={usersData?.data}
                        handleRemove={(id) => { handleOpenConfirmAlertModal(id) }}
                        handleView={(id) => { handleOpenViewModal(id) }}
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
                <Stack
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems="center"
                    spacing={2}
                    width={"600px"}
                    position={"relative"}
                    sx={{ padding: 4 }}
                >
                    <Typography textAlign={'center'} variant="h4" sx={{ width: '100%' }}>
                        Vls Law Practice User
                    </Typography>

                    <Stack flexDirection={"column"} position={"absolute"} bottom={"15px"} right={"10px"} >
                        <IconifyIcon
                            onClick={handleurl}
                            icon="hugeicons:copy-01"
                            sx={{
                                cursor: 'pointer',
                                fontSize: "35px",
                                backgroundColor: '#47b4ec',
                                color: '#fff',
                                borderRadius: '10px',
                                padding: 0.8,
                                '&:hover': {
                                    backgroundColor: '#000000ff',
                                    color: '#fff',
                                },
                            }}
                        />
                        <Typography sx={{ fontSize: "10px", fontWeight: "600", textAlign: "center" }}>{copied ? 'Copied' : ''}</Typography>
                    </Stack>
                    <Stack width={"100%"} display={"flex"} gap={"5px"} marginTop={"20px"}>
                        <Stack flexDirection={"column"} width={"350px"} >
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Name</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Mobile</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Email</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Amount</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Programm Date</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Registered Date</Typography>
                        </Stack>
                        <Stack flexDirection={"column"} width={"100%"}>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.name ? selectedUser?.name : "---"}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.mobile ? selectedUser?.mobile : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.email ? selectedUser?.email : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.amount ? selectedUser?.amount : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.programm_date ? dayjs(selectedUser?.programm_date).format("YYYY-MMMM-DD") : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_date ? dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") : '---'}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Popup>
        </>
    );
};

export default VlsLawPracticeSection;
