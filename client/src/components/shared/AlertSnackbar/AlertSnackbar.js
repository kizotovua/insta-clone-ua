import React, {useEffect, useState} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import useStyles from "./styles";
import PropTypes from 'prop-types';

export const AlertSnackbar = ({ msgType, text, status, timeout }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles()
  useEffect(() => {
    if(status) {
      setOpen(true);
    }
  }, [status])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const errorEmoji = <span className={classes.emoji}> &#128561; </span>

  return (
    <Snackbar open={open}
              autoHideDuration={timeout}
              onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={msgType}>
        <AlertTitle> {msgType.toUpperCase()}</AlertTitle>
        {text}
        {msgType === "error" && errorEmoji}
      </Alert>

    </Snackbar>
  );
};

export default AlertSnackbar;

AlertSnackbar.propTypes = {
  msgType: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.string,
  timeout: PropTypes.number
}

AlertSnackbar.defaultProps = {
  msgType: '',
  text: '',
  status: '',
  timeout: 0
}
