/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';

interface viewProps {
    selectedUser: any;
}

const VlsAibeView = ({ selectedUser }: viewProps) => {
    const [copied, setcopied] = useState(false);
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
        `UTM Medium : ${(selectedUser?.utm_medium) ?? '---'}`,
        `UTM Campaign : ${(selectedUser?.utm_campaign) ?? '---'}`,
        `UTM Term : ${(selectedUser?.utm_term) ?? '---'}`,
        `UTM Content : ${(selectedUser?.utm_content) ?? '---'}`,
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

    return (
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
                Vls Law AIBE User
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
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Medium</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Campaign</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Term</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Content</Typography>
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
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_medium ? selectedUser?.utm_medium : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_source ? selectedUser?.utm_campaign : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_campaign ? selectedUser?.utm_term : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_source ? selectedUser?.utm_content : '---'}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default VlsAibeView;