import styles from '../scss/dashboard.module.scss';
import Layout from '../../components/layout';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { unSetUser } from '../../features/users/userSlice';
import axios from 'axios';
import UserCard from '../../components/dashboard/user-card/user-card';

export default function DashBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    checkUser();
    setUsersOnLoad();
  }, [user]);

  const checkUser = () => {
    if (!user) {
      dispatch(unSetUser());
      router.push('/login');
    }
    console.log(user);
  }

  const setUsersOnLoad = async () => {
    const token = localStorage.getItem('token');
    await axios.get('https://tetherapi.herokuapp.com/tether/findplayers', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const data = res.data;
        setUsersList(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  return (
    <div className={styles.userList}>
      {
        usersList.map((el, index) => {
          return (
            <UserCard key={index} users={el} />
          )
        })
      }
    </div>
  )
}

DashBoard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}