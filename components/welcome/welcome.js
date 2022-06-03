import Image from 'next/image';
import styles from './welcome.module.scss';

export default function Welcome() {
  return (
    <div>
      <video autoPlay muted loop className={styles.videoWrapper}>
        <source className={styles.wrapper} src="/images/bannervid.mp4" type="video/mp4" />
      </video>
      <div className={styles.sectionOne}>
        <div className={styles.sectionOneContent}>
          <div>
            <Image
              src="/images/placeholder.png"
              width={600}
              height={300}
            />
          </div>
          <div className={styles.fpTwo}>
            <h1>Connecting with players just got easier.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas facilisis leo augue. Aenean sed nulla purus. Ut a neque sit amet velit rutrum varius id et purus. Donec interdum ante eget neque tempus, id lacinia nisi ullamcorper. Nulla facilisi. Fusce venenatis orci quis nulla hendrerit,
              et dignissim velit volutpat.
            </p>
          </div>
        </div>
      </div>

      <section className={styles.mainContainer}>
        <div className={styles.sectionTwo}>
          <h1>Welcome to the Community</h1>
          <p>
            Let's make a community more about games, bring in the conversation for any specific game you have an interest for, there is someone out there who's just as passionate!
          </p>
          <Image
            src="/images/placeholder.png"
            width={600}
            height={300}
          />
        </div>

        <div className={styles.sectionThree}>
          <h1>Let's make users simple!</h1>
          <Image
            src="/images/placeholder.png"
            width={600}
            height={300}
          />
        </div>
      </section>
    </div>
  )
}