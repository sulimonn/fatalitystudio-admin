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

// ==============================|| MENU ITEMS - REQUEST ||============================== //

const requests = {
  id: 'request-application',
  title: 'Заявки',
  type: 'group',
  children: [
    {
      id: 'application',
      title: 'Приложения',
      type: 'item',
      url: '/requests/applications',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'webpage',
      title: 'Сайты',
      type: 'item',
      url: '/requests/webpages',
      icon: icons.LayoutOutlined
    },
    {
      id: 'crm',
      title: 'CRM',
      type: 'item',
      url: '/requests/crm',
      icon: icons.DisplaySettingsOutlined
    },
    {
      id: 'delivery',
      title: 'Агрегаторы доставки',
      type: 'item',
      url: '/requests/development-delivery',
      icon: icons.DeliveryDiningOutlined
    },
    {
      id: 'design',
      title: 'Дизайн',
      type: 'item',
      url: '/requests/design',
      icon: icons.DesignServicesOutlined
    },
    {
      id: 'seo',
      title: 'Реклама и SEO',
      type: 'item',
      url: '/requests/seo',
      icon: icons.FundOutlined
    }
  ]
};

export default requests;
