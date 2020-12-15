import React, {useContext, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from "@material-ui/core/Avatar";
import { Link} from "react-router-dom";
import useStyles from "./styles";
import {AuthContext} from "../../../../context/AuthContext";
import {ProfileContext} from "../../../../context/ProfileContext";
import subscriptionAPI from "../../../../utils/api/subscriptionAPI";
import FollowButton from "../FollowButton/FollowButton";
import PropTypes from 'prop-types';


const Item = ({ profileID, username, avatar, suggestionMode }) => {

  const auth = useContext(AuthContext);
  const { subscribe, profile: followerData} = useContext(ProfileContext);
  const[statusUpdating, setStatusUpdating] = useState(false);
  const[followingStatus, setFollowingStatus] = useState(suggestionMode);

  const follow = async () => {
    setStatusUpdating(true);

    try {
      const res = await subscriptionAPI(auth, profileID);

      if (!res.errors) {
        subscribe(profileID, followerData);
        setFollowingStatus(!followingStatus);
      }

    } catch (e) { console.log(e); }

    setStatusUpdating(false);
  }

  const stopFollowing = async () => {
    setStatusUpdating(true);
    try {
      const res = await subscriptionAPI(auth, profileID, true);

      if (!res.errors) {
        subscribe(profileID, followerData, false);
        setFollowingStatus(!followingStatus);
      }

    } catch (e) { console.log(e); }

    setStatusUpdating(false);
  }


  const classes = useStyles();
  return (

    <ListItem className={classes.root}>
      <Link className={classes.linkAvatar} to={`/profiles/${profileID}`}>
        <Avatar className={classes.avatar} src={avatar}/>
      </Link>
      <Link
         className={classes.link}
         to={`/profiles/${profileID}`} >

        {username}
      </Link>

      <FollowButton
        updating={statusUpdating}
        followFn={follow}
        unfollowFn={stopFollowing}
        follow={followingStatus} />

    </ListItem>
  );
};

export default Item;

Item.propTypes = {
  profileID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  suggestionMode: PropTypes.bool.isRequired
}

Item.defaultProps = {
  profileID: "",
  username: "profile_name",
  avatar: "",
  suggestionMode: true
}