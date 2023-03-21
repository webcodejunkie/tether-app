import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './features.module.scss';
import classNames from 'classnames';
import { useSelector, useDispatch } from "react-redux";
import { setFavorites, unFavorite } from '../../../store/reducers/userSlice';

import axios from 'axios';
import PlayNow from '../playnow/playnow';

export default function GameFeatures(props) {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// Favorite Game Hook
	const onFavorite = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('username');

		axios.post(`https://tetherapi.herokuapp.com/tether/${user}/game/` + props.id, {}, {
			headers: { Authorization: `Bearer ${token}`, }
		})
			.then((res) => {
				// Also reflect change to redux to take UI effects
				dispatch(setFavorites(`${props.id}`));
				const data = res;
				console.log(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
	}

	// Unfavorite Game
	const onUnFavorite = () => {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('username');

		axios.delete(`https://tetherapi.herokuapp.com/tether/${user}/game/` + props.id, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				// Also reflect change to redux to take UI effects
				dispatch(unFavorite(`${props.id}`));
				console.log({ user });
				const data = res;
				console.log(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
	}

	return (
		<div className={styles.featuresContainer}>
			<PlayNow id={props.id} game={props.game} />

			{
				// Check to see if redux changes occured and update UI
				user && (user.Favorites.some(el => el.includes(props.id))) ?
					<RemoveIcon className={classNames(
						styles.icon,
						(user.Favorites.some(el => el.includes(props.id))) && styles.isFavorited
					)}
						sx={{ fontSize: 35 }} onClick={onUnFavorite} />
					:
					<AddIcon
						className={styles.icons}
						onClick={(e) => { onFavorite(e) }}
						sx={{ fontSize: 35 }}
					/>
			}
		</div>
	)
}