import styles from './search-bar.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NProgress from 'nprogress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AlertBar from '../../alert/alert';

export default function SearchBar(props) {

  useEffect(() => {
    isPresent();
  })

  const [searchGame, setSearchGame] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  let uncapSearch = searchGame.toLowerCase();

  const gameSearch = (e) => {
    e.preventDefault();
    let search = `&search=${uncapSearch}`
    props.reLoader();
    NProgress.start();
    if (!isError) {
      axios.get('https://api.rawg.io/api/games' + process.env.RAWG_API_KEY + search, {
      })
        .then((res) => {
          const data = res.data.results;
          let newTitle = searchGame.toUpperCase();
          props.setTitle(newTitle);
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
  }

  const isPresent = () => {
    let keywords = [
      'porn',
      'sex'
    ];

    let filteredKeys = keywords.some(element => searchGame.includes(element));

    if (filteredKeys) {
      setIsError(true);
      setError(`This keyword is not accepted (${uncapSearch})`);
    } else {
      setIsError(false);
      setError('');
    }
  }

  return (
    <form className={styles.inputWrapper}>
      {
        isError && <AlertBar error={error} errorType={'error'} class={styles.searchError} />
      }
      < input
        placeholder='Search Games'
        onChange={(e) => { setSearchGame(e.target.value) }}
        value={searchGame}
        className={styles.searchInput}
      />
      < input
        type='submit'
        onClick={(e) => { gameSearch(e) }}
        className={styles.submitButton}
      />

    </form>
  )
}