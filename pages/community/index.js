import styles from '../scss/communityboard.module.scss';
import Layout from "../../components/layout";
import axios from "axios";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";

// Material UI Components
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';

export default function CommunityBoard() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setCommunity();
  }, []);

  const [com, setCom] = useState([]);

  const setCommunity = () => {
    const token = localStorage.getItem('token');
    axios.get('https://tetherapi.herokuapp.com/tether/community/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCom(data);
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  }

  return (
    <div className={styles.communityBoard}>
      <h1>Communities</h1>
      {
        com.map((com, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                {
                  com.Admin === user._id &&
                  <Typography variant="body2" align="right" gutterBottom color="red">
                    Admin
                  </Typography>
                }
                <Typography gutterBottom variant="h5" component="div">
                  {com.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {com.Desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Join</Button>
                <Stack color="#76ff03" flexDirection="row">
                  <PersonIcon />
                  {com.MembersCount}
                </Stack>
              </CardActions>
            </Card>
          )
        })
      }
    </div>
  )
}

CommunityBoard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}