// Components
import Layout from "../../components/layout"
import Game from "../../components/home/game-card/game";
import SideMenu from "../../components/home/side-menu/side-menu";
import TopMenu from "../../components/home/top-menu/top-menu";

import axios from "axios"
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { unSetUser } from '../../features/users/userSlice';

import styles from '../scss/home.module.scss';
import SearchBar from "../../components/home/search-bar/search-bar";
import NProgress from "nprogress";

const override = css`
  color: #FFF;
`;

export default function HomeMenu() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const [games, setGames] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [title, setTitle] = useState('New and Trending');
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    checkUser();
    getGames();
    isLoaded();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const newTrending = '&dates=2021-10-10,2022-10-10&ordering=-added';

  const checkUser = () => {
    if (!user) {
      dispatch(unSetUser());
      router.push('/login');
    }
    console.log(user);
  }

  const isLoaded = () => {
    if (games === (null || [])) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }

  const reLoader = () => {
    setGames([]);
    setLoading(true);
  }

  const getGames = () => {
    NProgress.start()
    reLoader();
    axios.get(`https://api.rawg.io/api/games` + process.env.RAWG_API_KEY + newTrending, {
    })
      .then((res) => {
        NProgress.done();
        const data = res.data.results;
        setLoading(false);
        setGames(data);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      })
  };

  const getNext = () => {
    reLoader();
    NProgress.start()
    axios.get(next, {
    })
      .then((res) => {
        const data = res.data.results;
        setGames(data);
        setLoading(false);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  };

  const getPrevious = () => {
    reLoader()
    NProgress.start()
    axios.get(previous, {
    })
      .then((res) => {
        const data = res.data.results;
        setLoading(false);
        setGames(data);
        NProgress.done();
        setNext(res.data.next);
        setPrevious(res.data.previous)
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  };

  const handleScroll = () => {
    let position = window.pageYOffset;
    let innerHeight = window.innerHeight;
    setScrollPosition(position);
    if ((position + innerHeight) >= document.body.offsetHeight) {
      console.log('You are at the bottom of the page');
      setBottom(true);
    }
  };

  const ButtonWrapper = () => {

    return (
      <div className={styles.buttonNPWrapper}>
        <button className={styles.previousButton} onClick={getPrevious}>Previous</button>
        <button className={styles.nextButton} onClick={getNext}>Next</button>
      </div>
    )
  };


  return (
    <div>
      <SideMenu />
      <div className={styles.gameCollectionWrapper}>
        <div className={styles.gameListWrapper}>
          <TopMenu
            setGames={setGames}
            setNext={setNext}
            setPrevious={setPrevious}
            setTitle={setTitle}
            title={title}
            reLoader={reLoader}
            setLoading={setLoading}
          />
          <div className={styles.gameViewComponentContainer}>
            <SearchBar
              setGames={setGames}
              setNext={setNext}
              setPrevious={setPrevious}
              setTitle={setTitle}
              title={title}
              reLoader={reLoader}
              setLoading={setLoading}
            />
            <div className={styles.headerWrapper}>
              <h1 className={styles.headerTitle}>{title}</h1>
              <p>Search through your favorite video games.</p>
            </div>
            <ButtonWrapper />
            {
              loading ?
                <SyncLoader color="#FFF" loading={loading} size={150} css={override} />
                :
                <div className={styles.gameListContainer}>
                  {games.map(((game, index) => {
                    return (
                      <Game key={index} game={game} />
                    )
                  }))}
                </div>
            }
            <ButtonWrapper />
          </div>

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