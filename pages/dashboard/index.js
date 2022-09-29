import styles from '../scss/dashboard.module.scss';
import { Grid, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { FadeLoader } from 'react-spinners';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { unSetUser } from '../../store/reducers/userSlice';
import axios from 'axios';
// Components
import UserCard from '../../components/dashboard/user-card/user-card';
import Game from '../../components/home/game-card/game';
import Layout from '../../components/layout';
import PostComponent from '../../components/dashboard/post/post';
import FeedComponent from '../../components/dashboard/feed/feed';

const override = css`
  color: 'white'
`;

export default function DashBoard() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = useSelector((state) => state.user);
	const friends = user.Friends;

	const [dashloaded, setDashLoaded] = useState(true);
	const [usersFriends, setFriendsList] = useState([]);
	const [users, setUsersList] = useState([]);

	useEffect(() => {
		dashboardLoader();
	}, [user]);

	// Loading all hooks at within another Hook
	const dashboardLoader = () => {
		checkUser();
		setFriends();
		setUsers();
	}

	// Check to see if user is active
	const checkUser = () => {
		if (!user) {
			dispatch(unSetUser());
			router.push('/login');
		}
		console.log(user);
	}

	// Display All Users 
	const setUsers = async () => {
		const token = localStorage.getItem('token');
		await axios.get('https://tetherapi.herokuapp.com/tether/findplayers', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				const data = res.data;
				setUsersList(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
		setDashLoaded(false);
	}

	// Display Friends List
	const setFriends = async () => {
		const friendsList = [];
		const token = localStorage.getItem('token');
		// For loop, loop over friends and for each friend a request to be made
		for (let i = 0; i < friends.length; i++) {
			let friend = friends[i];
			await axios.get(`https://tetherapi.herokuapp.com/tether/${friend}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((res) => {
					const data = res.data;
					// push results to array
					friendsList.push(data);
				})
				.catch((err) => {
					console.error('Error: ' + err);
				});
		}
		// set results of the array to setState
		setFriendsList(friendsList);
	}

	// if dashboard is loaded, display UI, otherwise, keep react spinners

	if (dashloaded) {
		return <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100vh' }}><FadeLoader loading={dashloaded} color="#FFF" size={150} css={override} /></Grid>
	} else {
		return (
			<Grid
				container
				flexDirection="row"
				sx={{ padding: '40px' }}
			>
				<Grid
					container
					justifyContent="center"
				>
					<PostComponent />
				</Grid>
				<Grid
					container
					alignItems="center"
				>
					<FeedComponent />
				</Grid>
				<Grid
					container
					justifyContent="flex-end"
				>
					<Stack
						direction="column"
						justifyContent="center"
					>
						<h2 className={styles.userHeader}>Meet Other Players</h2>
						{
							users.map((users, index) => {
								if (users.Username === user.Username) {
									console.log(true);
								}
								return (
									<UserCard index={index} users={users} />
								)
							})
						}
					</Stack>
				</Grid>
			</Grid>
		)
	}
}

DashBoard.getLayout = function getLayout(page) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}