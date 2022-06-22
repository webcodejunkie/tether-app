import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import DashBtn from '../dashboard/dashboard-btn/dashBtn';
import Button from '@mui/material/Button';

export default function Navigation() {
  const { user } = useSelector((state) => state.user)


  return (
    <nav className={styles.wrapper}>
      <div className={styles.brandWrapper}>
        <h1>Tether</h1>
      </div>
      <ul className={styles.container}>
        {user && (
          <Link href="/home">
            <Button>
              Home
            </Button>
          </Link>
        )}
        {user && <DashBtn />}

        <div className={styles.avatarEl}>
          {user && (
            <Avatar
              alt="user-photo"
              src={user.user.ProfilePicture}
              sx={{ width: 40, height: 40 }}
            />
          )}
          {user && <h5>{user.user.Username}</h5>}
        </div>

        {!user && (
          <li className={styles.navLinks}>
            <Link href="/login">
              <p className={styles.iconHover}>Login</p>
            </Link>
          </li>
        )}
        {!user && (
          <li className={styles.navLinks}>
            <Link href="/signup">
              <p className={styles.iconHover}>Sign Up</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}