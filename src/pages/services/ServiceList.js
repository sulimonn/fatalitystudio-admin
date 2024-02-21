import React, { useEffect } from 'react';

// material-ui
import { Box, List, ListItem, ListItemText } from '@mui/material';

// project import
import { setTitle } from 'utils/titleHelper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from 'store/reducers/services';

const ServiceList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
    setTitle('Сервисы');
  }, [dispatch]);

  const services = useSelector((state) => state.services.services);

  return (
    <Box>
      <List sx={{ width: 'fit-content' }}>
        {services.map((service) => (
          <ListItem key={service.id} sx={{ backgroundColor: 'background.paper', p: 1, m: 1, borderRadius: 2 }}>
            <ListItemText primary={service.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceList;
