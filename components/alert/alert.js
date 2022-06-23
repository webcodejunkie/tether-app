import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertBar(props) {
  return (
    <Alert severity={props.errorType} className={props.class}>
      <AlertTitle>{props.severity}</AlertTitle>
      {props.error}
    </Alert>
  )
}