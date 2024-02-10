// assets
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined
};

// ==============================|| MENU ITEMS - TEAM ||============================== //

const team = {
  id: 'team',
  title: 'Team',
  type: 'group',
  children: [
    {
      id: 'team1',
      title: 'Команда',
      type: 'item',
      url: '/team',
      icon: icons.TeamOutlined
    }
  ]
};

export default team;
