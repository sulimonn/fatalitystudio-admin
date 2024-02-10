// assets
import { TeamOutlined } from '@ant-design/icons';
import { FeedbackOutlined } from '@mui/icons-material';
import MiscellaneousServicesSharpIcon from '@mui/icons-material/MiscellaneousServicesSharp';

// icons
const icons = {
  FeedbackOutlined,
  TeamOutlined,
  MiscellaneousServicesSharpIcon
};

// ==============================|| MENU ITEMS - OTHER ||============================== //

const other = {
  id: 'other',
  title: 'Other',
  type: 'group',
  children: [
    {
      id: 'services',
      title: 'Сервисы',
      type: 'item',
      url: '/services',
      icon: icons.MiscellaneousServicesSharpIcon
    },
    {
      id: 'team1',
      title: 'Команда',
      type: 'item',
      url: '/team',
      icon: icons.TeamOutlined
    },
    {
      id: 'fedback1',
      title: 'Отзывы',
      type: 'item',
      url: '/feedback',
      icon: icons.FeedbackOutlined
    }
  ]
};

export default other;
