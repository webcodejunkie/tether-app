import { Grid, Avatar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import FeedCard from "./card/feed-card";

export default function FeedComponent() {
	useEffect(() => {
		fetchPosts();
	}, [])
	const [posts, setPosts] = useState([]);

	const fetchPosts = () => {
		const token = localStorage.getItem('token');

		axios.get('https://tetherapi.herokuapp.com/posts/feed', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((res) => {
				console.log(res);
				const data = res.data;
				console.log(data);
				setPosts(data);
			})
			.catch((err) => {
				console.error('Error: ' + err);
			});
	}

	return (
		<Grid
			container
			flexDirection="column"
			alignItems="center"
		>
			{posts.map((posts, index) => {
				return (
					<FeedCard posts={posts} key={index} />
				)
			})}
		</Grid>
	)
}