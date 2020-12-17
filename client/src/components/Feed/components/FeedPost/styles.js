import {makeStyles} from "@material-ui/core/styles";
import {grey, red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: theme.spacing(8)
  },
  header: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(.5),
    paddingBottom: theme.spacing(.5),
  },
  media: {
    width: "100%",
    paddingTop: "75%",
    cursor: "pointer",
  },
  authorName: {
    fontSize: "1em",
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 0,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    padding: theme.spacing(0.5)
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  postActionButton: {
    padding: theme.spacing(0.5),
  },
  avatar: {
    backgroundColor: red[500],
  },
  captionText: {
    fontSize: "0.95em",
    fontWeight: "bold"
  },
  date: {
    margin: "8px 0",
    fontSize: "0.95em",
    display: "block"
  },
  collapse: {
    maxHeight: "400px",
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
  comments: {
    maxWidth: "100%",
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: "0 !important",
    display: "flex",
    flexDirection: "column",
  },
  cardActions: {
    padding: "0 8px"
  },
  commentExpand: {
    marginLeft: "auto",
  },
  expandIconText: {
    [theme.breakpoints.down('xs')]:{
      fontSize: '0.8em'
    },
  }
}));

export default useStyles;