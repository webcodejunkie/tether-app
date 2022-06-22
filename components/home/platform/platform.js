import styles from './platform.module.scss';
import Image from 'next/image';

export default function Platform(props) {

  const Platforms = () => {

    return (
      <div className={styles.platformContainer}>
        {props.platform.map((el, i) => {
          return (
            <div key={i}>
              {el.platform.name === 'PC' && <Image src="/images/steam.png" width={40} height={40} />}
              {el.platform.name === ('PlayStation 4' || 'PlayStation 5') && <Image src="/images/ps4.png" width={40} height={40} />}
              {el.platform.name === ('Xbox One' || 'Xbox Series S/X') && <Image src="/images/xbox.png" width={40} height={40} />}
              {el.platform.name === 'Nintendo Switch' && <Image src="/images/nintendo.png" width={40} height={40} />}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Platforms />
  )
}