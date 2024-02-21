import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import { fetchUserInfo } from 'store/reducers/actions';

const AuthenticatedComponent = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  useEffect(() => {
    // Fetch user info using dispatch
    dispatch(fetchUserInfo(localStorage.getItem('userToken')));

    // Check if the user is authenticated
    if (isAuth) {
      // If authenticated and on the register or login page, redirect to homepage
      if (window.location.pathname.includes('/register') || window.location.pathname.includes('/login')) {
        navigate('/');
      }
    } else {
      // If not authenticated and not on the register page, redirect to login page
      if (!window.location.pathname.includes('/register')) {
        navigate('/login');
      }
    }
  }, [dispatch, navigate, isAuth]);

  return children;
};

AuthenticatedComponent.propTypes = {
  children: PropTypes.node.isRequired
};

const mapStateToProps = () => ({
  isAuth: true //state.auth.isAuth
});

export default connect(mapStateToProps)(AuthenticatedComponent);
