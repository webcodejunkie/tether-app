import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { unSetUser } from '../../features/users/userSlice';

export default function Navigation() {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const onLogOut = () => {
    localStorage.clear();
    dispatch(unSetUser());
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.brandWrapper}>
        <h1>Tether</h1>
      </div>
      <ul className={styles.container}>
        <li className={styles.navLinks}>
          <Link href="/home">
            <a>Home</a>
          </Link>
        </li>
        {
          user ?
            <div>

            </div>
            :
            <li className={styles.navLinks}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
        }
        {
          user ?
            <div>

            </div>
            :
            <li className={styles.navLinks}>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
        }
        {
          user ?
            <li className={styles.navLinks} onClick={onLogOut}>
              <Link href="/">
                <a>Sign Out</a>
              </Link>
            </li>
            :
            <div>

            </div>
        }
      </ul>
    </nav>
  );
}