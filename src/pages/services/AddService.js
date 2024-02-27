import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

// project import
import { useAddServiceMutation } from 'store/reducers/services';

const AddService = () => {
  const navigate = useNavigate();
  const [service, setService] = useState({});
  const [addService, addResponse] = useAddServiceMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addService(service);
    if (addResponse.error) {
      console.log(addResponse.error.data.message);
    } else navigate('/services');
  };
  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Добавить
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <TextField
            required
            label="Название сервиса"
            variant="outlined"
            fullWidth
            margin="normal"
            value={service?.title || ''}
            onChange={(e) => setService({ ...service, title: e.target.value })}
          />
          <TextField
            required
            label="О сервисе"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={service?.description || ''}
            onChange={(e) => setService({ ...service, description: e.target.value })}
          />

          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={addResponse.isLoading}>
              Добавить сервис
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default AddService;
