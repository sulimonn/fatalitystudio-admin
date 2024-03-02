import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Box, Typography, Button } from '@mui/material';

// project import
import { useDeleteTaskMutation, useFetchServicesQuery, useReviewTaskMutation } from 'store/reducers/services';
import Empty from 'pages/Empty';
import { setTitle } from 'utils/titleHelper';

const Requests = ({ title, id }) => {
  useEffect(() => {
    setTitle(title);
  }, [title]);

  const services = useFetchServicesQuery().data || [];
  const requests =
    services
      .find((service) => service.id === id)
      ?.tasks.map((task) => ({
        ...JSON.parse(task)
      })) || [];

  const [deleteRequest] = useDeleteTaskMutation();
  const [reviewRequest] = useReviewTaskMutation();
  const handleDelete = async (id) => {
    await deleteRequest(id);
  };
  const handleReview = async (id) => {
    await reviewRequest(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Name', width: 160 },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Link style={{ color: 'inherit' }} to={`tel:${params.row.phone_number}`}>
          {params.row.phone_number}
        </Link>
      )
    },
    {
      field: 'reviewed',
      headerName: 'Reviewed',
      width: 80,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.reviewed}
          sx={{ outline: 'none !important', mx: 'auto' }}
          onClick={() => handleReview(params.row.id)}
        />
      )
    },
    {
      field: 'service_id',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleDelete(params.row.id)}>
          Удалить
        </Button>
      )
    }
  ];
  return (
    <Box
      style={{
        height: 400,
        width: '100%'
      }}
    >
      <Box my={4}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      {requests?.length !== 0 ? (
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell': {
              outline: 'none !important'
            },
            textDecoration: 'none !important'
          }}
          rows={requests}
          columns={columns}
          showCellVerticalBorder
          showColumnVerticalBorder
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      ) : (
        <Empty type={'request'} />
      )}
    </Box>
  );
};
Requests.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string
};

export default Requests;
