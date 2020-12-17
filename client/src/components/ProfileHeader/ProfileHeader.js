import React, {useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import UserAvatar from "../shared/UserAvatar/UserAvatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {AuthContext} from "../../context/AuthContext";
import useStyles from "./styles";
import { func, object } from 'prop-types';
import {ProfileContext} from "../../context/ProfileContext";
import subscriptionAPI from "../../utils/api/subscriptionAPI";
import FollowButton from "../Subscriptions/components/FollowButton/FollowButton";


const ProfileHeader = ({openUploadWindow, profile}) => {
  const { userID } = useContext(AuthContext);
  const auth = useContext(AuthContext);
  const [own, setOwn] = useState(false);
  const {subscribe, profile: { following }, profile: followerData } = useContext(ProfileContext);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [followingStatus, setFollowingStatus] = useState(false);

  useEffect(() => {

    if(following.join().includes(profile.id)) {
      setFollowingStatus(false);

    } else {
      setFollowingStatus(true);
    }

  }, [followingStatus, followerData])

  const follow = async () => {
    setStatusUpdating(true);

    try {
      const res = await subscriptionAPI(auth, profile.id);

      if (!res.errors) {
        subscribe(profile.id, followerData);
        setFollowingStatus(!followingStatus);
      }

    } catch (e) { console.log(e); }

    setStatusUpdating(false);
  }

  const stopFollowing = async () => {
    setStatusUpdating(true);
    try {
      const res = await subscriptionAPI(auth, profile.id, true);

      if (!res.errors) {
        subscribe(profile.id, followerData, false);
        setFollowingStatus(!followingStatus);
      }

    } catch (e) { console.log(e); }

    setStatusUpdating(false);
  }

  useEffect(() => {
    if(userID === profile.id) {
      setOwn(true);
    }
  },[userID, profile.id]);

  const classes = useStyles();

  return (
    <Container className={classes.root}>

      { own
        ?  <UserAvatar classname={classes.avatar}/>
        : <Avatar className={classes.avatar} src={profile.avatar}/>
      }

      <Box className={classes.toolbar}>
        <div className={classes.nameWrapper}>
          <Typography className={classes.name} component="h2" variant="h5">
          {profile.username}
        </Typography>
        </div>

        { !own &&
          <div className={classes.settings}>
            <FollowButton
              updating={statusUpdating}
              followFn={follow}
              unfollowFn={stopFollowing}
              styleClassname={followingStatus ? classes.buttonFollow : classes.buttonUnfollow }
              follow={followingStatus} />
          </div>
        }

        <div className={classes.statistics}>
          <Typography className={classes.statisticsAmount} component="span">
            <strong>{profile.posts.length}</strong> posts
          </Typography>
          <Typography className={classes.statisticsAmount} component="span">
            <strong>{profile.follows.length}</strong> follows
          </Typography>
          <Typography className={classes.statisticsAmount} component="span">
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
            <AddToPhotosOutlinedIcon fontSize="large" />
          </IconButton>
          <div>
            <Typography variant="body2">
              share new posts
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