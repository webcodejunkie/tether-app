import styles from './user-card.module.scss';

import Avatar from '@mui/material/Avatar';
import UserFeatures from '../user-card-features/userFeatures';

import { useSelector } from "react-redux";

export default function UserCard(props) {

  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.userCardContainer}>
      <Avatar alt="user-image" sx={{ width: 130, height: 130 }} src={props.users.ProfilePicture} />
      <p className={styles.username}>{props.users.Username}</p>
      <div className={styles.about} >
        <p>About Me</p>
        <small>{props.users.Bio}</small>
      </div>
      {
        props.users._id !== user.user._id && <UserFeatures id={props.users._id} />
      }
    </div>
  )
}