import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

// material-ui
import {
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Divider,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText
} from '@mui/material';

// project import
import InputFileUpload from 'components/@extended/InputFile';
import { useAddArticleMutation, useDeleteArticleMutation, useUpdateArticleMutation } from 'store/reducers/blogApi';
import { useGetTeamQuery } from 'store/reducers/team';

const ArticleForm = ({ id, data }) => {
  const navigate = useNavigate();
  const [addArticle, addRes] = useAddArticleMutation();
  const [deleteArticle, deleteRes] = useDeleteArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const [errors, setErrors] = useState({});

  const [article, setArticle] = useState({});
  const [coverPreview, setCoverPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { data: authors = [] } = useGetTeamQuery();

  useEffect(() => {
    if (data) {
      setArticle(data);
      setCoverPreview(data.cover);
      setPhotoPreview(data.photo);
    }
  }, [data]);

  const setCover = (file) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      cover: file
    }));
  };

  const setPhoto = (file) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      photo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(article).forEach(([key, value]) => {
        if (id) {
          if (article[key] !== data[key])
            if (value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
        } else {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });
      if (id) {
        try {
          const response = await updateArticle({ formData, id });
          console.log(response);
          if (!response.error) {
            navigate('/blog');
          } else {
            console.log(response.error);
            setErrors(response.error.data);

            throw new Error(response.error.data);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        await addArticle(formData);

        if (!addRes.isError) {
          navigate('/blog');
        } else alert('Error adding article');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      await deleteArticle(id);
      console.log(deleteRes);
      if (!deleteRes.isError) {
        navigate('/blog');
        console.log(deleteRes);
      } else alert('Error deleting article');
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: null
    });
  };

  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {!id ? 'Добавить статью' : 'Изменить статью'}
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {((id && coverPreview) || coverPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 250, maxHeight: 250, overflow: 'hidden' }}>
                <img src={coverPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} setFile={setCover}>
                Загрузить обложку
              </InputFileUpload>
            </Box>
          </Box>
          <TextField
            name="title"
            required
            id="title"
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title || ''}
            onChange={handleChange}
            error={Boolean(errors?.title)}
          />
          {errors?.title && (
            <FormHelperText error id="standard-weight-helper-text-title">
              {errors?.title}
            </FormHelperText>
          )}
          <TextField
            name="introduction"
            required
            label="Предисловие"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.introduction || ''}
            onChange={handleChange}
            error={Boolean(errors?.introduction)}
          />
          {errors?.introduction && (
            <FormHelperText error id="standard-weight-helper-text-introduction">
              {errors?.introduction}
            </FormHelperText>
          )}
          <TextField
            name="content"
            required
            label="Текст"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.content || ''}
            onChange={handleChange}
            error={Boolean(errors?.content)}
          />

          {errors?.content && (
            <FormHelperText sx={{ mb: 1 }} error id="standard-weight-helper-text-content">
              {errors?.content}
            </FormHelperText>
          )}
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {((id && photoPreview) || photoPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 250, maxHeight: 250, overflow: 'hidden' }}>
                <img src={photoPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setPhotoPreview} setFile={setPhoto}>
                Загрузить фото
              </InputFileUpload>
            </Box>
          </Box>

          {errors?.photo && (
            <FormHelperText error id="standard-weight-helper-text-photo">
              {errors?.photo}
            </FormHelperText>
          )}
          <Divider
            sx={{
              mt: 1,
              color: 'text.secondary',
              '&:before': { borderColor: 'text.secondary' },
              '&:after': { borderColor: 'text.secondary' }
            }}
          >
            Section 1
          </Divider>
          <TextField
            name="title_sec1"
            id="title_sec1"
            label="Заголовок для секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title_sec1 || ''}
            onChange={handleChange}
            required
            error={Boolean(errors?.title_sec1)}
          />
          {errors?.title_sec1 && (
            <FormHelperText error id="standard-weight-helper-text-title_sec1">
              {errors?.title_sec1}
            </FormHelperText>
          )}
          <TextField
            id="content_sec1"
            name="content_sec1"
            label="Текст"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.content_sec1}
            onChange={handleChange}
            required
            error={Boolean(errors?.content_sec1)}
          />

          {errors?.content_sec1 && (
            <FormHelperText error id="standard-weight-helper-text-content_sec1">
              {errors?.content_sec1}
            </FormHelperText>
          )}
          <TextField
            id="middle_sec_text"
            label="Текст между секциями"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.middle_sec_text}
            onChange={handleChange}
            required
            error={Boolean(errors?.middle_sec_text)}
          />

          {errors?.middle_sec_text && (
            <FormHelperText error id="standard-weight-helper-text-middle_sec_text">
              {errors?.middle_sec_text}
            </FormHelperText>
          )}
          <Divider
            sx={{
              mt: 1,
              color: 'text.secondary',
              '&:before': { borderColor: 'text.secondary' },
              '&:after': { borderColor: 'text.secondary' }
            }}
          >
            Section 2
          </Divider>
          <TextField
            id="title_sec2"
            name="title_sec2"
            label="Заголовок для секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title_sec2 || ''}
            onChange={handleChange}
            required
            error={Boolean(errors?.title_sec2)}
          />

          {errors?.title_sec2 && (
            <FormHelperText error id="standard-weight-helper-text-title_sec2">
              {errors?.title_sec2}
            </FormHelperText>
          )}
          <TextField
            label="Текст"
            name="content_sec2"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.content_sec2}
            onChange={handleChange}
            required
            error={Boolean(errors?.content_sec2)}
          />

          {errors?.content_sec2 && (
            <FormHelperText error id="standard-weight-helper-text-content_sec2">
              {errors?.content_sec2}
            </FormHelperText>
          )}
          <Divider
            sx={{
              my: 1,
              color: 'text.secondary',
              borderColor: 'text.secondary'
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} error={Boolean(errors?.author)}>
            <InputLabel required id="demo-simple-select-helper-label">
              Автор
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="author"
              label="Автор"
              value={article.author || ''}
              onChange={handleChange}
              required
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.first_name && author.last_name ? author.first_name + ' ' + author.last_name : author.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {errors?.author && (
            <FormHelperText error id="standard-weight-helper-text-author">
              {errors?.author}
            </FormHelperText>
          )}
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained" disabled={addRes.isLoading}>
              {!id ? 'Добавить статью' : 'Сохранить'}
            </Button>
            {id && (
              <>
                <Button sx={{ mx: 1 }} color="error" onClick={() => handleDelete(article.id)} variant="contained">
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

ArticleForm.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object
};

export default ArticleForm;
