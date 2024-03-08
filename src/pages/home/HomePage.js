import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

// project import
import { setTitle } from 'utils/titleHelper';
import { useGetBlogQuery } from 'store/reducers/blogApi';
import Requests from 'pages/requests/Request';
import Loader from 'components/Loader';
import PortfolioBase from 'pages/portfolio/PortfolioBase';

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

const HomePage = () => {
  useEffect(() => {
    setTitle('');
  }, []);
  const { data: articles = [], isFetching: isLoading } = useGetBlogQuery();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Tasks</Typography>
      </Grid>

      <Grid item xs={12}>
        <Requests />
      </Grid>

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Projects</Typography>
      </Grid>

      <Grid item xs={12}>
        <PortfolioBase />
      </Grid>

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Blog</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ width: '100%' }}>
          {articles.slice(0, 6).map((article) => (
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
      </Grid>
    </Grid>
  );
};

export default HomePage;
