import React, {useContext, useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Typography from "@material-ui/core/Typography";
import {cloudinaryURL} from "../../../../utils/variables";
import useStyles from "./styles";
import PostPopup from "../PostPopup/PostPopup";
import deletePost from "../../../../utils/api/deletePost";
import {AuthContext} from "../../../../context/AuthContext";
import {useHTTP} from "../../../../hooks/http.hook";
import PropTypes from 'prop-types';
import {gridGap} from "../../styles";

const Post = ({ postID,
                width, image,
                title, date,
                currentComments, currentLikes,
                profileUpdater, isOwn,
                profile:{ username,avatar }}) => {

  const [postPopupOpen, setPostPopupOpen] = useState(false);
  const [alertPopupOpen, setAlertPopupOpen] = useState(false);
  const { loading, setLoading } = useHTTP();
  const { token } = useContext(AuthContext)

  const openPostModal = (ev) => {
    ev.preventDefault();
    setPostPopupOpen(true);
  }

  const closePostModal = () => {
    setPostPopupOpen(false);
    profileUpdater();
  }

  const closeAlertPopup = () => setAlertPopupOpen(false);
  const openAlertPopup = () => setAlertPopupOpen(true);

  async function removePost() {
    setLoading(true);
    try {
      const deleteRes = await deletePost (postID, image.slice(61, -4),token);

      if(!deleteRes.errors) {
        closeAlertPopup();
        closePostModal();
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }

  const classes = useStyles();
  return (

    <div
      className={classes.root}
      style={{
        width: `calc(${width}px - ${gridGap}px)`,
        height:`calc(${width}px - ${gridGap}px)`,
        position: 'relative',
        backgroundImage: `url(${cloudinaryURL}insta_images/service/no-image_yraby4.jpg)`
      }}>

      <PostPopup isOpen={postPopupOpen}
                 isOwnProfile={isOwn}
                 data={{image,postID,title,date,username,avatar}}
                 handleOpen={openPostModal}
                 handleClose={closePostModal}
                 alertPopupOpen={alertPopupOpen}
                 handleCloseAlert={closeAlertPopup}
                 handleOpenAlert={openAlertPopup}
                 isRemovalProcessing={loading}
                 removePost={removePost} />

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
  );
};

export default Post;

Post.propTypes = {
  postID: PropTypes.string.isRequired,
  isOwn: PropTypes.bool.isRequired,
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