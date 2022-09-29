import Layout from '../components/layout';
import { Typography, Stack, Grid, Button } from '@mui/material';
import Link from 'next/link';
import styles from './index.module.scss';

export default function LandingPage() {

	return (
		<Grid
			container
			justifyContent="center"
		>
			{/*Section 1*/}

			<Grid
				item
				className={styles.sectionOne}
			>
				<img
					src="/images/sstetherhome.png"
					className={styles.tetherHomeImage}
				/>
				<Stack className={styles.sectionOneContent}>
					<Stack sx={{ padding: '3rem 0' }}>
						<Typography variant="h3" className={styles.headerCLR}>
							Connecting with players just got easier
						</Typography>
						<Typography variant="body1" sx={{ fontSize: '20px' }}>
							Skip the wait on finding a gaming buddy, with a game-breaking feature to pair up players instantly skips the hassle on having to find a player 2.
						</Typography>
					</Stack>
				</Stack>
			</Grid>

			{/*Section 2*/}
			<Grid
				item
				className={styles.sectionTwo}
			>
				{/*Video Section*/}
				{
					<Grid
						item
						className={styles.videoSection}
					>
						<video controls className={styles.playNowVideoPlayer}>
						</video>
					</Grid>
				}

				<p className={styles.playNowArrowBtn}>↓</p>
				<img
					src="/images/playnowbtn.png"
					className={styles.playnowImage}
				/>
				<Stack sx={{ padding: '3rem 0' }}>
					<Typography variant="h3" className={styles.headerCLR}>
						Find players instantly with the play now feature
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '20px' }}>
						It's as simple as a single click of a button
					</Typography>
					<ul className={styles.intruList}>
						<li>Find your game</li>
						<li>Click 'Play now'</li>
						<li>Wait to be paired with someone to start chatting!</li>
					</ul>
				</Stack>
			</Grid>

			{/*Section 3*/}
			<Grid
				container
				flexDirection="row"
				item
				className={styles.sectionThree}
			>
				<img
					src="/images/groundedImage.png"
					className={styles.groundedImage}
				/>
				<Stack sx={{ padding: '3rem 0' }}>
					<Typography variant="h3" className={styles.headerCLR}>
						Get right into the community and find a new friend
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '20px' }}>
						Skip the wait on finding a gaming buddy, with a game-breaking feature to pair up players instantly skips the hassle on having to find a player 2.
					</Typography>
					<Stack
						alignItems="flex-start"
					>
						<Link href="/signup">
							<Button
								variant='contained'
								sx={{ backgroundColor: '#00ab44' }}
							>
								Sign Up
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Grid>

			{/*Section 5*/}
			<Grid
				container
				flexDirection="row"
				item
				className={styles.sectionFive}
			>
				<Typography
					variant="h3"
					className={styles.headerCLR}
				>
					Stand out to your play-style
				</Typography>
				<Typography
					variant="body1"
				>
					By selecting your play-style, you let other players know what kind of gaming you're looking for
				</Typography>
				<Stack
					flexDirection={{ xs: 'column', md: 'column', lg: 'row' }}
					sx={{ padding: '3rem 0' }}
					className={styles.sectionFiveContent}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						sx={{
							padding: '4rem',
							color: '#000'
						}}
					>
						<img
							src="/images/playertypeicon/casual.png"
							className={styles.playerTypeIcon}
						/>
						<Typography
							variant="h4"
							className={styles.headerCLR}
							sx={{
								borderBottom: '12px solid #c000ff',
								textAlign: 'center',
							}}
						>
							CASUAL
						</Typography>
						<ul className={styles.intruList}>
							<li>Recreational player with no real thirst to die</li>
							<li>Less rewarding</li>
							<li>Not in for the challenge</li>
						</ul>
					</Stack>
					<Stack
						justifyContent="center"
						alignItems="center"
						sx={{
							padding: '4rem',
							color: '#000'
						}}
					>
						<img
							src="/images/playertypeicon/adventure.png"
							className={styles.playerTypeIcon}
						/>
						<Typography
							variant="h4"
							className={styles.headerCLR}
							sx={{
								borderBottom: '12px solid #c000ff',
								textAlign: 'center',
							}}
						>
							ADVENTURE
						</Typography>
						<ul className={styles.intruList}>
							<li>Loves a challenge but wants to take it easy</li>
						</ul>
					</Stack>
					<Stack
						justifyContent="center"
						alignItems="center"
						sx={{
							padding: '4rem',
							color: '#000'
						}}
					>
						<img
							src="/images/playertypeicon/competitive.png"
							className={styles.playerTypeIcon}
						/>
						<Typography
							variant="h4"
							className={styles.headerCLR}
							sx={{
								borderBottom: '12px solid #c000ff',
								textAlign: 'center',
							}}
						>
							COMPETITIVE
						</Typography>
						<ul className={styles.intruList}>
							<li>Isn't afraid of a real challenge, hurt me more</li>
							<li>More rewarding</li>
						</ul>
					</Stack>
				</Stack>
			</Grid>

			{/*Section 4*/}
			<Grid
				container
				flexDirection="row"
				item
				className={styles.sectionFour}
			>
				<img
					src="/images/apexlegendsImage.png"
					className={styles.apexImage}
				/>
				<Stack
					sx={{ padding: '3rem 0' }}
					className={styles.sectionFourContent}
				>
					<Typography variant="h3" sx={{ textAlign: 'center' }} className={styles.headerCLR}>
						Let's change the game
					</Typography>
					<Typography variant="body1" sx={{ fontSize: '20px' }}>
						The world needs a platform that delivers to finding new gaming buddies, here's the place for it 🎮
					</Typography>
				</Stack>
			</Grid>

		</Grid>
	);
}


LandingPage.getLayout = function getLayout(page) {
	return (
		<Layout>
			{page}
		</Layout>
	);
}