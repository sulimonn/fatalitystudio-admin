import portfolio from 'menu-items/portfolio';
import { useSelector } from 'react-redux';

export const useCurrentPath = () => {
  const openItem = useSelector((state) => state.menu.openItem);
  const currentPath = portfolio.children.find((item) => item.id === openItem);
  return {
    currentPath
  };
};
