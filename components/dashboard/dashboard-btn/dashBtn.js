import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
          <MenuIcon />
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
        }}>
        <Link href="/home">
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link href="/community">
          <MenuItem onClick={handleClose}>Communities</MenuItem>
        </Link>
        <Link href="/dashboard">
          <MenuItem onClick={handleClose}>Dashboard</MenuItem>
        </Link>
        <Link href="/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Link href="/">
          <MenuItem onClick={() => { handleClose(); onLogOut(); }}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  )

}