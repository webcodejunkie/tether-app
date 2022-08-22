import styles from './game.module.scss';
import { useState } from 'react';
import NProgress from 'nprogress';
import axios from 'axios';
import SimpleImageSlider from 'react-simple-image-slider';
import Platform from '../platform/platform';

import Rating from '@mui/material/Rating';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GameFeatures from '../game-card-features/gameFeatures';
import Ratings from '../game-card-features/ratings';


export default function Game(props) {

  const [modal, setModal] = useState(false);
  const [game, setGame] = useState([]);
  const [screenshots, setScreenshots] = useState([]);

  // Map Screenshots to SimpleImageSlider
  let images = screenshots.map((img) => {
    return { url: img.image }
  })

  // Show Modal
  const onShow = async () => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    NProgress.start();
    const id = props.game.id;
    const gamePk = props.game.slug;
    await axios.get(`https://api.rawg.io/api/games/${id}` + process.env.RAWG_API_KEY, {
    })
      .then((res) => {
        console.log(res);
        const data = res.data;
        setGame(data);
        setModal(true);
        getScreenshots(gamePk);
        NProgress.done();
      })
      .catch((err) => {
        console.error('Error: ' + err);
      })
  }

  // Get Screenshots from RAWG API
  const getScreenshots = async (gamePk) => {
    await axios.get(`https://api.rawg.io/api/games/${gamePk}/screenshots` + process.env.RAWG_API_KEY, {
    })
      .then((res) => {
        const data = res.data.results;
        console.log(data);
        setScreenshots(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      })
  }

  // Close Modal
  const onClose = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    setGame([]);
    setModal(false);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  // Close Modal Button
  const ModalButton = () => {
    return (
      <button className={styles.closeModalBtn} onClick={onClose}>Close</button>
    )
  }

  // Modal
  const Modal = () => {
    return (
      <div className={styles.gameModalContainer}>
        <div className={styles.gameModalWrapper}>
          <h1 className={styles.gameModalTitle}>{game.name}</h1>
          <div>
            <div className={styles.gameModalImageWrapper}>
              <img
                src={game.background_image}
                className={styles.modalImage}
                alt="game-background"
              />
              <div>
                <SimpleImageSlider
                  images={images}
                  width={600}
                  height={400}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            </div>
            <div className={styles.smallModalColWrapper}>
              <p>Released: {game.released}</p>
              <div className={styles.modalDevelopersList}>
                <p>Developers: </p>
                {
                  game.developers.map((el, index) => {
                    return (
                      <div key={index}>
                        <a
                          href={game.website}
                          className={styles.modalLinks}
                          target="_blank"
                          rel="noreferrer" >
                          {el.name}
                        </a>
                      </div>
                    )
                  })
                }
              </div>
              <div className={styles.modalGenreList}>
                <p>Genres: </p>[
                {
                  game.genres.map((el, index) => {
                    return (
                      <div key={index} className={styles.genreLinks}>
                        <p> {el.name}, </p>
                      </div>
                    )
                  })
                }
                ]
              </div>
            </div>
          </div>
          <div>
            <p>Rating:</p>
            <Rating
              name="game-rating"
              value={game.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div>
            <h3 className={styles.modalHeaders}>Biogrophy</h3>
            <p>{game.description_raw}</p>
          </div>
        </div>
        <ModalButton />
      </div>
    )
  }

  return (
    <>
      <div
        className={styles.gameWrapper}
      >
        <img
          alt="game-card"
          src={props.game.background_image}
          className={styles.gameCover}
        />
        <h3 className={styles.gameTitle}>{props.game.name}</h3>
        <Ratings game={props.game} />
        {
          props.game.platforms && <Platform platform={props.game.platforms} />
        }
        <GameFeatures id={props.game.id} />
        <div className={styles.dropIcon} onClick={onShow}>
          <p>Show more</p>
          <ArrowDropDownIcon />
        </div>
      </div>
      {
        modal && <Modal />
      }
    </>
  )
}