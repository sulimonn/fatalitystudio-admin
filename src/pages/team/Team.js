import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Typography, Grid, Button } from '@mui/material';

// project import
import { setTitle } from 'utils/titleHelper';
import Empty from 'pages/Empty';
import { useDeleteMemberMutation, useGetTeamQuery } from 'store/reducers/team';
import { useAuth } from 'hooks/use-auth';

const Team = () => {
  const [deleteMember] = useDeleteMemberMutation();
  const { data = [] } = useGetTeamQuery();
  const { user } = useAuth();
  const team = data.filter((member) => member.id !== user.id);
  useEffect(() => {
    setTitle('Команда');
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this member?');
    if (confirmed) {
      await deleteMember(id);
    }
  };

  return (
    <Box>
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
                <Box width="100px" height="100px" minWidth="100px" minHeight="100px">
                  {member.avatar ? (
                    <img loading="lazy" src={member.avatar} alt="avatar" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    <Box
                      sx={{ width: '100%', height: '100%', backgroundColor: 'primary.main', borderRadius: '50%' }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h1" color="textSecondary" textTransform="uppercase">
                        {member.first_name ? member.first_name.charAt(0) : member.email.charAt(0)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between" flex="1">
                  <Box>
                    <Box>
                      <Typography variant="h5" color="textPrimary">
                        {member.first_name && member.last_name ? member.first_name + ' ' + member.last_name : member.username}
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
                  <Box display="flex" gap={{ xs: 1, sm: 2 }} justifyContent="flex-end" alignItems="end">
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
