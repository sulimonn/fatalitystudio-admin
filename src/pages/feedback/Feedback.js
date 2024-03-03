import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// project import
import { useGetReviewsQuery } from 'store/reducers/reviews';
import { setTitle } from 'utils/titleHelper';

// material-ui
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const Feedback = () => {
  useEffect(() => {
    setTitle('Отзывы');
  }, []);

  const { data: reviews = [] } = useGetReviewsQuery();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Заголовок', width: 500 },
    { field: 'description', headerName: 'Описание', width: 500 },
    { field: 'photo', headerName: 'Фото', width: 200 }
  ];

  return (
    <Box>
      <Typography variant="h4">Отзывы</Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/feedback/new" variant="contained" color="primary">
          Добавить отзыв
        </Button>
      </Box>
      <DataGrid rows={reviews} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableSelectionOnClick />
    </Box>
  );
};

export default Feedback;
