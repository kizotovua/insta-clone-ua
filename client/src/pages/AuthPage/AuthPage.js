import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Container} from "@material-ui/core";
import SignIn from "../../components/SignInForm/SignIn";
import useStyles from "./styles";

const AuthPage = () => {

  const classes = useStyles();

  return (
    <>
      <CssBaseline/>
      <Container className={classes.container} maxWidth="xl">
       <SignIn />
     </Container>
    </>
  );
};

export default AuthPage;