import styles from './side-menu.module.scss';
import { useState, useEffect } from 'react';

export default function SideMenu() {

  useEffect(() => {

  })


  const [isClosed, setIsClosed] = useState(false);

  const onClose = () => {
    setIsClosed(false);
  }

  const onOpen = () => {
    setIsClosed(true)
  }

  return (
    <div>
      {
        isClosed ?
          <div className={styles.sideMenuWrapper}>
            <h4 className={styles.sideMenuLink}>New and Trending</h4>
            <h4 className={styles.sideMenuLink}>Adventure</h4>
            <h4 className={styles.sideMenuLink}>Action</h4>
            <h4 className={styles.sideMenuLink}>Multiplayer</h4>
            <h4 className={styles.sideMenuLink}>Singleplayer</h4>
            <h4 className={styles.closeButton} onClick={onClose}>Close</h4>
          </div>
          :
          <div className={styles.openButtonWrapper}>
            <button className={styles.openButton} onClick={onOpen}>›</button>
          </div>
      }
    </div>
  )
}