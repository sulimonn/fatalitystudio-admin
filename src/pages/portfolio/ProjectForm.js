import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SliderPicker } from 'react-color';

// redux
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';

// material-ui
import { TextField, Button, Grid, Paper, Typography, InputLabel, MenuItem, FormControl, Select, Box, FormHelperText } from '@mui/material';

// project import
import {
  useAddPortfolioBigPhotosMutation,
  useAddPortfolioMutation,
  useAddPortfolioSmallPhotosMutation,
  useDeletePortfolioMutation,
  useEditPortfolioMutation
} from 'store/reducers/portfolio';
import { useCurrentPath } from 'hooks/use-navigate';
import { useFetchServicesQuery } from 'store/reducers/services';
import InputFileUpload from 'components/@extended/InputFile';
import MySwiper from 'components/MySwiper';
import convertToFormData from 'utils/convertToFormData';
import getChangedFields from 'utils/getChangedData';

const ProjectForm = ({ id, response = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPath } = useCurrentPath();
  const services = useFetchServicesQuery().data || [];

  const [updateProject, { isLoading: isUpdating }] = useEditPortfolioMutation();
  const [addProject, { isLoading: isAdding }] = useAddPortfolioMutation();
  const [addBigPhoto, { isLoading: isLoadingBig }] = useAddPortfolioBigPhotosMutation();
  const [addSmallPhoto, { isLoading: isLoadingSmall }] = useAddPortfolioSmallPhotosMutation();
  const [deleteProject, deleteResponse] = useDeletePortfolioMutation();

  const [errors, setErrors] = useState();
  const [smallErrors, setSmallErrors] = useState();
  const [bigErrors, setBigErrors] = useState();

  const [project, setProject] = useState(response.data);
  const [bigPhotos, setBigPhotos] = useState([]);
  const [smallPhotos, setSmallPhotos] = useState([]);

  const [coverPreview, setCoverPreview] = useState(project?.cover);
  const [background1Preview, setBackground1Preview] = useState(project?.background_1);
  const [background2Preview, setBackground2Preview] = useState(project?.background_2);
  const [bigPhotosPreview, setBigPhotosPreview] = useState([]);
  const [smallPhotosPreview, setSmallPhotosPreview] = useState([]);

  useEffect(() => {
    if (response.data) {
      setProject(() => response.data);
      setBigPhotos(response.data.big_photos.map((photo) => JSON.parse(photo)));
      setSmallPhotos(response.data.small_photos.map((photo) => JSON.parse(photo)));
      setCoverPreview(response.data.cover);
      setBackground1Preview(response.data.background_1);
      setBackground2Preview(response.data.background_2);
      setBigPhotosPreview(response.data.big_photos.map((photo) => JSON.parse(photo).upload));
      setSmallPhotosPreview(response.data.small_photos.map((photo) => JSON.parse(photo).upload));
    }
  }, [response]);

  const handlePhotosChange = (e) => {
    const { name, files } = e.target;
    if (name === 'small_photos') {
      return setSmallPhotos(
        Array.from(files).map((file) => {
          return { title: 'Описание', upload: file };
        })
      );
    }
    setBigPhotos(Array.from(files));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProject({
      ...project,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: null
    });
  };
  const handleColorChange = (color) => {
    setProject({ ...project, color: color.hex });
    setErrors({ ...errors, color: null });
  };

  const handleSubmitPhotos = async (id) => {
    let isError = false;
    if (!response.data) {
      smallPhotos.map(async (photo, index) => {
        console.log(photo);
        const upload = convertToFormData({ upload: photo.upload, project_id: id, title: photo.title });
        const resp = await addSmallPhoto(upload);
        if (resp.error) {
          isError = true;
          setSmallErrors((prev) => ({ ...prev, [index]: resp.error.data }));
        }
      });

      bigPhotos.map(async (photo, index) => {
        const upload = convertToFormData({ upload: photo, project_id: id });
        const resp = await addBigPhoto(upload);
        if (resp.error) {
          isError = true;
          setBigErrors((prev) => ({ ...prev, [index]: resp.error.data }));
        }
      });
      if (!isError) {
        dispatch(openSnackbar('Успешно сохранено', 'success'));
        navigate(currentPath);
      }
    } else {
      console.log(currentPath);
      dispatch(openSnackbar('Изменения сохранены', 'success'));
      navigate(currentPath);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      const formData = convertToFormData(project);
      const { data, ...response } = await addProject(formData);
      if (!response.error) {
        await handleSubmitPhotos(data.id);
      } else {
        setErrors(response?.error.data);
      }
    } else {
      let newProj = getChangedFields(response.data, project);
      delete newProj.id;
      const formData = convertToFormData(newProj);
      const update = await updateProject({ id, project: formData });
      if (!update.error) {
        await handleSubmitPhotos(id);
      } else {
        setErrors(update.error.data);
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
            name="title"
            required
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={project?.title || ''}
            onChange={handleChange}
            error={Boolean(errors?.title)}
          />

          {errors?.title && (
            <FormHelperText error id="standard-weight-helper-text-title">
              {errors?.title}
            </FormHelperText>
          )}
          <TextField
            name="description"
            required
            label="Краткое описание"
            variant="outlined"
            fullWidth
            margin="normal"
            value={project?.description || ''}
            onChange={handleChange}
            error={Boolean(errors?.description)}
          />

          {errors?.description && (
            <FormHelperText error id="standard-weight-helper-text-description">
              {errors?.description}
            </FormHelperText>
          )}
          <TextField
            name="about"
            required
            label="О проекте"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.about || ''}
            onChange={handleChange}
            error={Boolean(errors?.about)}
          />

          {errors?.about && (
            <FormHelperText error id="standard-weight-helper-text-about">
              {errors?.about}
            </FormHelperText>
          )}
          <TextField
            name="about_content"
            required
            label="О содержании проекта"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.about_content || ''}
            onChange={handleChange}
            error={Boolean(errors?.about_content)}
          />

          {errors?.about_content && (
            <FormHelperText error id="standard-weight-helper-text-about_content">
              {errors?.about_content}
            </FormHelperText>
          )}
          <TextField
            name="solution"
            required
            label="Решение"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={project?.solution || ''}
            onChange={handleChange}
            error={Boolean(errors?.solution)}
          />

          {errors?.solution && (
            <FormHelperText error id="standard-weight-helper-text-solution">
              {errors?.solution}
            </FormHelperText>
          )}
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
                placeholder="#000000"
                value={project?.color || ''}
                onChange={handleChange}
                required
                error={Boolean(errors?.color)}
              />

              {errors?.color && (
                <FormHelperText error id="standard-weight-helper-text-color">
                  {errors?.color}
                </FormHelperText>
              )}
            </Box>
          </FormControl>
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {coverPreview && (
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
                <img src={coverPreview} alt="img" loading="lazy" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} setFile={handleChange} name="cover" required={!coverPreview}>
                Загрузить обложку
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.cover && (
            <FormHelperText error id="standard-weight-helper-text-cover">
              {errors?.cover}
            </FormHelperText>
          )}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}
          >
            {background1Preview && (
              <Box
                cols={1}
                borderRadius={2}
                sx={{
                  maxWidth: 250,
                  height: { xs: '200px', sm: '300px' },
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img src={background1Preview} alt="img" loading="lazy" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setBackground1Preview} setFile={handleChange} name="background_1" required={!background1Preview}>
                Загрузить фон 1
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.background_1 && (
            <FormHelperText error id="standard-weight-helper-text-background_1">
              {errors?.background_1}
            </FormHelperText>
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}
          >
            {background2Preview && (
              <Box
                cols={1}
                borderRadius={2}
                sx={{
                  maxWidth: 250,
                  height: { xs: '200px', sm: '300px' },
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img src={background2Preview} alt="img" loading="lazy" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setBackground2Preview} setFile={handleChange} name="background_2" required={!background2Preview}>
                Загрузить фон 2
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.background_2 && (
            <FormHelperText error id="standard-weight-helper-text-background_2">
              {errors?.background_2}
            </FormHelperText>
          )}
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: 'column', mt: 2 }}>
            {!!bigPhotosPreview.length && (
              <MySwiper
                photosPreviews={bigPhotosPreview}
                setPhotos={setBigPhotos}
                photos={bigPhotos}
                errors={bigErrors}
                setErrors={setBigErrors}
              />
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setBigPhotosPreview} setFile={handlePhotosChange} name="big_photos" multiple>
                Загрузить большие фото
              </InputFileUpload>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: 'column', mt: 2 }}>
            {!!smallPhotosPreview.length && (
              <MySwiper
                photosPreviews={smallPhotosPreview}
                setPhotos={setSmallPhotos}
                photos={smallPhotos}
                description
                errors={smallErrors}
                setErrors={setSmallErrors}
              />
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setSmallPhotosPreview} setFile={handlePhotosChange} name="small_photos" multiple>
                Загрузить дополнительные фото
              </InputFileUpload>
            </Box>
          </Box>
          <FormControl sx={{ my: 2, mx: { xs: 'auto', sm: 0 }, minWidth: 120 }} error={Boolean(errors?.service_id)}>
            <InputLabel id="service_id_label">Сервис</InputLabel>
            <Select
              name="service_id"
              required
              labelId="service_id_label"
              id="service_id"
              value={project?.service_id || ''}
              onChange={handleChange}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors?.service_id && (
            <FormHelperText error id="standard-weight-helper-text-service_id">
              {errors?.service_id}
            </FormHelperText>
          )}
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={isAdding || isUpdating || isLoadingBig || isLoadingSmall}>
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
