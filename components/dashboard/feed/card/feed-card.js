import { Stack, Avatar, Typography, Divider } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import styles from './feed.module.scss';
import moment from 'moment';

export default function FeedCard(props) {
	const posts = props.posts;
	return (
		<Stack
			flexDirection="column"
			className={styles.card}
		>
			<Stack
			>
				<Avatar alt="user-image" sx={{ width: 50, height: 50, border: '2px solid #6c0ac9' }} src={posts.from.Avatar} />
				<Typography variant="body1">
					{posts.from.Username}
				</Typography>
			</Stack>
			<Stack
				justifyContent="space-between"
				sx={{ margin: 3 }}
			>
				<Typography variant="body2">
					{posts.content}
				</Typography>
			</Stack>
			<Typography variant="body2" sx={{ fontSize: '12px', textAlign: "end" }}>
				{moment(posts.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
			</Typography>
			<Stack
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{ width: '40px' }}
			>
				<ThumbUpIcon />
				<Typography variant="body2">
					{posts.likes}
				</Typography>
			</Stack>
			<Stack
				textAlign="center"
			>
				<Typography variant="body2">
					Comments
				</Typography>
				<hr />
				<Typography variant="body2">

				</Typography>
			</Stack>
		</Stack>
	)
}