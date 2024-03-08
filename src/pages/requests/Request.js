import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Box, Typography, IconButton, TextField, FormHelperText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

// project import
import {
  useAddCommentToTaskMutation,
  useDeleteTaskMutation,
  useFetchServicesQuery,
  useFetchTasksQuery,
  useReviewTaskMutation
} from 'store/reducers/services';
import Empty from 'pages/Empty';
import { setTitle } from 'utils/titleHelper';

const Requests = ({ title = null, id = null }) => {
  useEffect(() => {
    setTitle(title);
  }, [title]);

  const { data: requests = [] } = useFetchTasksQuery(id);
  const [comment, setComment] = useState();
  const [edit, setEdit] = useState({});

  const [error, setError] = useState({});

  useEffect(() => {
    if (requests.length) {
      setEdit(
        requests.reduce((acc, curr) => {
          acc[curr.id] = false;
          return acc;
        }, {})
      );
      setComment(
        requests.reduce((acc, curr) => {
          acc[curr.id] = curr.comment;
          return acc;
        }, {})
      );
    }
  }, [requests]);

  const [deleteRequest, { isLoading: isLoadingDelete }] = useDeleteTaskMutation();
  const [reviewRequest, { isLoading: isLoadingReview }] = useReviewTaskMutation();
  const [addComment, { isLoading: isLoadingComment }] = useAddCommentToTaskMutation();
  const handleDelete = async (id) => {
    await deleteRequest(id);
  };
  const handleReview = async (id) => {
    await reviewRequest(id);
  };

  const handleEdit = (id) => {
    console.log(edit);
    setEdit((prev) => {
      const obj = { ...prev };
      obj[id] = !obj[id];
      return obj;
    });
  };
  const handleChange = (e, id) => {
    const { value, name } = e.target;
    setComment((prev) => {
      const obj = { ...prev };
      obj[id] = value;
      return obj;
    });
    setError((prev) => {
      const obj = { ...prev };
      obj[name] = null;
      return obj;
    });
  };

  const handleSubmit = async (id) => {
    const response = await addComment({ comment: comment[id], id });
    if (!response.error) {
      setEdit((prev) => {
        const obj = { ...prev };
        obj[id] = false;
        return obj;
      });
    } else {
      setError(response.error.data);
    }
  };

  const { data: services = [] } = useFetchServicesQuery();

  const columns = [
    { field: 'id', headerName: 'ID', width: 15 },
    { field: 'name', headerName: 'Name', width: 80 },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Link style={{ color: 'inherit' }} to={`tel:${params.row.phone_number}`}>
          {params.row.phone_number}
        </Link>
      )
    },
    {
      field: 'comment',
      headerName: 'Комментарии',
      flex: 5,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        if (edit[params.row.id]) {
          return (
            <>
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} width="100%">
                <TextField
                  fullWidth
                  autoFocus
                  variant="outlined"
                  value={comment[rowId]}
                  sx={{ width: '100%' }}
                  name="comment"
                  onChange={(e) => handleChange(e, rowId)}
                  error={Boolean(error?.comment)}
                />
                {error?.comment && (
                  <FormHelperText error id="standard-weight-helper-text-comment">
                    {error?.comment}
                  </FormHelperText>
                )}
              </Box>
              <IconButton
                disabled={isLoadingComment}
                sx={{ ml: 1 }}
                aria-label="save"
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => handleSubmit(rowId)}
              >
                <CheckIcon />
              </IconButton>
            </>
          );
        }
        return (
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography color="textPrimary">{params.row.comment}</Typography>
            <IconButton aria-label="edit" color="primary" variant="outlined" size="small" onClick={() => handleEdit(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Box>
        );
      }
    },
    {
      field: 'reviewed',
      headerName: 'Рассмотрено',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          disabled={isLoadingReview}
          checked={params.row.reviewed}
          sx={{ outline: 'none !important', mx: 'auto' }}
          onClick={() => handleReview(params.row.id)}
        />
      )
    },
    {
      field: 'service',
      headerName: '',
      width: 30,
      renderCell: (params) => (
        <IconButton
          disabled={isLoadingDelete}
          aria-label="delete"
          color="error"
          variant="outlined"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];
  if (!id) {
    columns.splice(3, 0, {
      field: 'service_id',
      headerName: 'Сервис',
      width: 150,
      renderCell: (params) => services.find((s) => s.id === params.row.service_id).title
    });
  }

  return (
    <Box
      style={{
        height: 400,
        width: '100%'
      }}
    >
      {id && (
        <Box my={4}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
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
              paginationModel: { page: 0, pageSize: 10 }
            }
          }}
          pageSizeOptions={[10, 20]}
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
