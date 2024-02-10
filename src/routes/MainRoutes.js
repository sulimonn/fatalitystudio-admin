import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - utilities
const Applications = Loadable(lazy(() => import('pages/requests/Applications')));
const WebPages = Loadable(lazy(() => import('pages/requests/WebPages')));
const CRM = Loadable(lazy(() => import('pages/requests/CRM')));
const Delivery = Loadable(lazy(() => import('pages/requests/Delivery')));
const Design = Loadable(lazy(() => import('pages/requests/Design')));
const Seo = Loadable(lazy(() => import('pages/requests/Seo')));
const PortfolioApplications = Loadable(lazy(() => import('pages/portfolio/Application')));
const PortfolioWebPages = Loadable(lazy(() => import('pages/portfolio/WebPages')));
const PortfolioCRM = Loadable(lazy(() => import('pages/portfolio/Crm')));
const PortfolioDelivery = Loadable(lazy(() => import('pages/portfolio/Delivery')));
const PortfolioDesign = Loadable(lazy(() => import('pages/portfolio/Design')));
const PortfolioSeo = Loadable(lazy(() => import('pages/portfolio/Seo')));
const Blog = Loadable(lazy(() => import('pages/blog/Blog')));
const Article = Loadable(lazy(() => import('pages/blog/Article')));
const Feedback = Loadable(lazy(() => import('pages/feedback/Feedback')));
const Team = Loadable(lazy(() => import('pages/team/Team')));
const MemberForm = Loadable(lazy(() => import('pages/team/MemberForm')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Applications />
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
        },
        {
          path: 'development-delivery',
          element: <Delivery />
        },
        {
          path: 'design',
          element: <Design />
        },
        {
          path: 'seo',
          element: <Seo />
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
        },
        {
          path: 'new',
          element: <Article />
        }
      ]
    },
    {
      path: 'feedback',
      element: <Feedback />
    },
    {
      path: 'team',
      children: [
        {
          path: '',
          element: <Team />
        },
        {
          path: ':id',
          element: <MemberForm />
        },
        {
          path: 'new',
          element: <MemberForm />
        }
      ]
    },
    {
      path: 'portfolio',
      children: [
        {
          path: 'applications',
          element: <PortfolioApplications />
        },
        {
          path: 'webpages',
          element: <PortfolioWebPages />
        },
        {
          path: 'crm',
          element: <PortfolioCRM />
        },
        {
          path: 'development-delivery',
          element: <PortfolioDelivery />
        },
        {
          path: 'design',
          element: <PortfolioDesign />
        },
        {
          path: 'seo',
          element: <PortfolioSeo />
        }
      ]
    }
  ]
};

export default MainRoutes;
