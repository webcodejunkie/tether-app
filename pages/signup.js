import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios";
// SCSS Styles
import styles from './scss/signup.module.scss';
// Componenets
import Layout from '../components/layout';
import AlertBar from '../components/alert/alert';
import RegisterFirstForm from '../components/signup/registerFirst';
import RegisterSecondForm from '../components/signup/registerSecond';
// MUI Component
import { Grid, Button, Stack } from '@mui/material';
// React Multi-Form
import { MultiStepForm, Step } from 'react-multi-form';

export default function Register(props) {

	const router = useRouter();
	// Register
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [playerType, setPlayerType] = useState('');
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [bio, setBio] = useState('');
	// const [profilePicture, setProfilePicture] = useState(null);
	// const [file, setFile] = useState([]);
	// Form Validation
	const [error, setError] = useState('');
	const [active, setActive] = useState(1);

	useEffect(() => {
		errorChecker();
	}, [username, password, email, birthday, playerType, country, region, bio])


	const handleSubmit = (e) => {
		e.preventDefault();

		axios.post('https://tetherapi.herokuapp.com/tether/register', {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
			Bio: bio,
			PlayerType: playerType,
			Country: country,
			Region: region,
		})
			.then((res) => {
				/* Post profile picture to AWS Bucket
					axios.post(`https://tetherapi.herokuapp.com/tether/media/${username}/upload`, {
					Image: file.target.files
				})
					.then((res) => {
						const data = res.data;
						console.log(data);
					})
					.catch((err) => {
						console.error("Error: " + err);
					});
				*/
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
			setActive(active + 1);
		}
	}

	/*
	const onImageChange = (e) => {
		const [file] = e.target.files;
		if ([file] === undefined) {
			setError('Please choose a photo.')
		} else {
			console.log(file);
			setProfilePicture(URL.createObjectURL(file));
			console.log(profilePicture)
		}
	}
	*/

	const errorChecker = () => {
		console.log(error);

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
			setError('Username must be between, 5 to 14 characters.');
		} else if (username.length >= 13) {
			setError('Username is too long, max character is 12.');
		} else if (keys.some(el => username.includes(el))) {
			setError("Username can't contain alphanumeric characters.");
		} else if (keys.some(el => password.includes(el))) {
			setError("Password can't contain alphanumeric characters.");
		} else if (password.length <= 6) {
			setError('Password needs to be longer.')
		} else if (email === '' || null) {
			setError('Please enter a valid email.')
		} else if ((country === '' || null) && (region === '' || null)) {
			setError('Please select a country and region.')
		} else {
			setError('')
		}


	}

	return (
		<Grid
			container
			flexDirection="column"
			alignItems="center"
			sx={{ padding: '3rem' }}
			className={styles.signupWrapper}
		>
			{error !== '' &&
				<AlertBar error={error} errorType={'warning'} severity={'Required Fields'} className={styles.errorAlert} />
			}

			<MultiStepForm activeStep={active} className={styles.multiformContainer}>
				<Step label='one'>
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
				</Step>
				<Step label='two'>
					<RegisterSecondForm
						handleSubmit={handleSubmit}
						playerType={playerType}
						setPlayerType={setPlayerType}
						setBio={setBio}
					// onImageChange={onImageChange}
					// profilePicture={profilePicture}
					// file={file}
					// setFile={setFile}
					/>
				</Step>
			</MultiStepForm>
			<Stack
				flexDirection="row"
				justifyContent="space-evenly"
				sx={{ width: '100%' }}
			>
				{
					active !== 1 && (
						<Button
							variant="contained"
							onClick={() => setActive(active - 1)}>Previous</Button>
					)
				}
				{
					active !== 1 && (
						<Button
							color="success"
							variant="contained"
							style={{ float: 'right' }}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					)
				}
				{
					active !== 2 && (
						<Button
							variant="contained"
							color="success"
							onClick={handleNext}
							style={{ float: 'right' }}>
							Next
						</Button>
					)
				}
			</Stack>
		</Grid>
	);
}

Register.getLayout = function getLayout(page) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}