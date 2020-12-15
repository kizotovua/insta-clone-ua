import React from 'react';
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import PropTypes from 'prop-types';


const FollowButton = ({updating, followFn, unfollowFn, follow, styleClassname, buttonText}) => {
  const classes = useStyles();

  const mode = {
    follow: {
      text: "follow",
      style: styleClassname || classes.follow,
      color: "primary",
      variant: "text",
      handler: followFn,
    },
    unfollow: {
      text: buttonText || "unfollow",
      style: styleClassname || classes.unfollow,
      color: "default",
      variant: "text",
      handler: unfollowFn
    }
  }

 let text, style, color, variant, handler;

 follow
 ? { follow:    { text, style, color, variant, handler } } = mode
 : { unfollow:  { text, style, color, variant, handler } }  = mode;

  return (
    <Button
      className={style}
      disableFocusRipple
      disabled={updating}
      size="small"
      color={color}
      variant={variant}
      onClick={handler} >
      {text}
    </Button>
  );
};

export default FollowButton;

FollowButton.propTypes = {
  updating: PropTypes.bool,
  followFn: PropTypes.func.isRequired,
  unfollowFn: PropTypes.func,
  follow: PropTypes.bool,
  styleClassname: PropTypes.string,
  buttonText: PropTypes.string
}

FollowButton.defaultProps = {
  updating: false,
  follow: false,
  unfollowFn: () => {},
  styleClassname: null,
  buttonText: null
}