import React, {useContext, useState} from 'react';
import {useHistory}  from "react-router-dom";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import UserAvatar from "../../UserAvatar/UserAvatar";
import AlertDialog from "../../AlertDialog/AlertDialog";
import {AuthContext} from "../../../../context/AuthContext";
import {ProfileContext} from "../../../../context/ProfileContext";
import deleteAccount from "../../../../utils/api/deleteAccount";
import {useHTTP} from "../../../../hooks/http.hook";
import useStyles from "./styles";

export default function NavMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alertPopupOpen, setAlertPopupOpen] = useState(false);
  const { loading, setLoading } = useHTTP();
  const anchorRef = React.useRef(null);
  const history = useHistory();
  const { logout, userID, token } = useContext(AuthContext);
  const { signOut, profile: { posts, avatar } } = useContext(ProfileContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    signOut();
    logout();
    history.push('/login')
  }

  const removeProfileHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const imageIDs = posts.map(p => p.imgURL.slice(61, -4));
      const avatarId = avatar.slice(61, -4);
      const deleteRes = await deleteAccount(userID,[...imageIDs, avatarId],token);

      if(!deleteRes.errors) {
        signOut();
        logout();
        history.push('/login')
      }
      setLoading(false);

    } catch (e) {
      setLoading(false);
    }
  }

  const closeAlertPopup = () => setAlertPopupOpen(false);
  const openAlertPopup = () => setAlertPopupOpen(true);

  const goFeed = (ev) => {
    ev.preventDefault();
    history.push('/feed')
  }
  const goMyProfile = (ev) => {
    ev.preventDefault();
    history.push(`/profiles/${userID}`)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <>
        <AlertDialog titleText= "Are you sure want to remove your profile?"
                     caption="Please confirm deletion of all data related to your account"
                     disabledButton={loading}
                     handleClose={closeAlertPopup}
                     isOpen={alertPopupOpen}
                     confirmHandler={removeProfileHandler} />
      </>

      <IconButton disableFocusRipple
                  className={classes.homeIconBtn}
                  onClick={goFeed}
                  component="div">
          <HomeOutlinedIcon className={classes.homeIcon}/>
      </IconButton>
        <Button
          className={classes.button}
          disableRipple
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <UserAvatar classname={classes.avatar}/>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={goMyProfile}>My account</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    <MenuItem className={classes.removal} onClick={openAlertPopup}>Remove Account</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}