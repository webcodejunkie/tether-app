import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBar(props) {
  return (
    <Alert severity={props.errorType} >
      {props.error}
    </Alert>
  )
}