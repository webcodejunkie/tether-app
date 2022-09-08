import Layout from "../../components/layout";
import { Avatar, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.user);

  return (
    <Box sx={{ width: 300, height: 300 }}>
      <Avatar src={user.ProfilePicture} sx={{ width: 300, height: 300 }} />
      <Typography>{user.Username}</Typography>
      <Typography variant="h5">About Me</Typography>
      <Typography variant="body1">{user.Bio}</Typography>
      <Typography variant="h5">Country</Typography>
      <Typography>{user.Country}</Typography>
    </Box>
  )
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}