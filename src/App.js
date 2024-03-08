// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { closeSnackbar } from 'store/reducers/snackbar';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const App = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <ThemeCustomization>
      <AuthenticatedComponent>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </AuthenticatedComponent>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert severity={severity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </ThemeCustomization>
  );
};

export default App;
