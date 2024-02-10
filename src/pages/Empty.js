import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import EmptyFolder from 'assets/images/icons/empty-folder.png';
import NoTask from 'assets/images/icons/no-task.png';
import Team from 'assets/images/icons/brainstorm.png';

const Empty = ({ type }) => {
  let src;
  switch (type) {
    case 'request':
      src = NoTask;
      break;
    case 'portfolio':
      src = EmptyFolder;
      break;
    case 'team':
      src = Team;
      break;
    default:
      break;
  }
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" gap={2} alignItems="center" height="300px" width="100%">
      <img loading="lazy" src={src} style={{ width: '130px', opacity: 0.4, height: '130px' }} alt="Empty" />
      <Typography variant="h3" color="textSecondary">
        Пусто
      </Typography>
    </Box>
  );
};

Empty.propTypes = {
  type: PropTypes.string
};

export default Empty;
