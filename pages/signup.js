import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";

import styles from './scss/signup.module.scss';
import Layout from '../components/layout';
import RegisterFirstForm from '../components/signup/registerFirst';
import RegisterSecondForm from '../components/signup/registerSecond';


export default function Register(props) {

  useEffect(() => {
    errorChecker();
  })

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [playerType, setPlayerType] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [stepOne, setStepOne] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://tetherapi.herokuapp.com/tether/register', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      PlayerType: playerType,
      Bio: bio,
      Country: country,
      Region: region,
    })
      .then((res) => {
        const data = res.data;
        console.log(data);
        router.push('/login');
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  const handleNext = (e) => {
    e.preventDefault();
    if ((username && password && email && birthday) === '' || null) {
      setError('Please make sure all fields are filled out.');
    } else {
      setStepOne(false);
    }
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setProfilePicture(URL.createObjectURL(file));
  }

  const errorChecker = () => {

    let keys = [
      '?',
      '/',
      '<',
      '>',
      '*',
      '[',
      ']',
      '+',
      '=',
      '}',
      '{',
      '.',
      ',',
      ':',
      ';',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '(',
      ')',
    ];

    if (username.length <= 4) {
      setError('Username must be between, 4 to 12 characters.');
    } else if (username.length >= 13) {
      setError('Username is too long, max character is 12.');
    } else if (keys.some(el => username.includes(el))) {
      setError("Username can't contain alphanumeric characters.");
    } else if (keys.some(el => password.includes(el))) {
      setError("Password can't contain alphanumeric characters.");
    } else if (password.length <= 6) {
      setError('Password needs to be longer.')
    } else if ((country === '' || null) && (region === '' || null)) {
      setError('Please select a country and region.')
    } else if (birthday === Date.now()) {
      setError('You are just a baby');
    } else {
      setError('')
    }

  }

  return (
    <div className={styles.registerWrapper}>
      {
        stepOne ? (
          <RegisterFirstForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            birthday={birthday}
            setBirthday={setBirthday}
            handleNext={handleNext}
            setCountry={setCountry}
            country={country}
            region={region}
            setRegion={setRegion}
            error={error}
          />
        )
          :
          <RegisterSecondForm
            handleSubmit={handleSubmit}
            playerType={playerType}
            setPlayerType={setPlayerType}
            setBio={setBio}
            onImageChange={onImageChange}
            profilePicture={profilePicture}
          />
      }
    </div>
  );
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}