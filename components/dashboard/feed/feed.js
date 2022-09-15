import { Grid } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function FeedComponent() {
  useEffect(() => {
    fetchPosts();
  }, [])
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    const token = localStorage.getItem('token');

    axios.get('https://tetherapi.herokuapp.com/tether/feed', {
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
    <Grid>
      {posts.map((el) => <p>{el.content}</p>)}
    </Grid>
  )
}