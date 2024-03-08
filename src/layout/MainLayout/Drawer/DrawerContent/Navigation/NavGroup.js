import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography, Collapse } from '@mui/material';
import { ArrowDownOutlined } from '@ant-design/icons';

// project import
import NavItem from './NavItem';
import { useEffect, useState } from 'react';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { openItem } = useSelector((state) => state.menu);
  const { drawerOpen } = menu;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setCollapsed(item.children.find((child) => child.id === openItem[0]) ? true : item.id === 'group-home' ? true : false);
  }, [openItem, item]);

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen &&
        (item.id !== 'group-home' ? (
          <Box onClick={toggleCollapse} sx={{ pl: 3, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            <ArrowDownOutlined
              style={{
                opacity: 0.5,
                cursor: 'pointer',
                transform: collapsed ? 'rotate(0)' : 'rotate(-180deg)',
                transition: '0.2s',
                margin: '0 10px'
              }}
            />
          </Box>
        ) : (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {}
            </Typography>
          </Box>
        ))
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      <Collapse in={collapsed}>{navCollapse}</Collapse>
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
