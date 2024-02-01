import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

import { reviewRequest } from 'store/reducers/requests';

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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 160 },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 190,
      sortable: false,
      renderCell: (params) => (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`tel:${params.row.phoneNumber}`}>
          {params.row.phoneNumber}
        </Link>
      )
    },
    { field: 'serviceId', headerName: 'Interested Service', width: 250 },
    {
      field: 'reviewed',
      headerName: 'Reviewed',
      width: 100,
      renderCell: (params) => (
        <>
          <Checkbox
            checked={params.row.reviewed}
            sx={{ outline: 'none !important' }}
            onClick={() => handleReview(params.row.id)}
          ></Checkbox>
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
        width: '100%',
        '& .MuiDataGrid-root': {
          borderColor: 'secondary.dark !important'
        }
      }}
    >
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
    </div>
  );
};
Requests.propTypes = {
  type: PropTypes.string.isRequired
};

export default Requests;
