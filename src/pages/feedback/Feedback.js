import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// project import
import { useDeleteReviewMutation, useGetReviewsQuery } from 'store/reducers/reviews';
import { setTitle } from 'utils/titleHelper';

// material-ui
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

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

const Feedback = () => {
  useEffect(() => {
    setTitle('Отзывы');
  }, []);

  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const { data: reviews = [] } = useGetReviewsQuery();

  const handleDelete = async (id) => {
    await deleteReview(id);
  };

  return (
    <Box>
      <Typography variant="h4">Отзывы</Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/feedback/new" variant="contained" color="primary">
          Добавить отзыв
        </Button>
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ width: '100%' }}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={6} key={review.id}>
            <Item>
              <Box
                display="flex"
                justifyContent="center"
                maxWidth={{ xs: '100%', sm: '40%' }}
                minWidth={{ xs: '100%', sm: '20%' }}
                height={170}
                borderRadius={2}
                overflow="hidden"
              >
                <img style={{ objectFit: 'cover', height: '100%', width: 'auto' }} src={review.photo} alt="img" loading="lazy" />
              </Box>
              <Box textAlign="left" display="flex" maxWidth={'100%'} flexDirection="column" justifyContent="space-between" gap={2}>
                <Box>
                  <Typography variant="h4" color="textPrimary">
                    {review.title}
                  </Typography>
                  <Typography variant="body1">
                    {review.description.length > 110 ? review.description.slice(0, 110) + '...' : review.description}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    disabled={isLoading}
                    color="error"
                    variant="outlined"
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleDelete(review.id)}
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
  );
};

export default Feedback;
