import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { removePost } from 'store/reducers/blog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  gap: 20,
  height: '100%',
  flexDirection: 'row',
  '@media (max-width: 550px)': {
    flexDirection: 'column'
  }
}));

const Blog = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.blog.posts);
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      dispatch(removePost(id));
    }
  };
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/blog/new" variant="contained" color="primary" style={{ marginBottom: 20 }}>
          Добавить статью
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={6} key={article.id}>
              <Item>
                <Box display="flex" justifyContent="center" minWidth={'30%'} height={170} borderRadius={2} overflow="hidden">
                  <img style={{ objectFit: 'cover' }} src={require(`assets/images/blog/${article.src}`)} alt="img" loading="lazy" />
                </Box>
                <Box textAlign="left" display="flex" flexDirection="column" justifyContent="space-between" gap={2}>
                  <Box>
                    <Typography variant="h5">{article.title}</Typography>
                    <Typography variant="body1">{article.text}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to={'/blog/' + article.id}
                      style={{ textDecoration: 'none' }}
                    >
                      Изменить
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      style={{ textDecoration: 'none' }}
                      onClick={() => handleDelete(article.id)}
                    >
                      Удалить
                    </Button>
                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Blog;
