import React, {useContext} from 'react';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import {AuthContext} from "../../../context/AuthContext";
import deleteComment from "../../../utils/api/deleteComment";
import useStyles from "./styles";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Comment = ({commentID, text, username, avatar, userID, date, updateFn}) => {

  const { userID: ownID, token } = useContext(AuthContext);
  const ownComment = ownID === userID;

  const removeComment = () => {

    deleteComment(commentID, token)
      .then(res => {
      if(!res.errors) {
        updateFn()
      }
    });
  }
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const publishedDate = new Date(+date).toLocaleString('ru', dateOptions);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.author}>
        <Link to={`/profiles/${userID}`}>
          <Avatar src={avatar} className={classes.avatar}/>
        </Link>
        <div className={classes.usernameWrapper}>
          <Link to={`/profiles/${userID}`} className={classes.username}>
            {username}
          </Link>
        </div>
        <div>
          <Typography className={classes.date} color="textSecondary" component="span">{publishedDate}</Typography>
        </div>

        { ownComment && <IconButton onClick={removeComment}
                                    className={classes.remove}
                                    component="div">

                          <ClearIcon className={classes.remove}
                                            fontSize="small"
                                            color="secondary"
                          />
                        </IconButton> }

      </div>
      <div className={classes.textWrapper}>
        <Typography paragraph className={classes.text} color="textSecondary">
          {text}
        </Typography>
      </div>

    </div>
  );
};

export default Comment;

Comment.propTypes = {
  commentID: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  userID: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  updateFn: PropTypes.func.isRequired
}

Comment.defaultProps = {
  avatar: ''
}