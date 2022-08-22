import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unSetUser } from '../../../features/users/userSlice';

export default function DashBtn() {

  const theme = createTheme({
    palette: {
      link: {
        main: '#00000',
        constrastText: '#fff'
      }
    }
  })

  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
    localStorage.clear();
    dispatch(unSetUser());
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="link"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
      </ThemeProvider>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getcontentanchorel={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link href="/dashboard">
          <MenuItem onClick={handleClose}>Dashboard</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Link href="/">
          <MenuItem onClick={() => { handleClose(); onLogOut(); }}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  )

}