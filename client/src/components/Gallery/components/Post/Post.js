import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Typography from "@material-ui/core/Typography";
import {gridGap} from "../../styles";
import {cloudinaryURL} from "../../../../utils/variables";
import useStyles from "./styles";
import PostPopup from "../PostPopup/PostPopup";
import PropTypes from 'prop-types';

const Post = ({ postID, width, image, title, date,
                currentComments, currentLikes,
                profileUpdater,
                profile:{ username,avatar }}) => {

  const [postPopupOpen, setPostPopupOpen] = useState(false);

  const openPostModal = (ev) => {
    ev.preventDefault();
    setPostPopupOpen(true);
  }

  const closePostModal = (ev) => {
    ev.preventDefault();
    setPostPopupOpen(false);
    profileUpdater();
  }

  const classes = useStyles();
  return (
    <>
      <PostPopup isOpen={postPopupOpen}
                 data={{image,postID,title,date,username,avatar}}
                 handleOpen={openPostModal}
                 handleClose={closePostModal}
      />

    <div
      style={{
        width: `calc(${width}px - ${gridGap}px)`,
        height:`calc(${width}px - ${gridGap}px)`,
        position: 'relative',
        backgroundImage: `url(${cloudinaryURL}insta_images/no-image_yraby4.jpg)`
      }}>

      <div onClick={openPostModal} className={classes.cover}>
        <div className={classes.iconWrapper}>
          <FavoriteIcon className={classes.icon} />
          <div>
            <Typography className={classes.amount}>
              {currentLikes.length}
            </Typography>
          </div>
        </div>
        <div className={classes.iconWrapper}>
          <ChatBubbleIcon className={classes.icon}/>
          <div>
            <Typography className={classes.amount}>
              {currentComments.length}
            </Typography>
          </div>
        </div>
      </div>
      <img className={classes.image} src={image} alt={title}/>
    </div>
    </>
  );
};

export default Post;

Post.propTypes = {
  postID: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  currentComments: PropTypes.array,
  currentLikes: PropTypes.array,
  profileUpdater: PropTypes.func.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string
}

Post.defaultProps = {
  title: '',
  avatar: '',
  currentComments: [],
  currentLikes: []
}