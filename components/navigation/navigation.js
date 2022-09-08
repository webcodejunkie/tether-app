import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector } from 'react-redux';
import DashBtn from '../dashboard/dashboard-btn/dashBtn';
import { Avatar, Button, Switch, Typography, createTheme, ThemeProvider } from '@mui/material';

export default function Navigation() {
  const { user } = useSelector((state) => state.user);

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
        <ThemeProvider theme={theme}>
          <Link href="/">
            <Button color="link">
              Tether
            </Button>
          </Link>
        </ThemeProvider>
      </div>

      <ul className={styles.container}>
        <div className={styles.avatarEl}>
          {user && (
            <ThemeProvider theme={theme}>
              <Link href="/profile">
                <Button color="link">
                  <Avatar
                    alt="user-photo"
                    src={user.ProfilePicture}
                    sx={{ width: 40, height: 40 }}
                  />
                  {user && <h5>{user.Username}</h5>}
                </Button>
              </Link>
            </ThemeProvider>
          )}
        </div>

        {user && <DashBtn />}

        {!user && (
          <ThemeProvider theme={theme}>
            <Link href="/login">
              <Button color="link">
                Login
              </Button>
            </Link>
          </ThemeProvider>
        )}
        {!user && (
          <ThemeProvider theme={theme}>
            <Link href="/signup">
              <Button color="link">
                Sign Up
              </Button>
            </Link>
          </ThemeProvider>
        )}
      </ul>
    </nav>
  );
}