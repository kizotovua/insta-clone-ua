import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 root: {
   maxWidth: "100%",
   padding: theme.spacing(1),
   display: "flex",
   flexDirection: "column",
 },
  author: {
   position: "relative",
   width: "100%",
   display: "flex",
   alignItems: "center",
  },
  avatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(.5)
  },
  usernameWrapper: {
   marginRight: theme.spacing(1)
  },
  username:{
    fontSize: '0.9em',
    color: theme.palette.text.primary,
    textDecoration: "none"
  },
  date: {
   fontSize: "0.75em"
  },
  remove: {
   padding: 0,
   position: "absolute",
   top: 0,
   right: 0,
   transform: "scale(0.9)"
  },
  textWrapper: {
   maxWidth: "95%",
   wordWrap: "break-word",
   whiteSpace:"normal",
   padding: "5px 0"

  },
  text: {
    fontSize: "1em",
    margin: 0
  },
}));

export default useStyles;