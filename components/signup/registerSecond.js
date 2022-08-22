import { Avatar } from '@mui/material';
import styles from '../../pages/scss/signup.module.scss';

export default function RegisterSecondForm(props) {

  return (
    <form className={styles.registerForm} method="POST" action="" encType="multipart/form-data">

      <p className={styles.errorAlert}>
        {props.error}
      </p>

      <div className={styles.profilePictureContainer}>
        <h2>Select your Profile Picture</h2>
        <Avatar src={props.profilePicture} alt="user-profile" sx={{ width: 300, height: 300 }} />
        <input type="file" onChange={(img) => props.onImageChange(img)} />
      </div>

      <div className={styles.bioTextArea}>
        <h2>Tell us a little bit about yourself!</h2>
        <textarea
          maxLength="250"
          rows="5"
          cols="100"
          onChange={e => props.setBio(e.target.value)}
        >

        </textarea>
      </div>

      <div className={styles.gamerTypeContainer}>
        <h2>What kind of player are you?</h2>
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