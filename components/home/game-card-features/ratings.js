import styles from './features.module.scss';
import Rating from '@mui/material/Rating';

export default function Ratings(props) {
	return (
		<div className={styles.smallInfo}>
			{
				<Rating
					name="game-rating"
					value={props.game.rating}
					precision={0.5}
					readOnly
				/>
			}
			<p className={styles.metaRating}>
				{
					props.game.metacritic === null ?
						'N/A'
						:
						props.game.metacritic
				}
			</p>
		</div>
	)
}