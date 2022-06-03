import styles from './top-menu.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

  const [title, setTitle] = useState('New and Trending');
  const [searchGame, setSearchGame] = useState('');
  const [sGenres, setSGenres] = useState(false);


  const showGenres = () => {
    setSGenres(true);
  }

  const closeGenres = () => {
    setSGenres(false);
  }

  const gameSearch = (e) => {
    e.preventDefault();
    let uncapSearch = searchGame.toLowerCase();
    let newTitle = searchGame.toUpperCase();
    let search = `&search=${uncapSearch}`
    axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + search, {
    })
      .then((res) => {
        console.log(res);
        const data = res.data.results;
        setTitle(newTitle);
        props.setNext(res.data.next);
        props.setPrevious(res.data.previous);
        props.setGames(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
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
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + trendingRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Singleplayer') {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + singlePRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Multiplayer') {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + multiplayerRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Adventure') {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + adventureRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Horror') {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + horrorRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    } else if (newTitle === 'Action') {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + actionRequest, {
      })
        .then((res) => {
          console.log(res);
          const data = res.data.results;
          props.setNext(res.data.next);
          props.setPrevious(res.data.previous);
          props.setGames(data);
        })
        .catch((err) => {
          console.error('Error: ' + err);
        });
    }

    setTitle(newTitle);
  }

  return (
    <div>
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
        <form className={styles.inputWrapper}>

          < input
            placeholder='Search Games'
            onChange={(e) => { setSearchGame(e.target.value) }}
            value={searchGame}
          />
          < input
            type='submit'
            onClick={(e) => { gameSearch(e) }}
            className={styles.submitButton}
          />

        </form>
      </div>
      <h1 className={styles.headerTitle}>{title}</h1>
    </div>
  )
}