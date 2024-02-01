// assets
import { FeedbackOutlined } from '@mui/icons-material';

// icons
const icons = {
  FeedbackOutlined
};

// ==============================|| MENU ITEMS - FEEDBACK ||============================== //

const feedback = {
  id: 'feedback',
  title: 'Feedback',
  type: 'group',
  children: [
    {
      id: 'group-fedback1',
      title: 'Отзывы',
      type: 'item',
      url: '/feedback',
      icon: icons.FeedbackOutlined
    }
  ]
};

export default feedback;
