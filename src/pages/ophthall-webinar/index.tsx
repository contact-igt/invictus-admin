import Stack from '@mui/material/Stack';
import OphthallWebinarSection from 'components/sections/ophthall-webinar';

const OphthallWebinar = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <OphthallWebinarSection />
        </Stack>
    );
};

export default OphthallWebinar;
