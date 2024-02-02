import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const PortfolioBase = ({ type, title }) => {
  return (
    <Box>
      <Box>
        <Typography>{title}</Typography>
      </Box>
      <Grid container></Grid>
    </Box>
  );
};

export default PortfolioBase;
