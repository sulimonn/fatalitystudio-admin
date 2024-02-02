import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box, Divider, Typography } from '@mui/material';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputFileUpload from 'components/@extended/InputFile';
import { removePost, updatePost } from 'store/reducers/blog';

const Article = () => {
  const { id } = useParams();
  const pathname = useLocation().pathname;
  const isNew = pathname.endsWith('/new');
  const navigate = useNavigate();
  let article = useSelector((state) => state.blog.posts.find((post) => post.id == id));
  article = isNew
    ? {
        src: '',
        title: '',
        text: '',
        date: '',
        head: {
          text: '',
          src: ''
        },
        section1: {
          title: '',
          text: ''
        },
        big: '',
        section2: {
          title: '',
          text: ''
        },
        authorId: 4
      }
    : article;
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.head.text);
  const [section1, setSection1] = useState(article.section1);
  const [section2, setSection2] = useState(article.section2);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(isNew ? null : require(`assets/images/blog/${article.src}`));
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: article.id, title: title, content, preview, section1, section2 }));
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
            {(!isNew || preview) && (
              <Box cols={1} height={100} width="300" borderRadius={2}>
                <img src={preview} alt="img" loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setPreview} file={file} setFile={setFile}>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

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
            value={section1.title}
            onChange={(e) => setSection1({ ...section1, title: e.target.value })}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={section1.text}
            onChange={(e) => setSection1({ ...section1, text: e.target.value })}
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
            value={section2.title}
            onChange={(e) => setSection2({ ...section2, title: e.target.value })}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={section2.text}
            onChange={(e) => setSection2({ ...section2, text: e.target.value })}
          />
          <Grid container justifyContent="flex-end" columns={{ xs: 12, sm: 8, md: 12 }}>
            <Button color="primary" type="submit" variant="contained">
              Сохранить
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
