import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PropTypes from 'prop-types';

export function RegisterForm ({ classes,
                                changeHandler,
                                registerHandler,
                                disabled,
                                toggleForm,
                                passVisible,
                                togglePassVisible }) {

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
        id="name"
        label="First Name"
        name="name"
        type="text"
        autoFocus
        onChange={changeHandler} />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="surname"
        label="Second Name"
        type="text"
        id="surname"
        autoFocus
        onChange={changeHandler} />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email"
        type="email"
        id="email"
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
          { passVisible && <VisibilityOffIcon fontSize="small"/> }
        </div>
      </div>

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={registerHandler}
        disabled={disabled} >

        Sign Up
      </Button>

      <Grid container justify="center">
        <Grid item>
            <Link href="/" onClick={toggleForm}>
              { "Already have an account? Log In" }
            </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  registerHandler: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  passVisible: PropTypes.bool.isRequired,
  togglePassVisible:PropTypes.func.isRequired,
  disabled:PropTypes.bool.isRequired,
}
