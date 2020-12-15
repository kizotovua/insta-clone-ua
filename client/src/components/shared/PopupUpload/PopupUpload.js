import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from "material-ui-image";
import useStyles from "./styles";
import {ProfileContext} from "../../../context/ProfileContext";
import {AuthContext} from "../../../context/AuthContext";
import {useHTTP} from "../../../hooks/http.hook";
import sharePost from "../../../utils/api/sharePost";
import Loader from "../Loader/Loader";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";
import {bool, func} from 'prop-types';


const PopupUpload = ({ handleClose, isOpen }) => {

  const { request, error, setError, resetError } = useHTTP(),
          errorTimeout = 6000; //msc

  const [fileInputState, setFileInputState] = useState(''),
        [previewSource, setPreviewSource]   = useState(''),
        [caption, setCaption]               = useState(''),
        [uploading, setUploading]           = useState(false);

  const { profile, profile: {userName}, updatePosts } = useContext(ProfileContext),
        { token, userID } = useContext(AuthContext);


  const shareHandler = async (e) => {
    e.preventDefault();
    setUploading(true);

    if(previewSource) {
      try {
        const cloudinaryResponse = await request('/api/upload/posts',
          'POST',
          {data: previewSource})

        const postData = {
          authorID: userID,
          authorName: userName,
          imgURL: await cloudinaryResponse.data.url,
          caption,
          likes:[],
          comments:[]
        }

        const result = await sharePost(postData, token);

        if(!result.errors) {
          updatePosts(postData,profile);
          closePopup();
        }

      } catch (err) {
        console.log(err);
      }
    } else {
      setError('No images to share')
    }
    setCaption('');
    setUploading(false);
  }
  const captionChangeHandler = (e) => {
      setCaption(e.target.value);
  }

  const closePopup = () => {
    handleClose();
    setPreviewSource('');
    resetError();
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
  const classes = useStyles();

  return (
    <>

      {uploading && <Loader />}
      <AlertSnackbar status={error} text={error} msgType="error" timeout={errorTimeout}/>

      <Dialog fullWidth
              maxWidth="sm"
              open={isOpen}
              onClose={handleClose}
              aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <>
          <label htmlFor="upload-photo">
            <input
              className={classes.fileInput}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={handleFileInputChange}
              value={fileInputState}
            />
            <div className={classes.photoUploader}>
              {previewSource && <Image src={previewSource} cover/>}
            </div>
          </label>
          </>

          <TextField
            autoFocus
            margin="dense"
            id="post"
            label="Write a caption..."
            type="text"
            fullWidth
            inputProps={{ maxLength: 250 }}
            onChange={captionChangeHandler} />

        </DialogContent>
        <DialogActions>
          <Button disabled={uploading}
                  onClick={closePopup}
                  color="primary">

            Cancel
          </Button>
          <Button disabled={uploading}
                  variant="contained"
                  onClick={shareHandler}
                  color="primary">

            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupUpload;

PopupUpload.propTypes = {
  handleClose: func.isRequired,
  isOpen: bool,
}

PopupUpload.defaultProps = {
  isOpen: false
}