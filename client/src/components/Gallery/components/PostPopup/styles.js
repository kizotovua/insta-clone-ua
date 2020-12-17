import {makeStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0,0,0,.85)',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    display: "grid",
    width: "250px",
    height: "250px",
    gridTemplateColumns: "100% 0",

    [theme.breakpoints.up('xs')]: {
      width: "300px",
      height: "300px"
    },
    [theme.breakpoints.up('sm')]: {
      width: "400px",
      height: "350px"
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: "65% 35%",
      width: "600px",
      height: "400px"
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: "60% 40%",
      width: "860px",
      height: "640px",
    },
    [theme.breakpoints.up('xl')]: {
      width: "1024px",
      height: "720px",
    },
    outline: "none"
  },
  image: {
    gridColumn: "1/2",
    cursor: "pointer",
  },
  caption: {
    gridColumn: "2/3",
    width: "100%",
    height: "100%",
    overflow:"hidden",
    display: "flex",
    flexDirection: "column",
    background: "#fafafa",
  },
  author: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  userDataWrapper: {
    display: "flex",
    alignItems: "center"
  },
  username: {
    color: theme.palette.text.primary,
    fontSize: "0.9em",
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  removeIcon: {
    padding: theme.spacing(.5),
    '&:hover':{
      background: 'transparent'
    }
  },
  postCaption: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    wordWrap: "break-word",
    whiteSpace:"normal",
  },
  date: {
    fontSize: "0.9em",
  },
  title: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1)
  },
  likeIcon: {
    padding: theme.spacing(.5),
    '&:hover':{
      background: 'transparent'
    }
  },
  comments: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid lightgrey",
    overflowY: "scroll",
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: grey[500],
      borderRadius: "5em"
    }
  },
  textarea: {
    marginTop: "auto"
  }
}));

export default useStyles;