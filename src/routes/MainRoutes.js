import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Applications = Loadable(lazy(() => import('pages/requests/Applications')));
const WebPages = Loadable(lazy(() => import('pages/requests/WebPages')));
const CRM = Loadable(lazy(() => import('pages/requests/CRM')));
const Blog = Loadable(lazy(() => import('pages/blog/Blog')));
const Article = Loadable(lazy(() => import('pages/blog/Article')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'requests',
      children: [
        {
          path: 'applications',
          element: <Applications />
        },
        {
          path: 'webpages',
          element: <WebPages />
        },
        {
          path: 'crm',
          element: <CRM />
        }
      ]
    },
    {
      path: 'blog',
      children: [
        {
          path: '',
          element: <Blog />
        },
        {
          path: ':id',
          element: <Article />
        }
      ]
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
