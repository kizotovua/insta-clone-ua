import React, {useContext} from 'react';
import List from '@material-ui/core/List';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Item from "./components/Item/Item";
import UserAvatar from "../shared/UserAvatar/UserAvatar";
import {ProfileContext} from "../../context/ProfileContext";
import PropTypes from 'prop-types';


const Subscriptions = ({ profiles, suggestionMode }) => {

  const classes = useStyles();
  const { profile } = useContext(ProfileContext);
  const { name, username } = profile;
  const noContent = !profiles.length;
  let text;

  suggestionMode
    ? text = 'Suggestions for you'
    : text = 'You are following';

  return (
    <>
      { !noContent &&
      <div className={classes.root}>
        {
          suggestionMode &&
          <>
            <Box className={classes.userTitleBox}>
              <UserAvatar classname={classes.userAvatar}/>
              <div>
                <Typography className={classes.userName}>
                  {username}
                </Typography>
                <Typography>
                  {name}
                </Typography>
              </div>
            </Box>
          </>
        }

        <Box className={classes.titleBoxHeader}>
          <Typography className={classes.titleText}>
            {text}
          </Typography>
        </Box>
        <div className={classes.list}>
          <List>
            {
              profiles.map(profile => {
                const {id, username, avatar} = profile;
                return <Item profileID={id}
                             username={username}
                             avatar={avatar}
                             suggestionMode={suggestionMode}
                             key={id} />
              })
            }

          </List>
        </div>
      </div>
      }
    </>
  );
}

export default Subscriptions;

Subscriptions.propTypes = {
  profile: PropTypes.object.isRequired,
  suggestionMode: PropTypes.bool
}

Subscriptions.defaultProps = {
  profile: {},
  suggestionMode: false
}
