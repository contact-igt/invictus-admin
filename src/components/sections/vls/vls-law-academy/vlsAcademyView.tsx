/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';

interface viewProps {
    selectedUser: any;
}

const VlsAcademyView = ({ selectedUser }: viewProps) => {
    const [copied, setcopied] = useState(false);
    const shareurl: any = [
        `Name : ${selectedUser?.name ?? '---'} `,
        `Email : ${selectedUser?.email ?? '---'} `,
        `Mobile : ${selectedUser?.mobile ?? '---'} `,
        `Message : ${selectedUser?.message ?? '---'}`,
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
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Message</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Registered Date</Typography>
                </Stack>
                <Stack flexDirection={"column"} width={"100%"}>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.name ? selectedUser?.name : "---"}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.mobile ? selectedUser?.mobile : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.email ? selectedUser?.email : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.message ? selectedUser?.message : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_date ? dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") : '---'}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default VlsAcademyView;