import styles from './user-features.module.scss';
import Stack from '@mui/material/Stack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { setFriend, unSetFriend } from '../../../features/users/userSlice';
import classNames from 'classnames';
import axios from 'axios';

export default function UserFeatures(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFriend = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    axios.post(`https://tetherapi.herokuapp.com/tether/${user}/user/` + props.id, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        dispatch(setFriend(`${props.id}`));
        const data = res;
        console.log(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const onUnFriend = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    axios.delete(`https://tetherapi.herokuapp.com/tether/${user}/user/` + props.id, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        dispatch(unSetFriend(`${props.id}`));
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
        (user.user.Friends.some(el => el.includes(props.id))) ?
          <PersonIcon className={classNames(
            styles.icons,
            (user.user.Friends.some(el => el.includes(props.id))) && styles.isFriended,
          )} onClick={onUnFriend} />
          :
          <PersonAddAltIcon className={classNames(
            styles.icons,
          )} onClick={onFriend} />
      }
    </Stack>
  )
}