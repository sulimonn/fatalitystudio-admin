// assets
import { HomeOutlined } from '@ant-design/icons';
// icons
const icons = {
  HomeOutlined
};

// ==============================|| MENU ITEMS - HOME ||============================== //

const home = {
  id: 'group-home',
  title: 'Главная',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Главная',
      type: 'item',
      url: '/home',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    }
  ]
};

export default home;
