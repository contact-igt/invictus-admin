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
import { Typography } from '@mui/material';
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
                        Pixel Eye User
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
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Age</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>City</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Page Name</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Enquiry Count</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Enquiry Date</Typography>

                        </Stack>
                        <Stack flexDirection={"column"} width={"100%"}>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.name ? selectedUser?.name : "---"}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.mobile ? selectedUser?.mobile : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.age ? selectedUser?.age : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.city ? selectedUser?.city : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.page_name ? selectedUser?.page_name : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.enquiry_count ? selectedUser?.enquiry_count : '---'}</Typography>
                            <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_date ? `${dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD")}` : '---'}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Popup>




        </>
    );
};

export default PixelEyeSection;