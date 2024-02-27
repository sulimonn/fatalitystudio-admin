import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

// project import
import { setTitle } from 'utils/titleHelper';
import { useDeleteArticleMutation, useGetBlogQuery } from 'store/reducers/blogApi';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  gap: 20,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

const Blog = () => {
  const [deleteArticle] = useDeleteArticleMutation();
  const response = useGetBlogQuery();

  useEffect(() => {
    setTitle('Блог');
    if (response.isError && !response.isLoading) {
      response.refetch();
    }
  }, [response]);

  const articles = response.data || [];

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?', id);
    if (confirmed) {
      await deleteArticle(id);
      response.refetch();
      alert('Post deleted successfully');
    }
  };
  return (
    <>
      <Box my={4}>
        <Typography variant="h4">Блог</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/blog/new" variant="contained" color="primary" style={{ marginBottom: 20 }}>
          Добавить статью
        </Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ width: '100%' }}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={6} key={article.id}>
            <Item>
              <Box
                display="flex"
                justifyContent="center"
                maxWidth={{ xs: '100%', sm: '30%' }}
                height={170}
                borderRadius={2}
                overflow="hidden"
              >
                <img style={{ objectFit: 'cover', height: '100%', width: '100%' }} src={article.cover} alt="img" loading="lazy" />
              </Box>
              <Box
                textAlign="left"
                display="flex"
                maxWidth={{ xs: '100%', sm: '70%' }}
                flexDirection="column"
                justifyContent="space-between"
                gap={2}
              >
                <Box>
                  <Typography variant="h4" color="textPrimary">
                    {article.title}
                  </Typography>
                  <Typography variant="body1">{article.introduction}</Typography>
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button color="primary" variant="outlined" component={Link} to={'/blog/' + article.id} style={{ textDecoration: 'none' }}>
                    Изменить
                  </Button>
                  <Button color="secondary" variant="outlined" style={{ textDecoration: 'none' }} onClick={() => handleDelete(article.id)}>
                    Удалить
                  </Button>
                </Box>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Blog;
