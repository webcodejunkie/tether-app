import { Grid, Avatar, Stack, Typography } from "@mui/material";
import axios from "axios";
import moment from 'moment';
import { useState, useEffect } from "react";
import styles from './feed.module.scss'

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
      {posts.map((el) => {
        return (
          <Stack
            flexDirection="column"
            className={styles.card}
          >
            <Stack
            >
              <Avatar alt="user-image" sx={{ width: 50, height: 50 }} src={el.from.Avatar} />
              <Typography variant="body1">
                {el.from.Username}
              </Typography>
            </Stack>
            <Stack
              justifyContent="space-between"
              sx={{ margin: 3 }}
            >
              <Typography variant="body2">
                {el.content}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ fontSize: '12px' }}>
              {moment(el.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </Typography>
          </Stack>
        )
      })}
    </Grid>
  )
}