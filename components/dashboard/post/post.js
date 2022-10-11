import styles from './post.module.scss';
import * as React from 'react';
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
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostComponent(props) {
	const { user } = useSelector((state) => state.user);
	const [open, setIsOpened] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [severity, setSeverity] = useState('');
	const [openAlert, setOpenAlert] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenAlert(false);
	};

	const handleClickOpen = () => {
		setIsOpened(true);
	}

	const handleClose = () => {
		setIsOpened(false);
	}

	const handlePost = () => {
		const userID = user._id;
		const avatar = user.ProfilePicture;
		const username = user.Username;
		const token = localStorage.getItem('token');
		axios.post(`https://tetherapi.herokuapp.com/posts/post/${user._id}/`, {
			UserID: userID,
			Avatar: avatar,
			Username: username,
			content: message
		}, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				setIsOpened(false)
				setOpenAlert(true);
				setSeverity('success');
				setError(`Your post has been published!`)
				const data = res.data;
				console.log(data);
			})
			.catch((err) => {
				setOpenAlert(true);
				setSeverity('danger');
				setError('Sorry, something went wrong.. Try again.');
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
			<Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
				<Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>
		</Stack>
	)
}