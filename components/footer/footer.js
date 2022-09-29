import { Stack, Grid, Button, Typography } from "@mui/material";
import Link from "next/link";
import styles from './footer.module.scss';

export default function Footer() {
	return (
		<Grid
			container
			flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
			alignItems="center"
			justifyContent="space-evenly"
			sx={{ backgroundColor: '#1f1d1d', padding: '3rem' }}
		>
			<Stack sx={{ color: '#FFF' }} alignItems="center">
				<img
					src="/images/tethericon.png"
					className={styles.tetherIcon}
				/>
				Copyright @ 2022 Tether, Inc.
			</Stack>

			<Stack sx={{ color: '#FFF' }} alignItems="center">
				<Typography variant="subtitle1" color="#6a6aff">
					Resources
				</Typography>
				<ul className={styles.footerLinks}>
					<li>About Us</li>
					<li>Contact</li>
					<li>Mission Statement</li>
					<li>Privacy Policy</li>
				</ul>
			</Stack>
		</Grid>
	)
}