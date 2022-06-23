import styles from '../../pages/scss/signup.module.scss';
import AlertBar from '../alert/alert';
import { CountryRegionData, CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function RegisterFirstForm(props) {

  return (
    <div className={styles.formWrapper}>
      <form className={styles.registerForm} method="POST" action="">

        {props.error !== '' &&
          <AlertBar error={props.error} errorType={'info'} severity={'Info'} className={styles.errorAlert} />
        }

        <h1>Sign Up</h1>

        <label className={styles.labelText}>
          Username
        </label>

        <input
          type="text"
          name="username"
          placeholder="tether2022"
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
          placeholder="password"
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
          placeholder="someemail@gmail.com"
          type="email"
          value={props.email}
          onChange={e => props.setEmail(e.target.value)}
          required
        />

        <div className={styles.countrySelContainer}>
          <label>Country</label>
          <CountryDropdown
            value={props.country}
            onChange={(val) => props.setCountry(val)}
          />

          <RegionDropdown
            country={props.country}
            value={props.region}
            onChange={(val) => props.setRegion(val)}
          />
        </div>

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
          >Next</button>
        </div>
      </form>
    </div>
  );
}