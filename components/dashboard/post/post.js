import styles from './post.module.scss';
import {
  Stack,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  TextField,
  useMediaQuery
}
  from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function PostComponent(props) {
  const { user } = useSelector((state) => state.user);
  const [open, setIsOpened] = useState(false);
  const [message, setMessage] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setIsOpened(true);
  }

  const handleClose = () => {
    setIsOpened(false);
  }

  const handlePost = () => {
    const from = user._id;
    const token = localStorage.getItem('token');
    axios.post(`https://tetherapi.herokuapp.com/tether/post/${user._id}/`, {
      from: from,
      content: message
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error('Error ' + err);
      })
  }
  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      className={styles.postContainer}
    >
      <Avatar alt="user-image" sx={{ width: 50, height: 50 }} src={user.ProfilePicture} />
      <input placeholder="What do you have to say?" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        {open && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 2,
              top: 2,
            }}
          >
            <Close />
          </IconButton>
        )}
        <DialogTitle sx={{ padding: 8 }}>Create A Post</DialogTitle>
        <TextField
          autoFocus
          label="What do you want to say to the world?"
          type="text"
          fullWidth
          margin="dense"
          variant="standard"
          onChange={(e) => setMessage(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}