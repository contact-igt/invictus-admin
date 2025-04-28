import { useState } from 'react';
import { MenuItem } from 'routes/sitemap';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconifyIcon from 'components/base/IconifyIcon';
import { useLocation } from 'react-router-dom';

const ListItem = ({ subheader, icon, path, active }: MenuItem) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const currentPath = location.pathname.replace('/pages/', '');
  const comingPath = path?.replace('/pages/', '');
  const isPathMatched = currentPath === comingPath;
  
  const handleClick = () => {
    setOpen(!open);
  };
  



  console.log(comingPath, 'comingPath');
  console.log(currentPath, 'currentPath');
  console.log(currentPath === comingPath, 'coming');
  
  
  

  return (
    <ListItemButton
      component={Link}
      href={path}
      onClick={handleClick}
      sx={{ mb: 2.5, bgcolor: (active && isPathMatched) ? 'info.main' : null }}
    >
      <ListItemIcon>
        {icon && (
          <IconifyIcon
            icon={icon}
            fontSize="h4.fontSize"
            sx={{
              color: (active && isPathMatched) ? 'text.primary' : null,
            }}
          />
        )}
      </ListItemIcon>
      <ListItemText
        primary={subheader}
        sx={{
          '& .MuiListItemText-primary': {
            color: (active && isPathMatched) ? 'text.primary' : null,
          },
        }}
      />
    </ListItemButton>
  );
};

export default ListItem;
