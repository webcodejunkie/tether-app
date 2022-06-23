import styles from '../../pages/scss/signup.module.scss';

export default function RegisterSecondForm(props) {

  return (
    <form className={styles.registerForm} method="POST" action="">

      <p className={styles.errorAlert}>
        {props.error}
      </p>

      <form className={styles.bioTextArea}>
        <h1>Tell the gamers what you want them to know!</h1>
        <textarea
          maxLength="250"
          rows="5"
          cols="100"
          onChange={e => props.setBio(e.target.value)}
        >

        </textarea>
      </form>

      <div className={styles.gamerTypeContainer}>
        <h1>What kind of player are you?</h1>
        <div>
          <label>I am a casual gamer!</label>
          <input type="radio" value="I am a casual gamer!" name="gamer_type" onChange={e => props.setPlayerType(e.target.value)} />
        </div>
        <div>
          <label>I'm a casual gamer, but I also like to be competitive!</label>
          <input type="radio" name="gamer_type" value="I'm a casual gamer, but I also like to be competitive!" onChange={e => props.setPlayerType(e.target.value)} />
        </div>
        <div>
          <label>I'm in it to win it, it's all or nothing!</label>
          <input type="radio" name="gamer_type" value="I'm in it to win it, it's all or nothing!" onChange={e => props.setPlayerType(e.target.value)} />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={props.handleNext}
          className={styles.registerButton}
        >Back
        </button>
        <button
          onClick={props.handleSubmit}
          className={styles.submitButton}
          type="submit"
        >Register
        </button>
      </div>
    </form>
  );
}