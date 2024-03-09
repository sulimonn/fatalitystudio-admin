import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography } from '@mui/material';

const PageNotFound = () => {
  return (
    <Box
      backgroundColor="background.paper"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={9999}
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h6">
        Page Not Found.{' '}
        <Link to="/home" style={{ color: 'white' }}>
          Back to Home
        </Link>
      </Typography>
    </Box>
  );
};

export default PageNotFound;
