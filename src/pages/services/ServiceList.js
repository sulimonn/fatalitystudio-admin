import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

// project import
import { setTitle } from 'utils/titleHelper';
import { useDeleteServiceMutation, useFetchServicesQuery } from 'store/reducers/services';

const ServiceList = () => {
  useEffect(() => {
    setTitle('Сервисы');
  }, []);
  const [deleteService, deleteResponse] = useDeleteServiceMutation();

  const handleDelete = async (id) => {
    await deleteService(id);
    if (deleteResponse.error) {
      console.log(deleteResponse.error.data.message);
    }
  };

  const { data: services = [] } = useFetchServicesQuery();

  return (
    <Box>
      <Box my={4}>
        <Typography variant="h4">Сервисы</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button component={Link} to="/services/new" variant="contained" color="primary">
          Добавить сервис
        </Button>
      </Box>
      <List sx={{ width: '100%' }}>
        {services.map((service) => (
          <ListItem
            key={service.id}
            sx={{
              backgroundColor: 'background.paper',
              p: 1,
              m: 1,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <ListItemText primary={service.title} secondary={service.description} />
            </Box>
            <Box>
              <Button variant="outlined" color="primary" component={Link} to={`/services/${service.id}`}>
                Редактировать
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(service.id)}>
                Удалить
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ServiceList;
