import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
            p={3}
            bgcolor="background.default"
        >
            <Stack spacing={3} alignItems="center">
                <Typography variant="h1" color="error" fontWeight="bold">
                    Oops!
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Unexpected Application Error!
                </Typography>
                <Box
                    p={2}
                    bgcolor="action.hover"
                    borderRadius={2}
                    border="1px solid"
                    borderColor="divider"
                    maxWidth="600px"
                    overflow="auto"
                >
                    <Typography variant="body2" component="pre" sx={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                        {errorMessage}
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Back to Dashboard
                </Button>
            </Stack>
        </Box>
    );
};

export default ErrorPage;
