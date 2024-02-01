// assets
import { AppstoreAddOutlined, LayoutOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreAddOutlined,
  LayoutOutlined,
  TeamOutlined
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
    }
  ]
};

export default requests;
