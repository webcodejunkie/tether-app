import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DashBtn from '../dashboard/dashboard-btn/dashBtn';
import Button from '@mui/material/Button';

export default function Navigation() {
  const { user } = useSelector((state) => state.user)

  const theme = createTheme({
    palette: {
      link: {
        main: '#00000',
        constrastText: '#fff'
      }
    }
  });

  return (
    <nav className={styles.wrapper}>
      <div className={styles.brandWrapper}>
        <h1>Tether</h1>
      </div>

      <ul className={styles.container}>

        <div className={styles.avatarEl}>
          {user && (
            <Avatar
              alt="user-photo"
              src={user.ProfilePicture}
              sx={{ width: 40, height: 40 }}
            />
          )}
          {user && <h5>{user.Username}</h5>}
        </div>

        {user && (
          <ThemeProvider theme={theme}>
            <Link href="/home">
              <Button color="link">
                Home
              </Button>
            </Link>
          </ThemeProvider>
        )}
        {user && (
          <ThemeProvider theme={theme}>
            <Link href="/community">
              <Button color="link">
                Communities
              </Button>
            </Link>
          </ThemeProvider>
        )}
        {user && <DashBtn />}

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