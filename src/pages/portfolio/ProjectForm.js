import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

// material-ui
import { TextField, Button, Grid, Paper, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material';

// project import
import { useAddPortfolioMutation, useDeletePortfolioMutation, useEditPortfolioMutation } from 'store/reducers/portfolio';
import { useCurrentPath } from 'hooks/use-navigate';
import { useFetchServicesQuery } from 'store/reducers/services';
import InputFileUpload from 'components/@extended/InputFile';
import MySwiper from 'components/MySwiper';
import renameFile from 'utils/renameFile';

const ProjectForm = ({ id, response = { big_photos: [], small_photos: [] } }) => {
  const navigate = useNavigate();
  const { currentPath } = useCurrentPath();
  const services = useFetchServicesQuery().data || [];

  const [coverPreview, setCoverPreview] = useState(response?.cover);

  const [updateProject, updateRes] = useEditPortfolioMutation();
  const [addProject, addRes] = useAddPortfolioMutation();
  const [deleteProject, deleteResponse] = useDeletePortfolioMutation();

  const [project, setProject] = useState(response);
  const [bigPhotos, setBigPhotos] = useState([]);
  const [smallPhotos, setSmallPhotos] = useState([]);
  const [bigPhotosPreview, setBigPhotosPreview] = useState([]);
  const [smallPhotosPreview, setSmallPhotosPreview] = useState([]);

  useEffect(() => {
    if (response.data) {
      setProject(response.data);
    }
  }, [response]);
  const handlePhotosChange = (e) => {
    const { name, files } = e.target;
    if (name === 'big_photos') {
      setBigPhotos(Array.from(files).map((file) => renameFile(file, 'Описание')));
    } else {
      setSmallPhotos(Array.from(files).map((file) => renameFile(file, 'Описание')));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProject({
      ...project,
      [name]: value
    });
  };
  const handleColorChange = (color) => {
    setProject({ ...project, color: color.hex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await addProject(project);
      if (!addRes.error) navigate(currentPath);
    } else {
      await updateProject({ id, project });
      if (!updateRes.error) {
        navigate(currentPath);
      }
    }
  };
  const handleDelete = async () => {
    if (id) {
      await deleteProject(project.id);
      if (deleteResponse.error) {
        console.log(deleteResponse.error.data.message);
      } else navigate(currentPath);
    }
  };
  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {!id ? 'Добавить проект' : 'Изменить проект'}
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <TextField
            required
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={project?.title || ''}
            onChange={handleChange}
          />
          <TextField
            required
            label="О проекте"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.about || ''}
            onChange={handleChange}
          />
          <TextField
            required
            label="Решение"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.solution || ''}
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, minWidth: 120, paddingTop: 3 }}>
            <InputLabel sx={{ marginTop: -2 }} id="color_label">
              Цвет
            </InputLabel>
            <Box display="flex" gap={2}>
              <Box sx={{ display: 'inline', minWidth: 200 }}>
                <SliderPicker
                  color={project?.color || ''}
                  onChangeComplete={handleColorChange}
                  disableAlpha={false}
                  style={{ marginTop: 10 }}
                />
              </Box>
              <TextField
                sx={{ display: 'inline' }}
                id="color"
                name="color"
                value={project?.color || '#'}
                onChange={handleChange}
                required
              />
            </Box>
          </FormControl>
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {((id && coverPreview) || coverPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 210, maxHeight: 210, overflow: 'hidden' }}>
                <img src={coverPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} setFile={handleChange} name="cover">
                Загрузить обложку
              </InputFileUpload>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}
          >
            {((id && coverPreview) || coverPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 210, maxHeight: 210, overflow: 'hidden' }}>
                <img src={coverPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} setFile={handleChange} name="background_1">
                Загрузить фон 1
              </InputFileUpload>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}
          >
            {((id && coverPreview) || coverPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 210, maxHeight: 210, overflow: 'hidden' }}>
                <img src={coverPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} setFile={handleChange} name="background_2">
                Загрузить фон 2
              </InputFileUpload>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: 'column', mt: 2 }}>
            {!!bigPhotosPreview.length && <MySwiper photosPreviews={bigPhotosPreview} setPhotos={setBigPhotos} photos={bigPhotos} />}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setBigPhotosPreview} setFile={handlePhotosChange} name="big_photos" multiple>
                Загрузить главные фото
              </InputFileUpload>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: 'column', mt: 2 }}>
            {!!smallPhotosPreview.length && (
              <MySwiper photosPreviews={smallPhotosPreview} setPhotos={setSmallPhotos} photos={smallPhotos} />
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setSmallPhotosPreview} setFile={handlePhotosChange} name="small_photos" multiple>
                Загрузить главные фото
              </InputFileUpload>
            </Box>
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="service_id_label">Сервис</InputLabel>
            <Select required labelId="service_id_label" id="service_id" value={project?.service_id || ''} onChange={handleChange}>
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={addRes.isLoading || updateRes.isLoading}>
              {!id ? 'Добавить проект' : 'Сохранить'}
            </Button>
            {id && (
              <>
                <Button sx={{ mx: 1 }} color="error" onClick={handleDelete} variant="contained">
                  Удалить
                </Button>
                <Button
                  color="secondary"
                  component={Link}
                  to={'https://fatalitystudio.netlify.app/blog/' + id}
                  target="_blank"
                  variant="contained"
                >
                  На сайте
                </Button>
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

ProjectForm.propTypes = {
  id: PropTypes.string,
  response: PropTypes.object
};

export default ProjectForm;
