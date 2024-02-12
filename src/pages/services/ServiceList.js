import React, { useEffect } from 'react';

// material-ui
import { Box, List, ListItem, ListItemText } from '@mui/material';

// project import
import { setTitle } from 'utils/titleHelper';
import { useSelector } from 'react-redux';

const ServiceList = () => {
  useEffect(() => {
    setTitle('Сервисы');
  });

  const services = useSelector((state) => state.services.services);

  return (
    <Box>
      <List sx={{ width: 'fit-content' }}>
        {services.map((service) => (
          <ListItem key={service.id} sx={{ backgroundColor: 'background.paper' }}>
            <ListItemText primary={service.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceList;
