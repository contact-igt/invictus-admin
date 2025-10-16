/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';

interface viewProps {
    selectedUser: any;
}

const InvictusMetaView = ({ selectedUser }: viewProps) => {
    const [copied, setcopied] = useState(false);


    const shareurl: any = [
        `Name : ${selectedUser?.name ?? '---'} `,
        `Mobile : ${selectedUser?.mobile ?? '---'} `,
        `Business Name : ${selectedUser?.business_name ?? '---'} `,
        `Business Belongs : ${selectedUser?.bussiness_belongs ?? '---'} `,
        `Meta Ad Run Before: ${selectedUser?.metaad_run_before ?? '---'} `,
        `Monthly Ad Budget: ${selectedUser?.monthly_ad_budget ?? '---'} `,
        `Package Interested: ${selectedUser?.package_interested ?? '---'} `,
        `Planning To Start: ${selectedUser?.planning_to_start ?? '---'} `,
        `Primary Goal Metads: ${selectedUser?.primary_goal_metads ?? '---'} `,
        `Registered Date : ${dayjs(selectedUser?.registered_date).format("YYYY-MMM-DD") ?? '---'}`,
        `Registered Time: ${selectedUser?.registered_time ?? '---'}`,
        `IP Address: ${selectedUser?.ip_address ?? '---'} `,
        `UTM Source: ${selectedUser?.utm_source ?? '---'} `,

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
                Invictus Lead User
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
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Business Name</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Business Belongs</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Meta Ad Run Before</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Monthly Ad Budget</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Package Interested</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Planning To Start</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Primary Goal Metads</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Registered Date</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>Registered Time</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>IP Address</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>UTM Source</Typography>
                </Stack>
                <Stack flexDirection={"column"} width={"100%"}>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.name ? selectedUser?.name : "---"}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.mobile ? selectedUser?.mobile : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.business_name ? selectedUser?.business_name : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.bussiness_belongs ? selectedUser?.bussiness_belongs : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.metaad_run_before ? selectedUser?.metaad_run_before : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.monthly_ad_budget ? selectedUser?.monthly_ad_budget : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.package_interested ? selectedUser?.package_interested : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.planning_to_start ? selectedUser?.planning_to_start : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.primary_goal_metads ? selectedUser?.primary_goal_metads : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_date ? dayjs(selectedUser?.registered_date).format("YYYY-MMMM-DD") : '---'}</Typography>
                    <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.registered_time ? `${selectedUser?.registered_time}` : '---'}</Typography>
                      <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.ip_address ? selectedUser?.ip_address : '---'}</Typography>
                        <Typography sx={{ fontWeight: "600", marginBottom: "10px", fontSize: "15px", height: "35px" }}>: {selectedUser?.utm_source ? selectedUser?.utm_source : '---'}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default InvictusMetaView;