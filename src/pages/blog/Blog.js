import React from 'react';
import { Box } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

const Blog = () => {
  const articles = useSelector((state) => state.blog.posts);
  console.log(articles);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {articles.map((article) => (
          <Grid item xs={4} sm={4} md={4} key={article.id}>
            <Link to={'/blog/' + article.id} style={{ textDecoration: 'none' }}>
              <Item>{article.title}</Item>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
