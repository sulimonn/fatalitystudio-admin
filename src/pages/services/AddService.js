import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { TextField, Button, Grid, Paper, Typography, Box, Divider } from '@mui/material';

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

  useEffect(() => {
    if (response) {
      setService(() => response);
      setService((prevService) => ({
        ...prevService,
        description:
          'Специализируемся на создании пользовательских мобильных приложений, обеспечивая надежность и высокую производительность для удовлетворения ваших потребностей.',
        goals_objectives_text: 'КАКИЕ ЦЕЛИ И ЗАДАЧИ БИЗНЕСА РЕШАЮТ МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ',
        title_sec1: 'Приложения: Ваш надежный помощник в цифровой эпохе',
        content_sec1:
          'Приложения стали неотъемлемой частью нашей повседневной жизни. Они предоставляют удобный и быстрый доступ к разнообразным сервисам и информации. От социальных сетей и мессенджеров до банковских приложений и онлайн-магазинов, приложения облегчают множество аспектов нашей жизни. Они позволяют нам общаться с друзьями, следить за новостями, управлять финансами, заказывать товары и услуги, играть в игры и многое другое. Приложения могут быть полезными для развлечения, обучения, работы и улучшения качества жизни.',
        title_sec2: 'Для кого подходит мобильное приложение?',
        content_sec2:
          'Приложения разрабатываются с учетом разнообразных потребностей пользователей. Они подходят для всех, начиная от частных лиц и заканчивая крупными корпорациями. В зависимости от целевой аудитории и задачи, приложения могут быть адаптированы под конкретные потребности. Мобильные приложения, например, предоставляют мобильность и доступность в любое время и в любом месте. Для бизнеса приложения могут служить инструментами для увеличения продаж, улучшения взаимодействия с клиентами и оптимизации рабочих процессов. В образовательных целях приложения могут обогатить процесс обучения и обеспечить доступ к знаниям. Коротко говоря, приложения - это универсальное средство, способное удовлетворить потребности широкого круга пользователей.',
        title_process: 'Процесс разработки приложения',
        mini_text:
          'В дополнение к разработке мобильных и веб-приложений, мы также специализируемся на создании удобных и мощных административных панелей. Наши административные панели - это инструменты, которые помогают управлять и контролировать ваши приложения и веб-сайты, обеспечивая вам полный контроль над контентом, данными и настройками.',
        title_present_project: 'Админ-панель приложения “Сытый горец”'
      }));
      setProcesses(response.processes.map((process) => (process.title = process.name) && process));
      setPhotoPresentPreview(response.photo_present);
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
      const changedFields = getChangedData(response, service);
      delete changedFields.processes;
      delete changedFields.id;
      console.log(changedFields);
      const formData = convertToFormData(changedFields);
      const updateResponse = await updateService({ formData, id: response.id });
      if (updateResponse.error && updateResponse.error) {
        console.log(updateResponse.error.data.message);
      } else {
        await handleProcess();
        if (!addProcessResponse.error) navigate('/services');
      }
    } else {
      const addResponse = await addService(service);
      if (addResponse.error && addResponse.error) {
        console.log(addResponse.error.data.message);
      } else {
        await handleProcess(addResponse.id);
        if (!addProcessResponse.error) navigate('/services');
      }
    }
  };
  const addNewProcess = () => {
    if (processes.length > 0 && processes[processes.length - 1].title === '' && processes[processes.length - 1].content === '') return;
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
          />
          <TextField
            required
            label="О сервисе"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            name="description"
            value={service?.description || ''}
            onChange={handleChange}
          />
          <TextField
            required
            label="Цели и задачи"
            variant="outlined"
            fullWidth
            margin="normal"
            name="goals_objectives_text"
            value={service?.goals_objectives_text || ''}
            onChange={handleChange}
          />
          <TextField
            required
            label="Заголовок секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title_sec1"
            value={service?.title_sec1 || ''}
            onChange={handleChange}
          />
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
          />
          <TextField
            required
            label="Заголовок секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title_sec2"
            value={service?.title_sec2 || ''}
            onChange={handleChange}
          />
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
          />
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
          />
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
          />
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
          />

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {photoPresentPreview && (
              <Box
                cols={1}
                borderRadius={2}
                sx={{
                  maxWidth: 150,
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
              <InputFileUpload setPreview={setPhotoPresentPreview} setFile={handleChange} name="photo_present_project" required>
                Добавить фото презентации
              </InputFileUpload>
            </Box>
          </Box>
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={addResponse.isLoading}>
              Добавить
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
