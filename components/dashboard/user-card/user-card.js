import styles from './user-card.module.scss';

import { Stack, Avatar } from '@mui/material';
import UserFeatures from '../user-card-features/userFeatures';

import { useSelector } from "react-redux";

export default function UserCard(props) {

  const { user } = useSelector((state) => state.user);

  return (
    <div className={styles.userCardContainer}>
      <Avatar alt="user-image" sx={{ width: 100, height: 100 }} src={props.users.ProfilePicture} />
      <Stack
        alignItems="center"
      >
        <p className={styles.username}>{props.users.Username}</p>
        {
          props.users.Username !== user.Username && <UserFeatures users={props.users} />
        }
      </Stack>
    </div>
  )
}