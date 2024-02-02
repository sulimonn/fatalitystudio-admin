// assets
import { AppstoreAddOutlined, LayoutOutlined, FundOutlined } from '@ant-design/icons';
import { DeliveryDiningOutlined, DesignServicesOutlined, DisplaySettingsOutlined } from '@mui/icons-material';

// icons
const icons = {
  AppstoreAddOutlined,
  LayoutOutlined,
  DisplaySettingsOutlined,
  DeliveryDiningOutlined,
  DesignServicesOutlined,
  FundOutlined
};

// ==============================|| MENU ITEMS - PORTFOLIO ||============================== //

const portfolio = {
  id: 'portfolio-application',
  title: 'Протфолио',
  type: 'group',
  children: [
    {
      id: 'application-portfolio',
      title: 'Приложения',
      type: 'item',
      url: '/portfolio/applications',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'webpage-portfolio',
      title: 'Сайты',
      type: 'item',
      url: '/portfolio/webpages',
      icon: icons.LayoutOutlined
    },
    {
      id: 'crm-portfolio',
      title: 'CRM',
      type: 'item',
      url: '/portfolio/crm',
      icon: icons.DisplaySettingsOutlined
    },
    {
      id: 'delivery-portfolio',
      title: 'Агрегаторы доставки',
      type: 'item',
      url: '/portfolio/development-delivery',
      icon: icons.DeliveryDiningOutlined
    },
    {
      id: 'design-portfolio',
      title: 'Дизайн',
      type: 'item',
      url: '/portfolio/design',
      icon: icons.DesignServicesOutlined
    },
    {
      id: 'seo-portfolio',
      title: 'Реклама и SEO',
      type: 'item',
      url: '/portfolio/seo',
      icon: icons.FundOutlined
    }
  ]
};

export default portfolio;
