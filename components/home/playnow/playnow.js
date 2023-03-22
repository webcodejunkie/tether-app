import { useState, useEffect } from "react";
import styles from './playnow.module.scss'
import { Button, Stack, Grid } from '@mui/material';
import { FadeLoader } from "react-spinners";
// Redux
import { useSelector } from "react-redux";
// Material UI
import GroupIcon from '@mui/icons-material/Group';
import { io } from 'socket.io-client';

export default function PlayNow(props) {
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		const socket = io.connect('https://tetherapi.herokuapp.com/');
		let socketId = user._id;
		/*
		socket.emit("connected_user", socketId, () => {
			console.log(socketId);
		});
		*/
		console.log(socket);
		socket.id = user._id;
		console.log(socket.id);
	}, []);


	const [open, isModalOpen] = useState(false);
	const [loading, isLoading] = useState(true);

	const showModal = () => {
		document.body.style.overflow = 'hidden';
		isModalOpen(true);
	}

	const hideModal = () => {
		document.body.style.overflow = '';
		isModalOpen(false);
	}

	const Modal = () => {
		return (
			<Grid
				container
				justifyContent="space-between"
				alignItems="center"
				flexDirection="column"
				className={styles.playNowModal}
			>
				<p>Finding you a player playing - {props.game.name}..</p>
				<img
					className={styles.imageContainer}
					src={props.game.background_image}
				/>
				<Stack
					flexDirection="row"
					alignItems="center"
				>
					<Stack
						alignItems="center"
					>
						{
							user ? <GroupIcon fontSize="large" sx={{ margin: '10px' }} htmlColor="lime" /> : <GroupIcon fontSize="large" sx={{ margin: '10px' }} />
						}
						<p>{user.Username}</p>
					</Stack>
					{
						loading && <FadeLoader color="#FFF" loading={loading} size={150} />
					}
					<GroupIcon fontSize="large" sx={{ margin: '10px' }} />
				</Stack>
				<Button onClick={hideModal} color="error">
					Cancel
				</Button>
			</Grid>
		)
	}

	return (
		<div>
			<Button onClick={showModal}>
				Play Now
			</Button>
			{open && <Modal />}
		</div>
	)
}