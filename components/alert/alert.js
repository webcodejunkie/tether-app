import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertBar(props) {
  return (
    <Alert severity={props.errorType} className={props.class} sx={{ margin: '2rem 1rem' }} >
      <AlertTitle>{props.severity}</AlertTitle>
      {props.error}
    </Alert>
  )
}