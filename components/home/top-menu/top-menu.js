import styles from './top-menu.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NProgress from 'nprogress';

export default function TopMenu(props) {
  useEffect(() => {
  }, []);

  let titles = [
    'New and Trending',
    'Singleplayer',
    'Multiplayer',
    'Adventure',
    'Horror',
    'Action'
  ];
  const [sGenres, setSGenres] = useState(false);


  const showGenres = () => {
    setSGenres(true);
  }

  const closeGenres = () => {
    setSGenres(false);
  }

  const setNewTitle = (el) => {
    const trendingRequest = '&dates=2020-10-10,2022-10-10&ordering=-added';
    const singlePRequest = '&tags=singleplayer&dates=2020-10-10,2022-10-10&ordering=-added';
    const multiplayerRequest = '&tags=multiplayer&dates=2020-10-10,2022-10-10&ordering=-added';
    const adventureRequest = '&genres=adventure';
    const horrorRequest = '&tags=horror&dates=2020-10-10,2022-10-10&ordering=-added';
    const actionRequest = '&genres=action&dates=2020-10-10,2022-10-10&ordering=-added';

    let newTitle = el;

    if (newTitle === 'New and Trending') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Singleplayer') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Multiplayer') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Adventure') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Horror') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Action') {
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
          NProgress.done();
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    }

    props.setTitle(newTitle);
  }

  return (
    <div className={styles.topMenuContainer}>
      <div className={styles.topMenuWrapper}>
        <div>
        </div>
        <div className={styles.topMenuLinkWrapper}>
          {
            titles.map((el, index) => {
              return (
                <div
                  key={index}
                  className={styles.topMenuLinks}
                  onClick={() => { setNewTitle(el) }}
                >
                  <p>{el}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}