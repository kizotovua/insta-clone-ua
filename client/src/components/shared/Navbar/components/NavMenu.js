import React, {useContext} from 'react';
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
import {AuthContext} from "../../../../context/AuthContext";
import UserAvatar from "../../UserAvatar/UserAvatar";
import {ProfileContext} from "../../../../context/ProfileContext";
import useStyles from "./styles";

export default function NavMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory();
  const { logout, userID } = useContext(AuthContext);
  const { signOut } = useContext(ProfileContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    signOut();
    logout();
    history.push('/login')
  }
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
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}
