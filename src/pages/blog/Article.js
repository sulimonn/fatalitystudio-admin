import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box, Divider, Typography } from '@mui/material';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputFileUpload from 'components/@extended/InputFile';
import { removePost, updatePost } from 'store/reducers/blog';

const Article = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams() || undefined;
  const isNew = useLocation().pathname.endsWith('/new');

  const [article, setArticle] = useState(useSelector((state) => state.blog.posts.find((post) => post.id == id)) || {});
  console.log(article);
  const [cover, setCover] = useState(isNew ? {} : require('assets/images/blog/' + article.cover));
  const [coverPreview, setCoverPreview] = useState(isNew ? {} : require('assets/images/blog/' + article.cover));
  const [photo, setPhoto] = useState(isNew ? {} : require('assets/images/blog/' + article.head.src));
  const [photoPreview, setPhotoPreview] = useState(isNew ? {} : require('assets/images/blog/' + article.head.src));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(article));
    navigate('/blog');
    alert('Post updated successfully');
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      dispatch(removePost(id));
      navigate('/blog');
      alert('Post deleted successfully');
    }
  };

  return (
    <Grid item xs={10} sm={8} md={6}>
      <Paper elevation={3} style={{ padding: 20, bgImage: 'none' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          {isNew ? 'Добавить статью' : 'Изменить статью'}
        </Typography>
        <form onSubmit={handleSubmit} method="post">
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {(!isNew || coverPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 250, maxHeight: 250, overflow: 'hidden' }}>
                <img src={coverPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setCoverPreview} file={cover} setFile={setCover}>
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
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
          <TextField
            required
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={1}
            value={article.text}
            onChange={(e) => setArticle({ ...article, text: e.target.value })}
          />

          <Box display="flex" justifyContent="center" alignItems="center" gap="20px" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            {(!isNew || photoPreview) && (
              <Box cols={1} borderRadius={2} sx={{ maxWidth: 250, maxHeight: 250, overflow: 'hidden' }}>
                <img src={photoPreview} alt="img" loading="lazy" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setPhotoPreview} file={photo} setFile={setPhoto}>
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
            value={article.section1.title}
            onChange={(e) => setArticle({ ...article, section1: { ...article.section1, title: e.target.value } })}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.section1.text}
            onChange={(e) => setArticle({ ...article, section1: { ...section1, text: e.target.value } })}
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
            value={article.section2.title}
            onChange={(e) => setArticle({ ...article, section2: { ...article.section2, title: e.target.value } })}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={article.section2.text}
            onChange={(e) => setArticle({ ...article, section2: { ...section2, text: e.target.value } })}
          />
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained">
              {isNew ? 'Добавить статью' : 'Сохранить'}
            </Button>
            {!isNew && (
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
