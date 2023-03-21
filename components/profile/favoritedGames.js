import { Stack, Grid } from "@mui/material";
import { FadeLoader } from "react-spinners";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Game from "../home/game-card/game";
import { css } from '@emotion/react';
import styles from '../../pages/scss/profile.module.scss';

const override = css`
  color: 'white'
`;

export default function FavoritedGameComponent() {
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		userFavRequests();
	}, [user]);

	const [userFavs, setUserFavs] = useState([]);
	const [dashloaded, setDashLoaded] = useState(true);
	const favorites = user.Favorites;

	// Display User Favorites
	const userFavRequests = async () => {
		let userFavorites = [];
		// For each id in the users favorites, make a request to rawg for the game's details
		for (let i = 0; i < favorites.length; i++) {
			await axios.get('https://api.rawg.io/api/games/' + favorites[i] + process.env.RAWG_API_KEY, {
			})
				.then((res) => {
					const data = res.data;
					// push results to array
					userFavorites.push(data);
				})
				.catch((err) => {
					console.error('Error: ' + err);
				});
		}
		// set state for loading to false and push results to setState
		setDashLoaded(false);
		setUserFavs(userFavorites);
	}


	if (dashloaded) {
		return <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100vh' }}><FadeLoader loading={dashloaded} color="#FFF" size={150} css={override} /></Grid>
	} else {
		return (
			<Stack
				alignContent="center"

			>
				<h2 className={styles.favoritesHeader}>My Favorites</h2>
				<Grid
					container
					direction="row"
					justifyContent="center"
					sx={{ backgroundColor: '#161414', padding: '3rem 0' }}
				>
					{
						favorites.length === 0 ?
							<h3 className={styles.favoritesHeader}>Add some games for easy access!</h3>
							:
							userFavs.map((game, index) => {
								return (
									<Game key={index} game={game} />
								)
							})
					}
				</Grid>
			</Stack>
		)
	}
}