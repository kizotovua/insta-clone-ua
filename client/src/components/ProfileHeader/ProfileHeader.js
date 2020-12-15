import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import UserAvatar from "../shared/UserAvatar/UserAvatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SettingsIcon from '@material-ui/icons/Settings';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {AuthContext} from "../../context/AuthContext";
import useStyles from "./styles";
import { func, object } from 'prop-types';


const ProfileHeader = ({openUploadWindow, profile}) => {
  const { userID } = useContext(AuthContext);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    if(userID === profile.id) {
      setOwn(true);
    }
  },[]);

  const classes = useStyles();

  return (
    <Container className={classes.root} fixed>

      { own
        ?  <UserAvatar classname={classes.avatar}/>
        : <Avatar className={classes.avatar} src={profile.avatar}/>
      }

      <Box className={classes.toolbar}>
        <div className={classes.name}>
          <Typography component="h2" variant="h5">
          {profile.username}
        </Typography>
        </div>

        { own &&
          <div className={classes.settings}>
            <Button disableFocusRipple component="div" variant="outlined" className={classes.button}>
              <Typography component="span" variant="body1">
                edit profile
              </Typography>
            </Button>
            <SettingsIcon/>
          </div>
        }

        <div className={classes.statistics}>
          <Typography component="div">
            <strong>{profile.posts.length}</strong> posts
          </Typography>
          <Typography component="div">
            <strong>{profile.follows.length}</strong> follows
          </Typography>
          <Typography component="div">
            <strong>{profile.following.length}</strong> following
          </Typography>
        </div>
        <div className={classes.username}>
          <Typography component="h4" variant="h6">
            {profile.name}
          </Typography>
        </div>

        { own &&
        <div className={classes.iconWrapper}>
          <IconButton disableFocusRipple
                      className={classes.addIcon}
                      onClick={openUploadWindow}
                      aria-label= "add photo">
            <AddToPhotosOutlinedIcon
              fontSize="large"
            />
          </IconButton>
          <div>
            <Typography variant="body2">
              Add new posts
            </Typography>
          </div>
        </div>
        }

      </Box>
    </Container>
  );
};

export default ProfileHeader;

ProfileHeader.propTypes = {
  openUploadWindow: func.isRequired,
  profile: object.isRequired
}