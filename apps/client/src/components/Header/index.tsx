import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box } from '@mui/material';

import ActionsBar from '../ActionsBar';

import { StyledBox } from './styles';

interface HeaderProps {
  isAuthenticated?: boolean;
}
function Header({ isAuthenticated }: HeaderProps) {
  return (
    <Box sx={{ position: 'fixed', top: 0, zIndex: 9999, width: '100%' }}>
      <StyledBox>
        <Link to="/">
          <Avatar
            sx={{ width: '5rem', height: '5rem' }}
            alt="Karma logo"
            src="/img/logo_2.png"
          />
        </Link>
        {isAuthenticated && <ActionsBar />}
      </StyledBox>
    </Box>
  );
}

Header.defaultProps = {
  isAuthenticated: false,
};

export default Header;
