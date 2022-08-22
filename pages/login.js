import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import styles from './scss/login.module.scss';
import Layout from '../components/layout';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/users/userSlice';
import { FadeLoader } from 'react-spinners';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [severity, setSeverity] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    setLoaded(true)
    e.preventDefault();
    axios.post('https://tetherapi.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
      .then((res) => {
        setLoaded(false);
        setSeverity('success');
        setError("Welcome back!");
        const userData = res.data.user;
        const data = res.data;
        dispatch(setUser(userData));
        localStorage.setItem('username', data.user.Username);
        localStorage.setItem('token', data.token);
        router.push('/home');
      })
      .catch((err) => {
        console.error('Error: ' + err);
        setLoaded(false);
        setOpen(true);
        setSeverity('warning');
        setError("Something went wrong, please check the Username and Password.");
      });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <form className={styles.loginForm}>
        <h1>Login</h1>
        <label className={styles.labelText}>Username</label>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <label className={styles.labelText}>Password</label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <input className={styles.submitButton} type="submit" onClick={handleSubmit} />
        {
          loading && <FadeLoader color="#FFF" loading={loaded} size={150} />
        }
      </form>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}