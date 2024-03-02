// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import AuthenticatedComponent from 'components/AuthenticatedComponent';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <AuthenticatedComponent>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </AuthenticatedComponent>
    </ThemeCustomization>
  );
};

export default App;
