import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useStyles} from "./styles";
import NullItem from "./components/NullItem";
import Post from "./components/Post/Post";
import {useResize} from "../../hooks/resize.hook";
import {AuthContext} from "../../context/AuthContext";
import defineWidth from "../../utils/defineWidth";
import {lgScreen, mdScreen} from "../../utils/variables";

export default function Gallery({ profile, openUploadWindow, profileUpdater }) {

  const { userID } = useContext(AuthContext);
  const [own, setOwn] = useState(false);
  const { posts } = profile;

  const screen = defineWidth();
  let initialWidth;

  screen >= lgScreen
  ? initialWidth = mdScreen
  : initialWidth = screen;

  const containerRef = useRef();
  const { width } = useResize(containerRef, initialWidth);
  const columns = 3;
  const isEmpty = !posts.length;

  useEffect(() => {
    if(userID === profile.id) {
      setOwn(true);
    }
  },[profile,userID]);

  const classes = useStyles();
   return (
     <div ref={containerRef} className={classes.root}>
       { !isEmpty && posts.map( post => (
           <Post
             width={width/columns}
             postID = {post._id}
             profile={profile}
             image={post.imgURL}
             title={post.caption}
             date={post.date}
             currentComments={post.comments}
             currentLikes={post.likes}
             profileUpdater={profileUpdater}
             key= {post._id}
           />
         ))
       }
       {isEmpty &&
        <>
          { own &&
            <>
              <NullItem key={0} popupOpen={openUploadWindow} width={width * 0.9 / columns } />
              <NullItem key={1} popupOpen={openUploadWindow} width={width * 0.9 / columns } />
              <NullItem key={2} popupOpen={openUploadWindow} width={width * 0.9 / columns } />
            </>
          }
        </>
       }

     </div>
   );
}

Gallery.propTypes = {
  profile: PropTypes.object.isRequired,
  openUploadWindow: PropTypes.func.isRequired,
  profileUpdater: PropTypes.func.isRequired
}
