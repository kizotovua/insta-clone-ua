import React, { useContext } from 'react';
import {Avatar} from "@material-ui/core";
import {ProfileContext} from "../../../context/ProfileContext";
import {string} from "prop-types";

const UserAvatar = ({ classname }) => {
 const { profile } = useContext(ProfileContext);

  return (
    <Avatar
      className={classname}
      src={profile.avatar}
      alt={profile.name} />
  );
};

export default UserAvatar;

UserAvatar.propTypes = {
  classname: string,
}

UserAvatar.defaultProps = {
  classname: null
}