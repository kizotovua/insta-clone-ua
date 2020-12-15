
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles'
import Container from "@material-ui/core/Container";
import NavMenu from "./components/NavMenu";
import {cloudinaryURL} from "../../../utils/variables";
import {Link} from "react-router-dom";


export default function Navbar() {

  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Toolbar className={classes.toolbar}>
       <Container component="nav" className={classes.container} >
          <Link className={classes.link} to='/feed'>
            <img width="160" src={`${cloudinaryURL}insta_images/service/logo_mrvkio.png`} alt="logo"/>
          </Link>
        <NavMenu />
       </Container>

      </Toolbar>
    </header>
  );
}
