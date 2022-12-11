import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

function ActionsBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <IconButton
          size='large'
          color='inherit'
          aria-label='notification'
          component='label'
        >
          <NotificationsIcon fontSize='inherit' />
        </IconButton>
        <IconButton
          sx={{ paddingRight: 0 }}
          size='large'
          color='inherit'
          aria-label='personal'
          component='label'
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize='inherit' />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemButton
            sx={{ padding: 0 }}
            href='/change-password'
            LinkComponent={Link}
          >
            <ListItemIcon>
              <SettingsIcon fontSize='small' />
            </ListItemIcon>
            Thay đổi mật khẩu
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton
            sx={{ padding: 0 }}
            href='/logout'
            LinkComponent={Link}
          >
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Đăng xuất
          </ListItemButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionsBar;
