import { Avatar } from '@mui/material';
import styles from '../../pages/scss/signup.module.scss';

export default function RegisterSecondForm(props) {

  return (
    <form className={styles.registerForm} method="POST" encType="multipart/form-data">

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
          onChange={e => props.setBio(e.target.value)}
        >

        </textarea>
      </div>

      <div className={styles.gamerTypeContainer}>
        <h2>What kind of player are you?</h2>
        <div>
          <input
            type="radio"
            value="I am a casual gamer!"
            name="select"
            id="control_1"
            onChange={e => props.setPlayerType(e.target.value)}
          />
          <label className="playerTypeLabel" htmlFor="control_1">I am a casual gamer!</label>
        </div>
        <div>
          <input
            type="radio"
            name="select"
            id="control_2"
            value="I'm a casual gamer, but I also like to be competitive!"
            onChange={e => props.setPlayerType(e.target.value)}
          />
          <label className="playerTypeLabel" htmlFor="control_2">I'm a casual gamer, but I also like to be competitive!</label>
        </div>
        <div>
          <input
            type="radio"
            name="select"
            id="control_3"
            value="I'm in it to win it, it's all or nothing!"
            onChange={e => props.setPlayerType(e.target.value)}
          />
          <label className="playerTypeLabel" htmlFor="control_3">I'm in it to win it, it's all or nothing!</label>
        </div>
      </div>
    </form>
  );
}