// Components
import Layout from "../../components/layout"
import Game from "../../components/game-card/game";
import SideMenu from "../../components/side-menu/side-menu";
import TopMenu from "../../components/top-menu/top-menu";

import axios from "axios"
import { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { unSetUser } from '../../features/users/userSlice';

import styles from '../scss/home.module.scss';

export default function HomeMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const [games, setGames] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  useEffect(() => {
    checkUser();
    getGames();
  }, [
    user
  ]);

  const newTrending = '&dates=2021-10-10,2022-10-10&ordering=-added';

  const checkUser = () => {
    if (user === null || undefined) {
      dispatch(unSetUser());
      router.push('/')
    }
    console.log(user);
  }

  const getGames = () => {
    axios.get(`https://api.rawg.io/api/games` + process.env.RAWG_API_KEY + newTrending, {
    })
      .then((res) => {
        console.log(res);
        console.log(res.data)
        const data = res.data.results;
        setGames(data);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        console.log(next);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      })
  }

  const getNext = () => {
    axios.get(next, {
    })
      .then((res) => {
        const data = res.data.results;
        setGames(data);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  const getPrevious = () => {
    axios.get(previous, {
    })
      .then((res) => {
        const data = res.data.results;
        setGames(data);
        setNext(res.data.next);
        setPrevious(res.data.previous)
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }


  return (
    <div>
      <SideMenu />
      <div className={styles.buttonNPWrapper}>
        <button className={styles.nextButton} onClick={getPrevious}>Previous</button>
        <button className={styles.previousButton} onClick={getNext}>Next</button>
      </div>
      <div className={styles.gameCollectionWrapper}>
        <TopMenu setGames={setGames} setNext={setNext} setPrevious={setPrevious} />
        <div className={styles.gameListWrapper}>
          {games.map(((game, index) => {
            return (
              <Game key={index} game={game} />
            )
          }))}
        </div>
      </div>
    </div>
  )
}

HomeMenu.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
} 