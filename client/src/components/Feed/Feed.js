import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import useStyles from "./styles";
import {AuthContext} from "../../context/AuthContext";
import {useHTTP} from "../../hooks/http.hook";
import fetchPosts from "../../utils/api/fetchPosts";
import fetchProfiles from "../../utils/api/fetchProfiles";
import FeedPost from "./components/FeedPost/FeedPost";
import AlertSnackbar from "../shared/AlertSnackbar/AlertSnackbar";

export const Feed = ({ subscriptions:{ recommendations, following }}) => {
 const  classes = useStyles();

 const [ feed, setFeed ] = useState([]),
       [ start, setStart ] = useState(0),
       { error, setError } = useHTTP(),
       errorTimeout = 6000, //msc
       { token } = useContext(AuthContext);

  const quantityLoaded = 3;

  useEffect(getPosts,[recommendations, following]);

  async function getPosts() {
    let ids;
   try {
     if(following.length < 3) {
       ids = [...following, ...recommendations]

     } else { ids = [...following] }

     let posts = await fetchPosts(ids, token, start, quantityLoaded);

     if(!posts.errors && posts.length < 3) {
       posts = await fetchPosts([...following, ...recommendations], token, start, quantityLoaded);
     }

     if(!posts.errors) {
       setStart(start + quantityLoaded);

       const authorsID = posts.map(post => post.authorID);
       const authorsData = await fetchProfiles(authorsID, token);

       const data = posts.map(post => {
         let completeData;

         authorsData.forEach(author => {
           if(post.authorID === author.id) {

             completeData = {
               ...post,
               username: author.username,
               avatar: author.avatar
             }
           }
         });

         return completeData
       });

       const postsUpdates = data.reverse()
       setFeed([...feed,...postsUpdates]);
     }
   } catch (err) {
     setError('Feed loading failed...');
     console.error(err.message)
   }
  }

  return (
        <>
        <AlertSnackbar status={error} text={error} msgType="error" timeout={errorTimeout}/>
          <InfiniteScroll
            className={classes.feedItems}
            dataLength={feed.length}
            next={getPosts}
            hasMore={true}
            loader={null} >

            { feed.map(post => (
              <FeedPost
                key={post._id}
                postID = {post._id}
                currentComments={post.comments}
                currentLikes= {post.likes}
                title={post.caption}
                date={post.date}
                image={post.imgURL}
                author={post.username}
                authorID={post.authorID}
                avatar={post.avatar}
              />
            ))}

          </InfiniteScroll>
        </>
  );
}

export default Feed;

Feed.propTypes = {
  subscriptions: PropTypes.object,
}

Feed.defaultProps = {
  subscriptions: {
    recommendations: [],
    following: []
  }
}