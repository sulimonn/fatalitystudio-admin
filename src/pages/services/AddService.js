import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';

// project import
import { useAddProcessMutation, useAddServiceMutation, useEditProcessMutation, useEditServiceMutation } from 'store/reducers/services';

const AddService = ({ response }) => {
  const navigate = useNavigate();
  const [service, setService] = useState(
    response || {
      title: '',
      description: '',
      title_sec1: '',
      content_sec1: '',
      title_sec2: '',
      content_sec2: ''
    }
  );
  const [processes, setProcesses] = useState([{ title: '', content: '', index_number: 0, service: service.id }]);

  useEffect(() => {
    if (response) {
      setService(response);
      setProcesses(response.processes.map((process) => (process.title = process.name) && process));
    }
  }, [response]);

  const [addService, addResponse] = useAddServiceMutation();
  const [updateService] = useEditServiceMutation();
  const [updateProcess] = useEditProcessMutation();
  const [addProcess, addProcessResponse] = useAddProcessMutation();

  const handleProcess = async (id) => {
    const finalProcesses = processes.filter((process) => !!process.content || !!process.title);
    finalProcesses.forEach(async (process) => {
      if (response) {
        await updateProcess(process);
      } else {
        process.service = id;
        await addProcess(process);
      }

      console.log(addProcessResponse);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (response) {
      const updateResponse = await updateService(service);
      if (updateResponse.error && updateResponse.error) {
        console.log(updateResponse.error.data.message);
      } else {
        await handleProcess();
        if (addProcessResponse.tre) navigate('/services');
      }
    } else {
      const addResponse = await addService(service);
      if (addResponse.error && addResponse.error) {
        console.log(addResponse.error.data.message);
      } else {
        await handleProcess(addResponse.id);
        if (addProcessResponse.tre) navigate('/services');
      }
    }
  };
  const addNewProcess = () => {
    setProcesses([...processes, { title: '', content: '', index_number: 0, service: service.id }]);
  };

  const handleProcessChange = (index, e) => {
    const { name, value } = e.target;
    setProcesses((prevProcesses) => {
      const updatedProcesses = [...prevProcesses];
      updatedProcesses[index][name] = value;
      updatedProcesses[index].index_number = index + 1;
      updatedProcesses[index].service = service.id;
      return updatedProcesses;
    });
    const willAddProcess = processes.find((process) => !process.content && !process.title);
    if (!willAddProcess) addNewProcess();
  };

  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20 }}>
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
          <TextField
            required
            label="Заголовок секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={service?.title_sec1 || ''}
            onChange={(e) => setService({ ...service, title_sec1: e.target.value })}
          />
          <TextField
            required
            label="Содержание секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={service?.content_sec1 || ''}
            onChange={(e) => setService({ ...service, content_sec1: e.target.value })}
          />
          <TextField
            required
            label="Заголовок секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            value={service?.title_sec2 || ''}
            onChange={(e) => setService({ ...service, title_sec2: e.target.value })}
          />
          <TextField
            required
            label="Содержание секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={service?.content_sec2 || ''}
            onChange={(e) => setService({ ...service, content_sec2: e.target.value })}
          />
          <Typography variant="h5" sx={{ mt: 3 }}>
            Процессы
          </Typography>
          {processes.map((process, index) => {
            return (
              <Box key={index}>
                <TextField
                  label={`Заголовок процесса ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={process.title}
                  name="title"
                  onChange={(e) => handleProcessChange(index, e)}
                />
                <TextField
                  label={`Содержание процесса ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={2}
                  value={process.content}
                  name="content"
                  onChange={(e) => handleProcessChange(index, e)}
                />
              </Box>
            );
          })}
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

AddService.propTypes = {
  id: PropTypes.string,
  response: PropTypes.object
};

export default AddService;
