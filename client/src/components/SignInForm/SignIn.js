import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import InstagramIcon from '@material-ui/icons/Instagram';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import {ProfileContext} from "../../context/ProfileContext";
import {AuthContext} from "../../context/AuthContext";
import {useHTTP} from "../../hooks/http.hook";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Loader from "../shared/Loader/Loader";
import getRecommendations from "../../utils/api/getRecommendations";
import Copyright from "../shared/Copyright/Copyright";
import AlertSnackbar from "../shared/AlertSnackbar/AlertSnackbar";
import {alertErrorTimeout} from "../../utils/variables";
import useStyles from "./styles";


export default function SignIn() {

  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const  { request, error, setError, resetError } = useHTTP();
  const [fileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginFormRendered, setLoginFormRendered] = useState(true);
  const [passVisible, setPassVisible] = React.useState(false),

  togglePassVisible = (ev) => {
      ev.preventDefault();
      setPassVisible(!passVisible);
  },

  toggleForm = (e) => {
    e.preventDefault();
    setLoginFormRendered(!isLoginFormRendered);
    setPreviewSource('');
  }

  const [authData, setAuthData ] = useState({
    email: '',
    password: '',
  }),

  loginChangeHandler = ev => {
    setAuthData({
      ...authData,
      [ev.target.name]: ev.target.value
    });
  },

  loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetError();
    try {
      const data = await request('/api/auth/login', 'POST', {...authData});
      if(!data.errors) {
        const { jwtToken: token, id } = await data;
        auth.login(token, id);
        await signIn(token, id)

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

    async function signIn(token, id) {
      try {
        const profileData = await request(
          `/api/profiles/${id}`,
          'GET',
          null,
          { Authorization: `Bearer ${token}` }
        );

        const posts = await request(
          '/api/posts',
          'GET',
          null,
          { Authorization: `Bearer ${token}`}
          );

        const { following } = await profileData;

        const recommendations = await getRecommendations(following, id, token);
        profile.signIn({
          ...profileData,
          ...recommendations,
          posts: [...posts]
        });

      } catch (e) {}
    }

  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
    name: '',
    surname:'',
    avatar: ''
  }),

  registerChangeHandler = (ev) => {
    if(!ev.target) {
      setNewUserData({
        ...newUserData,
        phone: ev
      });

    } else {
      setNewUserData({
        ...newUserData,
        [ev.target.name]: ev.target.value,
      });
    }
  }

  const handleFileInputChange = (e)=> {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const register = async () => {
    const data = await request('/api/auth/register', 'POST', {...newUserData});

    if (data.message === 'Such email has already been registered') {
      setError(data.message);
    }
    return data;
  }

  const setAvatar = async (profileID,token, avatarURL) => {
    try {
      await request(`/api/profiles/${profileID}/avatar`, 'PUT', {avatar: avatarURL }, {
        Authorization: `Bearer ${token}`
      });

    } catch (err) {}
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetError();

    const emptyData = Object.values(newUserData).reduce((cv,nv) => cv + nv).length === 0;

    if(previewSource && !emptyData) {
      try {
        const data = await register();

       if(!data.errors) {
        setTimeout(async () => {
          const cloudinaryResponse = await request('/api/upload/avatars', 'POST', {data: previewSource})
          const {email, password} = newUserData;
          const credentials = await request('/api/auth/login', 'POST', { email,password });

          if(!credentials.errors) {
            const {jwtToken: token, id} = await credentials;
            await setAvatar(id,token,cloudinaryResponse.data.url)
            auth.login(token, id);
            signIn(token, id).then(() => setLoading(false));
          }
        }, 3000);
       }

      } catch (err) {
        setLoading(false);
      }

    } else if (!emptyData) {
      try {
        const data = await register();
        if(!data.errors) {

          const {email, password} = newUserData;
          const credentials = await request('/api/auth/login', 'POST', { email,password });

          if(!credentials.errors) {
            const {jwtToken: token, id} = await credentials;
            auth.login(token, id);
            await signIn(token, id);
          }
        }
      } catch (err) {
        setLoading(false);
      }
    } else {
      setError('Registration data is empty');
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, [error]);

  const classes = useStyles();

  return (
    <>
    { loading && <Loader variant="dark"/>}

    <Container component="main" maxWidth="xs">

      <AlertSnackbar status={error} text={error} msgType="error" timeout={alertErrorTimeout}/>

      <div className={classes.paper}>
        <div className={classes.icons}>
          <Avatar className={classes.logo}>
            <InstagramIcon/>
          </Avatar>
          <Typography component="h2" variant="h3">
            {isLoginFormRendered && "Welcome"}
            {!isLoginFormRendered && "Create account"}
          </Typography>
        </div>

        { isLoginFormRendered && LoginForm(classes, loginChangeHandler, loginHandler, toggleForm, loading, passVisible, togglePassVisible) }
        { !isLoginFormRendered &&
        <>
          <div className={classes.avatarWrapper}>
            <Avatar className={classes.avatarPic} variant="square" src={previewSource} component="div"/>
            <div>
              <label htmlFor="upload-photo">
                <input
                  className={classes.fileInput}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handleFileInputChange}
                  value={fileInputState} />

                <Fab
                  className={classes.fab}
                  color= "secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended" >

                  <AddIcon/> upload

                </Fab>
              </label>

              <Fab
                color= "primary"
                size="small"
                component="span"
                aria-label="clear"
                variant="extended"
                onClick={ev => {
                  ev.preventDefault();
                  setPreviewSource('');
                }} >

                <DeleteIcon/>
              </Fab>
            </div>
          </div>

          <RegisterForm
            classes={classes}
            changeHandler={registerChangeHandler}
            registerHandler ={registerHandler}
            toggleForm={toggleForm}
            disabled={loading}
            passVisible={passVisible}
            togglePassVisible={togglePassVisible} />
        </>
        }
      </div>

      <Box mt={8}>
        <Copyright/>
      </Box>

    </Container>
    </>
  );
}