import React, { useContext, useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Gallery from "../../components/Gallery/Gallery";
import PopupUpload from "../../components/shared/PopupUpload/PopupUpload";
import Loader from "../../components/shared/Loader/Loader";
import {AuthContext} from "../../context/AuthContext";
import fetchProfiles from "../../utils/api/fetchProfiles";
import {useHTTP} from "../../hooks/http.hook";
import fetchPosts from "../../utils/api/fetchPosts";
import useStyles from "./styles";

const ProfilePage = (props) => {
  const { token } = useContext(AuthContext),
        { loading, setLoading, error, setError } = useHTTP(),
        [ popupUploadOpen, setPopupUploadOpen] = useState(false),
        [ profile, setProfile] = useState(null),
        {  match: { params: {id} } } = props;

  const classes = useStyles();


  useEffect(profileSetter, [id]);

  async function profileSetter() {
    setLoading(true);

    const posts = await fetchPosts([id], token);
    const data = await fetchProfiles([id], token);

    if (!data.errors && !posts.errors) {
      setProfile({ ...data[0], posts});
    } else {
      setError(`${data.errors} ${posts.errors}` )
    }

    setLoading(false);
  }

  const openPopupUpload = () => {
    setPopupUploadOpen(true);
  };
  const closePopupUpload = () => {
    setPopupUploadOpen(false);
    profileSetter();
  };


  return (
    <Container component="main" className={classes.page} maxWidth="md">
      { loading && <Loader/> }
      { profile &&
      <>
        <ProfileHeader profile={profile}
                       openUploadWindow={openPopupUpload} />

        <Gallery profile={profile}
                 openUploadWindow={openPopupUpload}
                 profileUpdater={profileSetter} />

        <PopupUpload handleClickOpen={openPopupUpload}
                     handleClose={closePopupUpload}
                     isOpen={popupUploadOpen} />
        </>
       }

      { error &&
        <>
        <Box>
          <Typography className={classes.errorTitleText} component="h1" variant="h3">
            <strong>Profile not found</strong> :(
          </Typography>

          <Typography className={classes.errorText} color="textSecondary" component="h3" variant="h5">
            It seems you are trying to access profile that does not exist
          </Typography>

          <div className={classes.button}>
            <Button onClick={() => props.history.goBack()} color="primary" variant="contained" >
              <ArrowBackIcon/>
              Go back
            </Button>
          </div>
        </Box>
        </>
      }

    </Container>

  );
};

export default ProfilePage;