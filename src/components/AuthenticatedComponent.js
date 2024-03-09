import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { CircularProgress, Box, Typography } from '@mui/material';

const AuthenticatedComponent = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth, errorMessage } = useAuth();

  useEffect(() => {
    if (isAuth !== 'loading') {
      if (isAuth) {
        if (window.location.pathname.includes('/register') || window.location.pathname.includes('/login')) {
          navigate('/home');
        }
      } else {
        if (!window.location.pathname.includes('/register')) {
          navigate('/login');
        }
      }
    }
  }, [navigate, isAuth]);

  if (isAuth === 'error') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column" textAlign="center" p={2}>
        <Typography color="primary" variant="h4">
          {errorMessage.message || 'Что-то пошло не так'}
        </Typography>
        <Typography variant="subtitle1">
          Попробуйте{' '}
          <a
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onClick={handleReload}
            onKeyDown={(e) => e.key === 'Enter' && handleReload()}
          >
            перезагрузить страницу
          </a>{' '}
          или вернуться назад.
        </Typography>
      </Box>
    );
  }
  if (isAuth === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

AuthenticatedComponent.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = () => ({
  isAuth: false //state.auth.isAuth
});

export default connect(mapStateToProps)(AuthenticatedComponent);
