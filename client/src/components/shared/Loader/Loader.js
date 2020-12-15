import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from "./styles";
import PropTypes from 'prop-types';

export default function Loader({ variant }) {
  const classes = useStyles();

  return (
    <div className={classes[variant]}>
      <LinearProgress color="secondary" />
    </div>
  );
}

Loader.propTypes = {
  variant: PropTypes.string,
}

Loader.defaultProps = {
  variant: "light"
}