/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Typography, Box, Button, Divider } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import dayjs from 'dayjs';

interface viewProps {
    selectedUser: any;
}

const InvictusMetaView = ({ selectedUser }: viewProps) => {
    const [copied, setcopied] = useState(false);

    const details = [
        { label: 'Name', value: selectedUser?.name },
        { label: 'Mobile', value: selectedUser?.mobile },
        { label: 'Business Name', value: selectedUser?.business_name },
        { label: 'Business Category', value: selectedUser?.bussiness_belongs },
        { label: 'Meta Ads Before', value: selectedUser?.metaad_run_before },
        { label: 'Monthly Budget', value: selectedUser?.monthly_ad_budget },
        { label: 'Package Interested', value: selectedUser?.package_interested },
        { label: 'Start Plan', value: selectedUser?.planning_to_start },
        { label: 'Primary Goal', value: selectedUser?.primary_goal_metads },
        { label: 'Registered Date', value: selectedUser?.registered_date ? dayjs(selectedUser.registered_date).format("DD MMM YYYY") : null },
        { label: 'Registered Time', value: selectedUser?.registered_time },
        { label: 'IP Address', value: selectedUser?.ip_address },
        { label: 'UTM Source', value: selectedUser?.utm_source },
    ];

    const handleCopy = async () => {
        const textToCopy = details
            .filter(d => d.value)
            .map(d => `${d.label}: ${d.value}`)
            .join('\n');
        try {
            await navigator.clipboard.writeText(textToCopy);
            setcopied(true);
            setTimeout(() => setcopied(false), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 4, width: { xs: '100%', sm: 400, md: 450 } }}>
            <Typography variant="h5" mb={4} sx={{ fontWeight: 700, color: 'text.primary' }}>
                Invictus Meta User
            </Typography>

            <Stack direction="column" spacing={3} mb={4} alignItems="flex-start">
                {details.map((detail, index) => (
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
                onClick={handleCopy}
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
    );
};

export default InvictusMetaView;