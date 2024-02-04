// assets
import { NewspaperOutlined as BlogIcon } from '@mui/icons-material';

// icons
const icons = {
  BlogIcon
};

// ==============================|| MENU ITEMS - BLOG ||============================== //

const blog = {
  id: 'group-blog',
  title: 'Blog',
  type: 'group',
  children: [
    {
      id: 'blog',
      title: 'Блог',
      type: 'item',
      url: '/blog',
      icon: icons.BlogIcon
    }
  ]
};

export default blog;
