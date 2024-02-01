import React from 'react';
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
      id: request.id,
      name: request.name,
      phoneNumber: request.phoneNumber,
      serviceId: service.title
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'serviceId', headerName: 'Interested Service', width: 200 },
    {
      field: 'reviewed',
      headerName: 'Reviewed',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Checkbox checked={params.row.reviewed} sx={{ outline: 'none !important' }} onClick={() => handleReview(params.row.id)}>
          Review
        </Checkbox>
      )
    }
  ];
  const handleReview = (id) => {
    dispatch(reviewRequest(id));
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{ '& .MuiDataGrid-cell': { outline: 'none !important' } }}
        rows={appRequests}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  );
};
Requests.propTypes = {
  type: PropTypes.string.isRequired
};

export default Requests;
