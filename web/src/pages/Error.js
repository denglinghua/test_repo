import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Error = () => {
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
                    Oops!
                </Typography>
                <Typography variant="body1" mb={2}>
                    Some error occurred. Please try again later.
                </Typography>
                <a href="/">Go back to Home</a>
            </Box>
        </Container>
    );
};

export default Error;