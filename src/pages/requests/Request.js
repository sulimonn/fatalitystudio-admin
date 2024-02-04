import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

import { reviewRequest } from 'store/reducers/requests';
import Empty from 'pages/Empty';

const Requests = ({ type }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.services.find((service) => service.type === type));

  const appRequests = useSelector((state) => state.requests.filter((request) => request.serviceId === service.id)).map((request) => {
    return {
      ...request,
      serviceId: service.title
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Name', width: 160 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`tel:${params.row.phoneNumber}`}>
          {params.row.phoneNumber}
        </Link>
      )
    },
    { field: 'serviceId', headerName: 'Interested Service', width: 180 },
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
    <div
      style={{
        height: 400,
        width: '100%'
      }}
    >
      {appRequests.length !== 0 ? (
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell': {
              outline: 'none !important'
            },
            textDecoration: 'none !important'
          }}
          rows={appRequests}
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
    </div>
  );
};
Requests.propTypes = {
  type: PropTypes.string.isRequired
};

export default Requests;
