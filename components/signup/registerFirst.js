import styles from '../../pages/scss/signup.module.scss';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Divider, Typography, Stack } from '@mui/material';
import Link from 'next/link';

export default function RegisterFirstForm(props) {

	return (
		<div className={styles.formWrapper}>
			<form className={styles.registerForm} method="POST">

				<h1 className={styles.labelHeaderText}>Sign Up</h1>

				<label className={styles.labelText}>
					Username
				</label>

				<input
					type="text"
					name="username"
					pattern="[A-Z-a-z0-9]{5,12}"
					max="14"
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

				<div className={styles.countrySelContainer}>
					<label>Country</label>
					<CountryDropdown
						value={props.country}
						onChange={function (val) {
							console.log(val)
							props.setCountry(val)
						}}
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

				<Divider sx={{ marginTop: 1, marginBottom: 1 }} />

				<Stack
					alignItems="center"
					sx={{ marginTop: 2 }}
				>
					<Typography>
						If you already have an account, <Link href="/login">Login</Link>!
					</Typography>
				</Stack>
			</form>
		</div>
	);
}