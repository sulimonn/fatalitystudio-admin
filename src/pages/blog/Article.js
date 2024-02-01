import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box, ButtonGroup, Divider, ImageList, ImageListItem } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputFileUpload from 'components/@extended/InputFile';
import { removePost, updatePost } from 'store/reducers/blog';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = useSelector((state) => state.blog.posts.find((post) => post.id == id));
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.head.text);
  const [section1, setSection1] = useState(article.section1);
  const [section2, setSection2] = useState(article.section2);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(require(`assets/images/blog/${article.src}`));
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
        <form onSubmit={handleSubmit} method="post">
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
          <Box display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Box display="flex" justifyContent="center">
              <InputFileUpload setPreview={setPreview} file={file} setFile={setFile}>
                Загрузить фото
              </InputFileUpload>
            </Box>
            <ImageList cols={1} rowHeight={164} sx={{ width: 300 }}>
              <ImageListItem key={article.id}>
                <img src={`${preview}`} alt="img" loading="lazy" />
              </ImageListItem>
            </ImageList>
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
          <ButtonGroup variant="contained" color="primary">
            <Button type="submit">Сохранить</Button>
            <Button color="error" onClick={() => handleDelete(article.id)}>
              Удалить
            </Button>
            <Button color="secondary" component={Link} to={'https://fatalitystudio.netlify.app/blog/' + id} target="_blank">
              Посмотреть на сайте
            </Button>
          </ButtonGroup>
        </form>
      </Paper>
    </Grid>
  );
};

export default Article;
