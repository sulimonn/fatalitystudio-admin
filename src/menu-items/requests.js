// assets
import { AppstoreAddOutlined, LayoutOutlined, TeamOutlined, FundOutlined } from '@ant-design/icons';
import { DeliveryDiningOutlined, DesignServicesOutlined } from '@mui/icons-material';

// icons
const icons = {
  AppstoreAddOutlined,
  LayoutOutlined,
  TeamOutlined,
  DeliveryDiningOutlined,
  DesignServicesOutlined,
  FundOutlined
};

// ==============================|| MENU ITEMS - REQUEST ||============================== //

const requests = {
  id: 'request-application',
  title: 'Заявки',
  type: 'group',
  children: [
    {
      id: 'application1',
      title: 'Приложения',
      type: 'item',
      url: '/requests/applications',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'webpage1',
      title: 'Сайты',
      type: 'item',
      url: '/requests/webpages',
      icon: icons.LayoutOutlined
    },
    {
      id: 'crm1',
      title: 'CRM',
      type: 'item',
      url: '/requests/crm',
      icon: icons.TeamOutlined
    },
    {
      id: 'delivery1',
      title: 'Агрегаторы доставки',
      type: 'item',
      url: '/requests/development-delivery',
      icon: icons.DeliveryDiningOutlined
    },
    {
      id: 'design1',
      title: 'Дизайн',
      type: 'item',
      url: '/requests/design',
      icon: icons.DesignServicesOutlined
    },
    {
      id: 'seo1',
      title: 'Реклама и SEO',
      type: 'item',
      url: '/requests/seo',
      icon: icons.FundOutlined
    }
  ]
};

export default requests;
