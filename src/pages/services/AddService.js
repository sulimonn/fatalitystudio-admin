import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { TextField, Button, Grid, Paper, Typography, Box, Divider, FormHelperText } from '@mui/material';

// project import
import { useAddProcessMutation, useAddServiceMutation, useEditProcessMutation, useEditServiceMutation } from 'store/reducers/services';
import InputFileUpload from 'components/@extended/InputFile';
import getChangedData from 'utils/getChangedData';
import convertToFormData from 'utils/convertToFormData';

const AddService = ({ response }) => {
  const navigate = useNavigate();
  const [service, setService] = useState(response || {});
  const [processes, setProcesses] = useState([{ title: '', content: '', index_number: 0, service: service.id }]);
  const [photoPresentPreview, setPhotoPresentPreview] = useState(null);
  const [errors, setErrors] = useState();
  const [processErrors, setProcessErrors] = useState([]);

  useEffect(() => {
    if (response) {
      setService(() => response);
      setProcesses(response.processes.map((process) => (process.title = process.name) && process));
      setPhotoPresentPreview(response.photo_present_project);
    }
  }, [response]);

  const [addService, { isLoading }] = useAddServiceMutation();
  const [updateService, { isLoading: isLoadingUpdate }] = useEditServiceMutation();
  const [updateProcess] = useEditProcessMutation();
  const [addProcess] = useAddProcessMutation();

  const handleProcess = async (id) => {
    const finalProcesses = processes.filter((process) => !!process.content || !!process.title);
    finalProcesses.forEach(async (process, index) => {
      process.service = id;
      if (process.id) {
        delete process.name;
        const processResponse = await updateProcess(process);
        if (processResponse.error) {
          setProcessErrors((prev) => ({ ...prev, [index]: processResponse.error.data }));
        }
      } else {
        const processResponse = await addProcess(process);
        if (processResponse.error) {
          setProcessErrors((prev) => ({ ...prev, [index]: processResponse.error.data }));
        }
      }
    });
    console.log(processErrors);

    if (!processErrors.length) navigate('/services');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (response) {
      const changedFields = getChangedData(response, service);
      delete changedFields.processes;
      delete changedFields.id;
      const formData = convertToFormData(changedFields);
      const updateResponse = await updateService({ formData, id: response.id });
      if (updateResponse.error) {
        setErrors(updateResponse.error.data);
      } else {
        await handleProcess(service.id);
      }
    } else {
      const formData = convertToFormData(service);
      const addResponse = await addService(formData);
      if (addResponse.error) {
        setErrors(addResponse.error.data);
      } else {
        await handleProcess(addResponse.id);
      }
    }
  };
  const addNewProcess = () => {
    if (processes.find((process) => process.title === '' && process.content === '')) return;
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
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setService({
      ...service,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: null
    });
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
            name="title"
            value={service?.title || ''}
            onChange={handleChange}
            error={Boolean(errors?.title)}
          />

          {errors?.title && (
            <FormHelperText error id="standard-weight-helper-text-title">
              {errors?.title}
            </FormHelperText>
          )}
          <TextField
            required
            label="О сервисе"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            name="description"
            value={service?.description || ''}
            onChange={handleChange}
            error={Boolean(errors?.description)}
          />

          {errors?.description && (
            <FormHelperText error id="standard-weight-helper-text-description">
              {errors?.description}
            </FormHelperText>
          )}
          <TextField
            required
            label="Цели и задачи"
            variant="outlined"
            fullWidth
            margin="normal"
            name="goals_objectives_text"
            value={service?.goals_objectives_text || ''}
            onChange={handleChange}
            error={Boolean(errors?.goals_objectives_text)}
          />

          {errors?.goals_objectives_text && (
            <FormHelperText error id="standard-weight-helper-text-goals_objectives_text">
              {errors?.goals_objectives_text}
            </FormHelperText>
          )}
          <TextField
            required
            label="Заголовок секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title_sec1"
            value={service?.title_sec1 || ''}
            onChange={handleChange}
            error={Boolean(errors?.title_sec1)}
          />

          {errors?.title_sec1 && (
            <FormHelperText error id="standard-weight-helper-text-title_sec1">
              {errors?.title_sec1}
            </FormHelperText>
          )}
          <TextField
            required
            label="Содержание секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            name="content_sec1"
            value={service?.content_sec1 || ''}
            onChange={handleChange}
            error={Boolean(errors?.content_sec1)}
          />

          {errors?.content_sec1 && (
            <FormHelperText error id="standard-weight-helper-text-content_sec1">
              {errors?.content_sec1}
            </FormHelperText>
          )}
          <TextField
            required
            label="Заголовок секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title_sec2"
            value={service?.title_sec2 || ''}
            onChange={handleChange}
            error={Boolean(errors?.title_sec2)}
          />

          {errors?.title_sec2 && (
            <FormHelperText error id="standard-weight-helper-text-title_sec2">
              {errors?.title_sec2}
            </FormHelperText>
          )}
          <TextField
            required
            label="Содержание секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            name="content_sec2"
            value={service?.content_sec2 || ''}
            onChange={handleChange}
            error={Boolean(errors?.content_sec2)}
          />

          {errors?.content_sec2 && (
            <FormHelperText error id="standard-weight-helper-text-content_sec2">
              {errors?.content_sec2}
            </FormHelperText>
          )}
          <Typography variant="h5" sx={{ mt: 3 }}>
            Процессы
          </Typography>

          <TextField
            required
            label="Заголовок процесса"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title_process"
            value={service?.title_process || ''}
            onChange={handleChange}
            error={Boolean(errors?.title_process)}
          />

          {errors?.title_process && (
            <FormHelperText error id="standard-weight-helper-text-title_process">
              {errors?.title_process}
            </FormHelperText>
          )}
          {processes.map((process, index) => {
            return (
              <Box key={index}>
                <Divider sx={{ my: 1, borderColor: 'grey.500', color: 'grey.500' }}>{index + 1}</Divider>
                <TextField
                  required={!!(process.title || process.content)}
                  label={`Заголовок процесса ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={process.title}
                  name="title"
                  onChange={(e) => handleProcessChange(index, e)}
                />

                {processErrors[index]?.title && (
                  <FormHelperText error id="standard-weight-helper-text-title">
                    {processErrors[index]?.title}
                  </FormHelperText>
                )}
                <TextField
                  required={!!(process.title || process.content)}
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

                {processErrors[index]?.content && (
                  <FormHelperText error id="standard-weight-helper-text-content">
                    {processErrors[index]?.content}
                  </FormHelperText>
                )}
                {processErrors[index]?.detail && (
                  <FormHelperText error id="standard-weight-helper-text-detail">
                    {processErrors[index]?.detail}
                  </FormHelperText>
                )}
              </Box>
            );
          })}
          <Button onClick={addNewProcess}>Добавить процесс</Button>

          <Divider sx={{ my: 3, borderColor: 'grey.500' }} />

          <TextField
            required
            label="Заголовок презентации проекта"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            name="title_present_project"
            value={service?.title_present_project || ''}
            onChange={handleChange}
            error={Boolean(errors?.title_present_project)}
          />

          {errors?.title_present_project && (
            <FormHelperText error id="standard-weight-helper-text-title_present_project">
              {errors?.title_present_project}
            </FormHelperText>
          )}
          <TextField
            required
            label="Содержание презентации проекта"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            name="mini_text"
            value={service?.mini_text || ''}
            onChange={handleChange}
            error={Boolean(errors?.mini_text)}
          />

          {errors?.mini_text && (
            <FormHelperText error id="standard-weight-helper-text-mini_text">
              {errors?.mini_text}
            </FormHelperText>
          )}

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: 'column' }}>
            {photoPresentPreview && (
              <Box
                cols={1}
                borderRadius={2}
                sx={{
                  width: '100%',
                  height: { xs: '200px', sm: '300px' },
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img src={photoPresentPreview} alt="img" loading="lazy" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload
                setPreview={setPhotoPresentPreview}
                setFile={handleChange}
                name="photo_present_project"
                required={!photoPresentPreview}
              >
                Добавить фото презентации
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.photo_present_project && (
            <FormHelperText error id="standard-weight-helper-text-photo_present_project">
              {errors?.photo_present_project}
            </FormHelperText>
          )}
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }} mt={3}>
            <Button color="primary" type="submit" variant="contained" disabled={isLoading || isLoadingUpdate} size="large">
              Добавить услугу
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
