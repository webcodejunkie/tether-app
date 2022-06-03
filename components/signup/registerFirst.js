import styles from '../../pages/scss/signup.module.scss';

export default function RegisterFirstForm(props) {

  return (
    <div className={styles.formWrapper}>
      <form className={styles.registerForm} method="POST" action="">

        <p className={styles.errorAlert}>
          {props.error}
        </p>

        <h1>Sign Up</h1>

        <label className={styles.labelText}>
          Username
        </label>

        <input
          type="text"
          name="username"
          pattern="[A-Z-a-z0-9]{5,12}"
          max="12"
          min="5"
          value={props.username}
          onChange={e => props.setUsername(e.target.value)}
          required
        />

        <label className={styles.labelText}>
          Password
        </label>
        <input
          pattern="[A-Z-a-z0-9-!]+"
          type="password"
          value={props.password}
          onChange={e => props.setPassword(e.target.value)}
          required
        />

        <label className={styles.labelText}>
          Email
        </label>
        <input
          type="email"
          value={props.email}
          onChange={e => props.setEmail(e.target.value)}
          required
        />

        <label className={styles.labelText}>
          Birthday
        </label>
        <input
          type="date"
          value={props.birthday}
          onChange={e => props.setBirthday(e.target.value)}
          required
        />

        <div className={styles.fbuttonContainer}>
          <button
            onClick={props.handleNext}
            className={styles.registerButton}
            type="submit"
          >Next</button>
        </div>
      </form>
    </div>
  );
}