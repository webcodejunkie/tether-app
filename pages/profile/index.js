import styles from '../scss/profile.module.scss';
import Layout from "../../components/layout";
import { Avatar, Grid, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import FavoritedGameComponent from '../../components/profile/favoritedGames';
import FeedCard from '../../components/dashboard/feed/card/feed-card';

export default function Profile() {

	useEffect(() => {
		getMyPosts();
	}, []);

	const { user } = useSelector((state) => state.user);

	const [myPosts, setMyPosts] = useState([]);

	const getMyPosts = () => {
		const token = localStorage.getItem('token');
		axios.get(`https://tetherapi.herokuapp.com/posts/${user._id}/posts`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				const data = res.data;
				setMyPosts(data);
			})
			.catch((err) => {
				console.error("Error: " + err);
			});
	}

	return (
		<Grid
			container
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			sx={{ padding: '3rem 0', color: "#FFF" }}
			className={styles.profileContainer}
		>
			<Stack
				container
				flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
				justifyContent="space-between"
				sx={{ padding: '0 10px', width: '100%' }}
			>
				{/* Number of Friends */}
				<Stack
					flexDirection="row"
					justifyContent="center"
					alignItems="flex-end"
					color="lightgreen"
				>
					{/* Avatar */}
					<Avatar src={user.ProfilePicture} sx={{ width: 250, height: 250 }} />
					<Stack
					>
						<PersonIcon />
						<Typography variant="body1">{user.Friends.length} Friends</Typography>
						<Typography variant="h4">{user.Username}</Typography>
					</Stack>
				</Stack>
				{/* Badges */}
				<Stack
					flexDirection="column"
					alignItems="center"
				>
					<Typography variant="body1">BADGES</Typography>
					<Stack
					>
						{
							(user.PlayerType === 'I am a casual gamer!') && (
								<Typography variant="body1" className={styles.badges}>Casual Gamer</Typography>
							)
						}
						{
							(user.PlayerType === "I'm a casual gamer, but I also like to be competitive!") && (
								<Typography variant="body1" className={styles.badges}>Recreational Gamer</Typography>
							)
						}
						{
							(user.PlayerType === "I'm in it to win it, it's all or nothing!") && (
								<Typography variant="body1" className={styles.badges}>Competitive Gamer</Typography>
							)
						}

					</Stack>
				</Stack>
			</Stack>

			{/*Into & Posts Wrapper*/}
			<Grid
				container
				flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
				flexWrap="nowrap"
			>
				{/*Into Container*/}
				<Grid
					item
					flexBasis="100%"
				>
					<Stack
						container
						flexDirection="column"
						className={styles.introContainer}
					>
						{/*Into*/}
						<Typography variant="body1">INTRO</Typography>
						<Typography variant="body1">{user.Bio}</Typography>
						<hr />
						{/* Location Display */}
						<Stack
						>
							<Typography variant="body1">FROM</Typography>
							<Typography>{user.Country}</Typography>
							<Typography>{user.Region}</Typography>
						</Stack>
					</Stack>
				</Grid>

				{/*Posts Container*/}
				<Grid
					container
					flexDirection="column"
					columns={{ xs: 3, md: 3, lg: 12 }}
					xs={12}
					alignItems={{ xs: "center", md: "center", lg: "flex-start" }}
					flexBasis="100%"
				>
					{/* Posts Component */}
					<Stack className={styles.postContainer}>
						<Typography variant="body1">POSTS</Typography>
					</Stack>
					{
						myPosts.map((posts, index) => {
							return (
								<FeedCard posts={posts} key={index} />
							)
						})
					}
				</Grid>
			</Grid>
			<FavoritedGameComponent />
		</Grid>
	)
}

Profile.getLayout = function getLayout(page) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}