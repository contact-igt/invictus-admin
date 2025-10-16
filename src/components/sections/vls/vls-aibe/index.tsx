/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import { deleteVlsLawAibeByIdMutation, useVlsLawAibeQuery } from 'components/hooks/useVlsQuery';
import { handleCSVDownloadData, handleXlsxDownloadData } from 'components/hooks/useExportDataToExcel';
import { Popup } from 'components/common/Popup';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';
import VlsAibeTable from './vlsAibeTable';

const VlsAibeSection = () => {
    const { data: usersData, isLoading } = useVlsLawAibeQuery();
    const { mutate: deleteVlsLawAcademyUserMutate, isLoading: deleteLoading } = deleteVlsLawAibeByIdMutation();
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
        deleteVlsLawAcademyUserMutate({
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
        `Amount : ${selectedUser?.amount ?? '---'}`,
        `Payment Status : ${(selectedUser?.payment_status) ?? '---'}`,
        `Razorpay order Id : ${(selectedUser?.razorpay_order_id) ?? '---'}`,
        `Razorpay Payment Id : ${(selectedUser?.razorpay_payment_id) ?? '---'}`,
        `Registered Date : ${dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") ?? '---'}`,
        `IP Address : ${(selectedUser?.ip_address) ?? '---'}`,
        `UTM Source : ${(selectedUser?.utm_source) ?? '---'}`,
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

    // console.log("sss" , usersData)

    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Vls AIBE Users"
                    btnText="Vls AIBE Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                    isCsvExportEnable={usersData?.data?.length > 0}
                    isXslxExportEnable={usersData?.data?.length > 0}
                    handleXslxExportData={() => handleXlsxDownloadData(usersData?.data, "vls-aibe")}
                    handleCsvExportData={() => handleCSVDownloadData(usersData?.data, "vls-aibe")}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <VlsAibeTable
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
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Email</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Mobile</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Amount</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Payment Status</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Razorpay Order Id</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Razorpay Payment Id</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Registered Date</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>IP Address</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Source</Typography>
                        </Stack>
                        <Stack flexDirection={"column"} width={"100%"}>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.name ? selectedUser?.name : "---"}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.email ? selectedUser?.email : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.mobile ? selectedUser?.mobile : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.amount ? selectedUser?.amount : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.payment_status ? selectedUser?.payment_status : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.razorpay_order_id ? selectedUser?.razorpay_order_id : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.razorpay_payment_id ? selectedUser?.razorpay_payment_id : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_date ? dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.ip_address ? selectedUser?.ip_address : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_source ? selectedUser?.utm_source : '---'}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Popup>
        </>
    );
};

export default VlsAibeSection;
