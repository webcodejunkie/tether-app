import styles from './user-features.module.scss';
import Stack from '@mui/material/Stack';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { setFriend, unSetFriend } from '../../../store/reducers/userSlice';
import classNames from 'classnames';
import axios from 'axios';

// Todo: update this function @webcodejunkie

export default function UserFeatures(props) {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const onFriend = () => {
		const token = localStorage.getItem('token');

		axios.post(`https://tetherapi.herokuapp.com/tether/${user.Username}/user/` + props.users.Username, {}, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				dispatch(setFriend(`${props.users.Username}`));
				const data = res;
				console.log(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
	}

	const onUnFriend = () => {
		const token = localStorage.getItem('token');

		axios.delete(`https://tetherapi.herokuapp.com/tether/${user.Username}/user/` + props.users.Username, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				dispatch(unSetFriend(`${props.users.Username}`));
				const data = res;
				console.log(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
	}

	return (
		<Stack direction="row" spacing={2} className={styles.featureContainer}>
			{
				(user.Friends.some(el => el.includes(props.users.Username))) ?
					(
						<Stack
							direction="row"
						>
							<PersonRemoveIcon className={classNames(
								(user.Friends.some(el => el.includes(props.users.Username))) && styles.isOnUnfriend,
							)} onClick={onUnFriend} />
							<PersonIcon className={classNames(
								styles.icons,
								(user.Friends.some(el => el.includes(props.users.Username))) && styles.isFriended,
							)} />
						</Stack>
					)
					:
					<PersonAddAltIcon className={classNames(
						styles.icons,
					)} onClick={onFriend} />
			}
		</Stack>
	)
}