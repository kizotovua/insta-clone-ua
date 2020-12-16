import React, {useContext, useEffect, useState} from 'react';
import Modal from '@material-ui/core/Modal';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Image from "material-ui-image";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Comment from "../../../shared/Comment/Comment";
import {useHTTP} from "../../../../hooks/http.hook";
import {ProfileContext} from "../../../../context/ProfileContext";
import CommentTextArea from "../../../shared/CommentTextArea/CommentTextArea";
import AlertDialog from "../../../shared/AlertDialog/AlertDialog";
import {AuthContext} from "../../../../context/AuthContext";
import {dateOptions} from "../../../../utils/variables";
import getPostById from "../../../../utils/api/getPostById";
import getComments from "../../../../utils/api/getComments";
import postComment from "../../../../utils/api/postComment";
import likePost from "../../../../utils/api/likePost";
import useStyles from './styles';
import PropTypes from 'prop-types';


export const PostPopup = ({ isOpen,
                            isOwnProfile,
                            handleClose,
                            removePost,
                            handleCloseAlert,
                            handleOpenAlert,
                            alertPopupOpen,
                            data:{ postID,image,date,
                            title: caption,username,avatar }}) => {

  const { token, userID } = useContext(AuthContext);
  const {profile: { avatar: userAvatar, username: nickName }} = useContext(ProfileContext);
  const { loading, setLoading } = useHTTP();

  const commentsInitial = [{
    _id: '',
    text: '',
    avatar: '',
    username: ''
  }];

  const [comments, setComments] = useState(commentsInitial);
  const [newCommentText, setNewCommentText] = useState('');
  const [postButtonDisabled, setPostButtonDisabled] = useState(true);
  const [likes, setLikes] = useState([]);
  const publishedDate = new Date(+date).toLocaleString('ru', dateOptions);

  const isCurrentUserLike = likes.some(id => userID === id);

  useEffect(() => {
    if(newCommentText === '') {
      setPostButtonDisabled(true);
    } else {
      setPostButtonDisabled(false);
    }
  }, [newCommentText]);

  useEffect(updateComments, []);
  useEffect(updateLikes, []);

  function updateLikes() {
    setLoading(true);
    getPostById(postID, token)
      .then(r => {
        setLikes(r.likes)
      })
      .then(() => setLoading(false));
  }
  function updateComments() {
    getComments(postID, token)
      .then(res => {
        res.length ? setComments(res.reverse()) : setComments(commentsInitial)
      });
  }
  const commentChangeHandler = (ev) => {
    setNewCommentText(ev.target.value)
  }

  const addComment =(ev) => {
    ev.preventDefault();
    setPostButtonDisabled(true);

    postComment(postID, userID, nickName,userAvatar,newCommentText,token)
      .then(() => {
        getComments(postID, token)
          .then(res => setComments(res.reverse()))
          .then(() => setNewCommentText(''))
      });
  };

  const likeThisPost = (ev) => {
    ev.preventDefault();
    likePost(postID, userID,isCurrentUserLike,token)
      .then(res => {
        if(!res.errors) {
          updateLikes();
        }
      });
  }

  const classes = useStyles();
  return (
    <>
      <AlertDialog titleText= "Are you sure want to remove?"
                   caption="Press confirm to delete this post"
                   handleClose={handleCloseAlert}
                   isOpen={alertPopupOpen}
                   confirmHandler={removePost} />

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.root}
      >
        <div className={classes.paper}>
          <Image onClick={likeThisPost}
                 cover
                 imageStyle={{width: "100%", height:"100%"}}
                 color="rgba(255,255,255,0.1)"
                 src={image}
                 className={classes.image}/>

          <div className={classes.caption}>
            <div className={classes.author}>
              <div className={classes.userDataWrapper}>
                <Avatar className={classes.avatar} src={avatar}/>
                <Typography className={classes.username} >
                {username}
              </Typography>
              </div>

              { isOwnProfile &&
              <IconButton disableFocusRipple
                          className={classes.removeIcon}
                          onClick={handleOpenAlert}
                          aria-label= "remove post">
                <DeleteForeverIcon />
              </IconButton>
              }

            </div>

            <div className={classes.postCaption}>
              <Typography variant="body2" color="textPrimary" >
                {caption}
              </Typography>
            </div>

            <div className={classes.title}>
              <div>
                <Typography className={classes.date} variant="body2" color="textSecondary" >
                  {publishedDate}
                </Typography>
              </div>
              <IconButton className={classes.likeIcon}
                          disableFocusRipple
                          disabled={loading}
                          onClick={likeThisPost}
                          aria-label="like">
                {isCurrentUserLike && <FavoriteIcon  color="secondary"/>}
                {!isCurrentUserLike && <FavoriteBorderIcon />}
              </IconButton>
            </div>

            <div className={classes.comments}>
              {comments.map(c => {

                if(comments[0]._id) {
                  return (
                    <Comment key={c._id}
                             commentID={c._id}
                             userID={c.userID}
                             text={c.text}
                             avatar={c.avatar}
                             username={c.username}
                             date={c.date}
                             updateFn={updateComments}/>
                  );
                }
              })}
            </div>

            <CommentTextArea
              className={classes.textarea}
              changeHandler={commentChangeHandler}
              disabled={postButtonDisabled}
              submitFn={addComment} />

          </div>
        </div>
      </Modal>
    </>
  );
}

export default PostPopup;

PostPopup.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  isOwnProfile:PropTypes.bool.isRequired,
  removePost:PropTypes.func.isRequired,
  handleCloseAlert:PropTypes.func.isRequired,
  handleOpenAlert:PropTypes.func.isRequired,
  alertPopupOpen:PropTypes.bool
}

PostPopup.defaultProps = {
  isOpen: false,
  alertPopupOpen: false
}
