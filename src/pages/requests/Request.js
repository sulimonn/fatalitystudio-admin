import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Box, Typography } from '@mui/material';

// project import
import { reviewRequest } from 'store/reducers/requests';
import Empty from 'pages/Empty';
import { setTitle } from 'utils/titleHelper';

const Requests = ({ title, type }) => {
  useEffect(() => {
    setTitle(title);
  }, [title]);

  const dispatch = useDispatch();
  const service = useSelector((state) => state.services.find((service) => service.type === type));
  const requests = useSelector((state) => state.requests.requests.filter((request) => request.serviceId === service.id));

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Name', width: 160 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Link style={{ color: 'inherit' }} to={`tel:${params.row.phoneNumber}`}>
          {params.row.phoneNumber}
        </Link>
      )
    },
    {
      field: 'reviewed',
      headerName: 'Reviewed',
      width: 80,
      renderCell: (params) => (
        <>
          <Checkbox
            checked={params.row.reviewed}
            sx={{ outline: 'none !important', mx: 'auto' }}
            onClick={() => handleReview(params.row.id)}
          />
        </>
      )
    }
  ];
  const handleReview = (id) => {
    dispatch(reviewRequest(id));
  };

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
      {requests.length !== 0 ? (
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
  type: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default Requests;
