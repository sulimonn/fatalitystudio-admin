import portfolio from 'menu-items/portfolio';
import { useSelector } from 'react-redux';

export const useCurrentPath = () => {
  const openItem = useSelector((state) => state.menu.openItem);
  const savedItem = JSON.parse(localStorage.getItem('openItem'))[0];
  const currentPath = portfolio.children.find((item) => (item.id === openItem[0] ? openItem[0] + '-portfolio' : savedItem))?.url;

  return {
    currentPath
  };
};
