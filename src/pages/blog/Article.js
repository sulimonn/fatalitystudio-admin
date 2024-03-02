import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// material-ui
import { TextField, Button, Grid, Paper, Box, Divider, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// project import
import InputFileUpload from 'components/@extended/InputFile';
import { useAddArticleMutation, useDeleteArticleMutation, useGetArticleQuery, useUpdateArticleMutation } from 'store/reducers/blogApi';
import { getUsers } from 'store/reducers/actions';

const Article = () => {
  const navigate = useNavigate();
  const { id } = useParams() || -1;
  const [addArticle, addRes] = useAddArticleMutation();
  const [deleteArticle, deleteRes] = useDeleteArticleMutation();
  const [updateArticle, updateRes] = useUpdateArticleMutation();
  const { data } = useGetArticleQuery(id);

  const [article, setArticle] = useState({});
  const [coverPreview, setCoverPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { data: authors = [] } = getUsers();

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
        if (article.id) await updateArticle({ formData, id });
        if (!updateRes.isError) {
          navigate('/blog');
        } else alert('Error updating article');
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
            required
            label="Заголовок"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title || ''}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
          <TextField
            required
            label="Предисловие"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.introduction || ''}
            onChange={(e) => setArticle({ ...article, introduction: e.target.value })}
          />
          <TextField
            required
            label="Текст"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={1}
            value={article.content}
            onChange={(e) => setArticle({ ...article, content: e.target.value })}
          />

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
            label="Заголовок для секции 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title_sec1 || ''}
            onChange={(e) => setArticle({ ...article, title_sec1: e.target.value })}
          />
          <TextField
            label="Текст"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.content_sec1}
            onChange={(e) => setArticle({ ...article, content_sec1: e.target.value })}
          />
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
            label="Заголовок для секции 2"
            variant="outlined"
            fullWidth
            margin="normal"
            value={article.title_sec2 || ''}
            onChange={(e) => setArticle({ ...article, title_sec2: e.target.value })}
          />
          <TextField
            label="Текст"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.content_sec2}
            onChange={(e) => setArticle({ ...article, content_sec2: e.target.value })}
          />
          <Divider
            sx={{
              my: 1,
              color: 'text.secondary',
              borderColor: 'text.secondary'
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Автор</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="author"
              label="Автор"
              value={article.author || 1}
              onChange={(e) => setArticle({ ...article, author: e.target.value })}
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default Article;
