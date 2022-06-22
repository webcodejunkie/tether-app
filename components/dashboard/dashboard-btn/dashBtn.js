import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unSetUser } from '../../../features/users/userSlice';

export default function DashBtn(props) {
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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
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