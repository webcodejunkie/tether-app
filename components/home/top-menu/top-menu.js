import styles from './top-menu.module.scss';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import axios from 'axios';
import NProgress from 'nprogress';

export default function TopMenu(props) {
  useEffect(() => {
  }, []);

  const trendingRequest = '&dates=2020-10-10,2022-10-10&ordering=-added';
  const singlePRequest = '&tags=singleplayer&dates=2020-10-10,2022-10-10&ordering=-added';
  const multiplayerRequest = '&tags=multiplayer&dates=2020-10-10,2022-10-10&ordering=-added';
  const adventureRequest = '&genres=adventure';
  const horrorRequest = '&tags=horror&dates=2020-10-10,2022-10-10&ordering=-added';
  const actionRequest = '&genres=action&dates=2020-10-10,2022-10-10&ordering=-added';

  const nTSearch = () => {
    const trendingRequest = '&dates=2020-10-10,2022-10-10&ordering=-added';
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + trendingRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('New And Trending');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });

  }

  const sPSearch = () => {
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + singlePRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('Singleplayer');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const mPSearch = () => {
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + multiplayerRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('Multiplayer');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const aDSearch = () => {
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + adventureRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('Adventure');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const hRSearch = () => {
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + horrorRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('Horror');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const aTSearch = () => {
    NProgress.start();
    props.reLoader();
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + actionRequest, {
    })
      .then((res) => {
        const data = res.data.results;
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
        props.setLoading(false);
        props.setTitle('Action');
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  return (
    <div className={styles.topMenuContainer}>
      <div className={styles.topMenuWrapper}>
        <Stack
        >
          <p
            onClick={nTSearch}
            className={styles.topMenuLinks}
          >
            New and Trending
          </p>
          <p
            onClick={sPSearch}
            className={styles.topMenuLinks}
          >
            Singleplayer
          </p>
          <p
            onClick={mPSearch}
            className={styles.topMenuLinks}
          >
            Multiplayer
          </p>
          <p
            onClick={aDSearch}
            className={styles.topMenuLinks}
          >
            Adventure
          </p>
          <p
            onClick={hRSearch}
            className={styles.topMenuLinks}
          >
            Horror
          </p>
          <p
            onClick={aTSearch}
            className={styles.topMenuLinks}
          >
            Action
          </p>
        </Stack>
      </div>
    </div>
  )
}