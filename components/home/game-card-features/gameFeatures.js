import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './features.module.scss';
import classNames from 'classnames';
import { useSelector, useDispatch } from "react-redux";
import { setFavorites, unFavorite } from '../../../features/users/userSlice';

import axios from 'axios';

export default function GameFeatures(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFavorite = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    axios.post(`https://tetherapi.herokuapp.com/tether/${user}/game/` + props.id, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        dispatch(setFavorites(`${props.id}`));
        const data = res;
        console.log(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const onUnFavorite = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    axios.delete(`https://tetherapi.herokuapp.com/tether/${user}/game/` + props.id, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
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
      <PersonSearchIcon className={classNames(
        styles.icons,
      )}
        sx={{ fontSize: 35 }} />

      {
        user && (user.user.Favorites.some(el => el.includes(props.id))) ?
          <FavoriteIcon className={classNames(
            styles.icon,
            (user.user.Favorites.some(el => el.includes(props.id))) && styles.isFavorited
          )}
            sx={{ fontSize: 35 }} onClick={onUnFavorite} />
          :
          <FavoriteBorderIcon
            className={styles.icons}
            onClick={(e) => { onFavorite(e) }}
            sx={{ fontSize: 35 }}
          />
      }
    </div>
  )
}