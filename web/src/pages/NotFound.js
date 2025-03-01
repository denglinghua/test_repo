import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="80vh"
            >
                <Typography variant="h4" gutterBottom>
                    404 - Page Not Found
                </Typography>
                <Typography variant="body1">
                    The page you are looking for does not exist.
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFound;