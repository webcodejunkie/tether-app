import styles from '../scss/profile.module.scss';
import Layout from "../../components/layout";
import { Avatar, Grid, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import FavoritedGameComponent from '../../components/profile/favoritedGames';

export default function Profile() {
	const { user } = useSelector((state) => state.user);

	return (
		<Grid
			container
			flexDirection="column"
			justifyContent="center"
			sx={{ padding: '3rem 0', color: "#FFF" }}
			className={styles.profileContainer}
		>
			<Stack
				container
				flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
				justifyContent="space-between"
			>
				{/* Number of Friends */}
				<Stack
					flexDirection="row"
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
			<Grid
				container
				flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
			>
				<Grid
					item
				>
					<Stack
						container
						flexDirection="column"
						className={styles.introContainer}
						noWrap
					>
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

				<Grid
					item
				>
					{/* Posts Component */}
					<Stack className={styles.postContainer}>
						<Typography variant="body1">POSTS</Typography>
					</Stack>
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