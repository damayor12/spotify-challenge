import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@material-ui/core';
import { useHeaderStyles } from '../styles';

const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const classes = useHeaderStyles();

  return (
    <>
      <header className={classes.header}>
        Spotfity search
        {isLoggedIn && (
          <Button
            onClick={logout}
            style={{
              marginLeft: '5rem',
              padding: '0.1rem',
              float: 'right',
              display: '',
            }}
          >
            logout
          </Button>
        )}
      </header>
    </>
  );
};

export default Header;
