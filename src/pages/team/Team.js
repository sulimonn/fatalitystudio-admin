import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography, Grid, Button } from '@mui/material';

// project import
import { setTitle } from 'utils/titleHelper';
import Empty from 'pages/Empty';
import { deleteMember } from 'store/reducers/team';

const Team = () => {
  useEffect(() => {
    setTitle('Команда');
  }, []);

  const team = useSelector((state) => state.team.members);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this member?');
    if (confirmed) {
      dispatch(deleteMember(id));
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" color="textPrimary">
        Команда
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button component={Link} to="/team/new" variant="contained" color="primary" style={{ marginBottom: 20 }}>
          Добавить сотрудника
        </Button>
      </Box>
      <Grid container spacing={3}>
        {team.length !== 0 ? (
          team.map((member) => (
            <Grid item key={member.id} xs={12} sm={6}>
              <Box display="flex" gap={2} backgroundColor="background.paper" borderRadius={2} p={2}>
                <Box sx={{ width: '100px', height: '100px', borderRadius: '50%' }}>
                  <img
                    loading="lazy"
                    src={require('assets/images/users/' + member.avatar)}
                    alt="avatar"
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" sx={{ width: '100% ', flex: '1 !important' }}>
                  <Box>
                    <Box>
                      <Typography variant="h5" color="textPrimary">
                        {member.firstName} {member.lastName}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {member.position}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" color="textSecondary">
                        {member.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button component={Link} to={`/team/${member.id}`} size="small" variant="outlined" color="primary">
                      Редактировать
                    </Button>
                    <Button onClick={() => handleDelete(member.id)} size="small" variant="outlined" color="error">
                      Удалить
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Empty type="team" />
        )}
      </Grid>
    </Box>
  );
};

export default Team;
