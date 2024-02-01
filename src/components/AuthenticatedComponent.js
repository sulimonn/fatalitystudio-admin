import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthenticatedComponent = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !window.location.pathname.includes('/register')) {
      return navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return children;
};

AuthenticatedComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(AuthenticatedComponent);
