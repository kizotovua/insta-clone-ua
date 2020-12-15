import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

 export function LoginForm ( classes,
                      changeHandler,
                      loginHandler,
                      toggleForm,
                      disabled,
                      passVisible,
                      togglePassVisible ) {

  let passFieldType;
  passVisible
    ? passFieldType = "text"
    : passFieldType = "password"

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={changeHandler} />

      <div className={classes.passwordField}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={passFieldType}
          id="password"
          autoComplete="current-password"
          onChange={changeHandler} />

        <div
          onClick={togglePassVisible}
          className={classes.passVisibleButton} >

          { !passVisible && <VisibilityIcon fontSize="small"/> }
          {  passVisible && <VisibilityOffIcon fontSize="small"/> }

        </div>
      </div>

      <Button
        disabled={disabled}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={loginHandler} >
        Login
      </Button>

      <Grid container justify="center">
        <Grid item>
          <Link href="/" variant="body2" onClick={toggleForm}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  loginHandler: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  passVisible: PropTypes.bool.isRequired,
  togglePassVisible:PropTypes.func.isRequired,
  disabled:PropTypes.bool.isRequired,
}
