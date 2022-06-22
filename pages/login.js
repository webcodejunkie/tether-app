import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
import styles from './scss/login.module.scss';
import Layout from '../components/layout';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/users/userSlice';

export default function Login() {

  useEffect(() => {
    errorChecker();
  });


  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState('');

  const isLoading = () => {
    console.log(loading);
    if (loading === true) {
      setLoaded('Loading..');
    } else if (loading === false) {
      setLoaded('Loaded!');
    }
  }

  const handleSubmit = (e) => {
    isLoading();
    e.preventDefault();
    axios.post('https://tetherapi.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
      .then((res) => {
        const data = res.data;
        dispatch(setUser(data));
        console.log(user);
        localStorage.setItem('username', data.user.Username);
        localStorage.setItem('token', data.token);
        router.push('/home');
      })
      .catch((err) => {
        console.error('Error: ' + err);
        setError('Something went wrong.');
      });
  }

  const errorChecker = () => {

    if ((username && password) === '' || null) {
      setError('Please enter in all fields.');
    }

    setTimeout(() => {
      setError('');
    }, 8000);
  }

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm}>
        <p className={styles.errorAlert}>
          {error}
        </p>
        <h1>Login</h1>
        <label className={styles.labelText}>Username</label>
        <input value={username} type="text" onChange={e => setUsername(e.target.value)} />
        <label className={styles.labelText}>Password</label>
        <input value={password} type="text" onChange={e => setPassword(e.target.value)} />
        <p>
          {loaded}
        </p>
        <input className={styles.submitButton} type="submit" onClick={handleSubmit} />
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