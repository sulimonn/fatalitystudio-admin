import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - utilities
const HomePage = Loadable(lazy(() => import('pages/home/HomePage')));
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
const AddProject = Loadable(lazy(() => import('pages/portfolio/AddProject')));
const UpdateProject = Loadable(lazy(() => import('pages/portfolio/UpdateProject')));
const Blog = Loadable(lazy(() => import('pages/blog/Blog')));
const AddArticle = Loadable(lazy(() => import('pages/blog/AddArticle')));
const UpdateArticle = Loadable(lazy(() => import('pages/blog/UpdateArticle')));
const Feedback = Loadable(lazy(() => import('pages/feedback/Feedback')));
const AddFeedback = Loadable(lazy(() => import('pages/feedback/AddFeedback')));
const Team = Loadable(lazy(() => import('pages/team/Team')));
const MemberForm = Loadable(lazy(() => import('pages/team/MemberForm')));
const UpdateMember = Loadable(lazy(() => import('pages/team/UpdateMember')));
const ServiceList = Loadable(lazy(() => import('pages/services/ServiceList')));
const UpdateService = Loadable(lazy(() => import('pages/services/UpdateService')));
const AddService = Loadable(lazy(() => import('pages/services/AddService')));
const PageNotFound = Loadable(lazy(() => import('pages/404/PageNotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,

  children: [
    {
      path: '/home',
      element: <HomePage />
    },
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
          element: <UpdateArticle />
        },
        {
          path: 'new',
          element: <AddArticle />
        }
      ]
    },
    {
      path: 'feedback',
      children: [
        {
          path: '',
          element: <Feedback />
        },
        {
          path: 'new',
          element: <AddFeedback />
        }
      ]
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
          element: <UpdateMember />
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
        },
        {
          path: 'new',
          element: <AddProject />
        },
        {
          path: ':id',
          element: <UpdateProject />
        }
      ]
    },
    {
      path: 'services',
      children: [
        {
          path: '',
          element: <ServiceList />
        },
        {
          path: ':id',
          element: <UpdateService />
        },
        {
          path: 'new',
          element: <AddService />
        }
      ]
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ]
};

export default MainRoutes;
