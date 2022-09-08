import styles from '../scss/dashboard.module.scss';
import { Grid, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/react';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { unSetUser } from '../../features/users/userSlice';
import axios from 'axios';
// Components
import UserCard from '../../components/dashboard/user-card/user-card';
import Game from '../../components/home/game-card/game';
import Layout from '../../components/layout';

const override = css`
  color: 'white'
`;

export default function DashBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const friends = user.Friends;
  const favorites = user.Favorites;

  const [dashloaded, setDashLoaded] = useState(true);
  const [usersFriends, setFriendsList] = useState([]);
  const [users, setUsersList] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    dashboardLoader();
  }, [user]);

  // Loading all hooks at within another Hook
  const dashboardLoader = () => {
    checkUser();
    userFavRequests();
    setFriends();
    setUsers();
  }

  // Check to see if user is active
  const checkUser = () => {
    if (!user) {
      dispatch(unSetUser());
      router.push('/login');
    }
    console.log(user);
  }

  // Display All Users 
  const setUsers = async () => {
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

  // Display Friends List
  const setFriends = async () => {
    const friendsList = [];
    const token = localStorage.getItem('token');
    // For loop, loop over friends and for each friend a request to be made
    for (let i = 0; i < friends.length; i++) {
      let friend = friends[i];
      await axios.get(`https://tetherapi.herokuapp.com/tether/${friend}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          const data = res.data;
          // push results to array
          friendsList.push(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    }
    // set results of the array to setState
    setFriendsList(friendsList);
  }

  // Display User Favorites
  const userFavRequests = async () => {
    let userFavorites = [];
    // For each id in the users favorites, make a request to rawg for the game's details
    for (let i = 0; i < favorites.length; i++) {
      await axios.get('https://api.rawg.io/api/games/' + favorites[i] + process.env.RAWG_API_KEY, {
      })
        .then((res) => {
          const data = res.data;
          // push results to array
          userFavorites.push(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    }
    // set state for loading to false and push results to setState
    setDashLoaded(false);
    setUserFavs(userFavorites);
  }

  // if dashboard is loaded, display UI, otherwise, keep react spinners

  if (dashloaded) {
    return <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100vh' }}><FadeLoader loading={dashloaded} color="#FFF" size={150} css={override} /></Grid>
  } else {
    return (
      <Stack sx={{ padding: '40px' }}>
        <Stack
          justifyContent="space-between"
          direction={{ md: 'column', lg: 'row' }}
          spacing={2}
        >
          <Stack
            alignContent="center"
          >
            <h2 className={styles.favoritesHeader}>My Favorites</h2>
            <Grid
              container
              direction="row"
              justifyContent="center"
            >
              {
                favorites.length === 0 ?
                  <h3 className={styles.favoritesHeader}>Add some games for easy access!</h3>
                  :
                  userFavs.map((game, index) => {
                    return (
                      <Game index={index} game={game} />
                    )
                  })
              }
            </Grid>
          </Stack>
          <Stack
            alignItems="center"
          >
            {
              friends.length === 0 ?
                <h2 className={styles.friendsHeader}>Make some friends, add people today!</h2>
                :
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <h2 className={styles.friendsHeader}>Friends</h2>
                  <Grid
                    container
                    justifyContent="center"
                    direction="row">
                    {
                      usersFriends.map((users, index) => {
                        return (
                          <UserCard index={index} users={users} />
                        )
                      })
                    }
                  </Grid>
                </Grid>
            }
            <Grid sx={{ paddingTop: 15 }}>
              <h2 className={styles.userHeader}>Other players</h2>
              <Stack
                direction="column"
                justifyContent="center"
              >
                {
                  users.map((users, index) => {
                    if (users.Username === user.Username) {
                      console.log(true);
                    }
                    return (
                      <UserCard index={index} users={users} />
                    )
                  })
                }
              </Stack>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    )
  }
}

DashBoard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}