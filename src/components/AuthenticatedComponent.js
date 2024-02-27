import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';

const AuthenticatedComponent = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      if (window.location.pathname.includes('/register') || window.location.pathname.includes('/login')) {
        navigate('/');
      }
    } else {
      if (!window.location.pathname.includes('/register')) {
        navigate('/login');
      }
    }
  }, [navigate, isAuth]);

  return children;
};

AuthenticatedComponent.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = () => ({
  isAuth: true //state.auth.isAuth
});

export default connect(mapStateToProps)(AuthenticatedComponent);
