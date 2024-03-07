import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { TextField, Button, Grid, Paper, Typography, FormHelperText, Box } from '@mui/material';
import { useAddReviewMutation } from 'store/reducers/reviews';
import convertToFormData from 'utils/convertToFormData';
import InputFileUpload from 'components/@extended/InputFile';

// project import

const AddFeedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({});
  const [errors, setErrors] = useState();

  const [photoPrevivew, setPhotoPrevivew] = useState();

  const [addFeedback, { isLoading }] = useAddReviewMutation();

  const handleChange = (e) => {
    if (e?.target) {
      const { name, value } = e.target;
      setFeedback((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = convertToFormData(feedback);
    const response = await addFeedback(formData);
    if (response.error) {
      setErrors(response.error.data);
    } else {
      navigate('/feedback');
    }
  };
  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Добавить отзыв
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <TextField
            name="title"
            required
            id="title"
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={feedback.title || ''}
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
            id="description"
            label="Текст отзыва"
            variant="outlined"
            fullWidth
            margin="normal"
            value={feedback.description || ''}
            onChange={handleChange}
            error={Boolean(errors?.description)}
          />
          {errors?.description && (
            <FormHelperText error id="standard-weight-helper-text-description">
              {errors?.description}
            </FormHelperText>
          )}
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {photoPrevivew && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 250, maxHeight: 250, overflow: 'hidden' }}>
                <img src={photoPrevivew} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setPhotoPrevivew} setFile={handleChange} required name="photo">
                Загрузить фото
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.photo && (
            <FormHelperText error id="standard-weight-helper-text-photo">
              {errors?.photo}
            </FormHelperText>
          )}
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={isLoading}>
              Добавить
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default AddFeedback;
