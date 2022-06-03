import styles from './game.module.scss';
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners";

const override = css`
  color: #FFF;
`;

export default function Game(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isLoaded();
  })

  const isLoaded = () => {
    console.log(typeof (props))
    console.log(typeof (props.game))
    if (props === (null || '')) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    console.log(loading);
  }

  return (
    <>
      {
        loading ?
          <MoonLoader css={override} loading={loading} size={150} />
          :
          <div className={styles.gameWrapper}>
            <img
              alt="game-card"
              src={props.game.background_image}
              className={styles.gameCover}
            />
            <h3>{props.game.name}</h3>
            <div className={styles.smallInfo}>
              <p>
                <span>Rating: </span>
                {
                  props.game.rating === null ?
                    'No rating'
                    :
                    props.game.rating
                }
              </p>
              <p className={styles.metaRating}>
                {
                  props.game.metacritic === (null || 0) ?
                    'N/A'
                    :
                    props.game.metacritic
                }
              </p>
            </div>
          </div>
      }
    </>
  )
}