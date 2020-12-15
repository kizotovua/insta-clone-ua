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
    gridTemplateColumns: "60% 40%",
    height: "65vh",

    [theme.breakpoints.up('xs')]: {
      width: "95%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "90%",
    },
    [theme.breakpoints.up('md')]: {
      width: "70%",
    },
    [theme.breakpoints.up('lg')]: {
      width: "55%",
    },
    [theme.breakpoints.up('xl')]: {
      width: "45%",
    },
    outline: "none"
  },
  image: {
    gridColumn: "1/2",
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
    alignItems: "center",
    padding: theme.spacing(1),
  },
  username: {
    color: theme.palette.text.primary,
    fontSize: "0.8em",
  },
  avatar: {
    marginRight: theme.spacing(1)
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