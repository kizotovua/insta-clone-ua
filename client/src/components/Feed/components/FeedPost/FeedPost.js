import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box";
import FavoriteIcon from '@material-ui/icons/Favorite';
import useStyles from "./styles";
import {ProfileContext} from "../../../../context/ProfileContext";
import postComment from "../../../../utils/api/postComment";
import getComments from "../../../../utils/api/getComments";
import getPostById from "../../../../utils/api/getPostById";
import likePost from "../../../../utils/api/likePost";
import {dateOptions} from "../../../../utils/variables";
import {useHTTP} from "../../../../hooks/http.hook";
import {AuthContext} from "../../../../context/AuthContext";
import Comment from "../../../shared/Comment/Comment";
import CommentTextArea from "../../../shared/CommentTextArea/CommentTextArea";


export const FeedPost = ({postID, currentComments, currentLikes, title, date, author,authorID, avatar, image}) => {

  const { profile: {avatar: userAvatar, username} } = useContext(ProfileContext),
        { loading, setLoading } = useHTTP(),
        { token, userID } = useContext(AuthContext);

  const commentsInitial = [{
    _id: '',
    text: '',
    avatar: '',
    username: ''
  }];

  const [comments, setComments] = useState(commentsInitial),
        [commentInputOpen, setCommentInputOpen] = useState(true),
        [newCommentText, setNewCommentText] = useState(''),
        [postButtonDisabled, setPostButtonDisabled] = useState(true),
        [likes, setLikes] = useState([]),
        [expanded, setExpanded] = React.useState(false);

  const isCurrentUserLike = likes.some(id => userID === id);

  React.useEffect(() => {
    if(newCommentText === '') {
      setPostButtonDisabled(true);
    } else {
      setPostButtonDisabled(false);
    }
  }, [newCommentText]);

  React.useEffect(() => {
    if(currentComments.length) {
      setComments(currentComments.reverse());
    }
  }, [currentComments]);

  React.useEffect(() => {
    if(currentLikes.length) {
      setLikes(currentLikes);
    }
  }, [currentLikes]);

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
        res.length ? setComments(res) : setComments(commentsInitial)
      });
  }

  const commentChangeHandler = (ev) => {
    setNewCommentText(ev.target.value)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const commentAreaRef = React.createRef();

  const addComment =(ev) => {
    ev.preventDefault();
    setPostButtonDisabled(true);
    setExpanded(true);
    if(commentAreaRef.current) {
      commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight
    }

    postComment(postID, userID, username,userAvatar,newCommentText,token)
      .then(() => {
        getComments(postID, token)
          .then(res => setComments(res))
          .then(() => setNewCommentText(''))
      })
  };

  const likeThisPost = (ev) => {
    ev.preventDefault();
    likePost(postID, userID,isCurrentUserLike,token)
      .then(res => {
        if(!res.errors) {
          updateLikes();
        }
      })
  }
  let commentInputDisplayProp;
  if(commentInputOpen) {
    commentInputDisplayProp = "block"
  } else {
    commentInputDisplayProp = "none"
  }

  const publishedDate = new Date(+date).toLocaleString('ru', dateOptions);

  const classes = useStyles();

  return (
        <Card className={classes.root}>
          <CardHeader className={classes.header}
            avatar={
              <Link to={`/profiles/${authorID}`}>
                <Avatar src={avatar} className={classes.avatar} />
              </Link>
            }
            title={
              <Link className={classes.authorName} to={`/profiles/${authorID}`}>
                {author}
              </Link>
            }
          />
          <CardMedia
            data-testid="cardMedia"
            onClick={likeThisPost}
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent className={classes.header}>
            <Typography className={classes.captionText} color="textSecondary" component="span">
              {title}
            </Typography>
            <Typography paragraph className={classes.date} color="textSecondary" component="span">
              {publishedDate}
            </Typography>
          </CardContent>

          <CardActions className={classes.cardActions} disableSpacing>
              <IconButton className={classes.postActionButton} disabled={loading} onClick={likeThisPost} aria-label="like">
                  {isCurrentUserLike && <FavoriteIcon color="secondary"/>}
                  {!isCurrentUserLike && <FavoriteBorderIcon/>}
              </IconButton>

            <Typography component="span" color={"textSecondary"} variant={"body2"}>
              {likes.length}
            </Typography>
            <IconButton className={classes.postActionButton} aria-label="comment" onClick={() => setCommentInputOpen(!commentInputOpen)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography component="span" color={"textSecondary"} variant={"body2"}>
              {!comments[0]._id  ? 0 : comments.length}
            </Typography>
            { comments.length >= 2 &&
              <>
                <Box className={classes.commentExpand} aria-label="show more" >
                  <Typography className={classes.expandIconText} variant="body2" color="textSecondary" align="right" component="span">
                    {!expanded && 'see more...'}
                    { expanded && 'minimize...'}
                  </Typography>
                </Box>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </>
            }
          </CardActions>

           { comments[0]._id &&
             <CardContent className={classes.comments}>
             <Comment key={comments[0]._id}
                      commentID={comments[0]._id}
                      userID={comments[0].userID}
                      text={comments[0].text}
                      avatar={comments[0].avatar}
                      username={comments[0].username}
                      date={comments[0].date}
                      updateFn={updateComments}/>
             </CardContent>
           }

          { comments.length >= 2 &&
          <Collapse ref={commentAreaRef} className={classes.collapse} in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.comments}>

              {comments.map((c, index) => {
                if(index > 0) {
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
            </CardContent>
          </Collapse>
          }

          <CardContent style={{display: commentInputDisplayProp, padding: 0}}>
            <CommentTextArea
              changeHandler={commentChangeHandler}
              submitFn={addComment}
              disabled={postButtonDisabled}
            />
          </CardContent>
        </Card>
  );

}
export default FeedPost;

FeedPost.propTypes = {
  postID: PropTypes.string.isRequired,
  currentComments: PropTypes.array,
  currentLikes: PropTypes.array,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorID: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

FeedPost.defaultProps = {
  currentComments: [],
  currentLikes: [],
  title: '',
  avatar: ''
}