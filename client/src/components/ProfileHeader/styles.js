import makeStyles from "@material-ui/core/styles/makeStyles";
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      alignItems: "center"
    },
  },
  avatar: {
    gridColumn: "1/2",
    width: "150px",
    height: "150px",

    [theme.breakpoints.down('sm')]: {
      width: "120px",
      height: "120px",
    },

    [theme.breakpoints.down('xs')]: {
      width: "75px",
      height: "75px",
      justifySelf:"center"
    },
  },
  toolbar: {
    gridColumn: "2/4",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gridGap: theme.spacing(1),
    alignItems: "center",

    [theme.breakpoints.down('xs')]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  nameWrapper: {
    color: grey[800],
    gridColumn: '1/2',
    gridRow: '1/2',
  },
  name: {
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.2em",
      marginRight: theme.spacing(2)
    },
  },
  settings: {
    gridColumn: "2/4",
    display: "flex",
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems:"center",

    [theme.breakpoints.down('xs')]: {
      width: "100%"
    },
  },

  buttonUnfollow: {
    boxSizing: 'border-box',
    textTransform: "capitalize",
    color: grey[800],
    marginRight: theme.spacing(1),
    border: '1px solid lightgray',
  },
  buttonFollow: {
    boxSizing: 'border-box',
    textTransform: "capitalize",
    border: '1px solid lightgray',
    width: "50%",

    [theme.breakpoints.down('xs')]: {
      width: "100%"
    },
  },
  statistics: {
    gridColumn: "1/3",
    display:"flex",
    justifyContent: "space-between",
    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  statisticsAmount: {
    display: "block",
    fontSize: "1.3em",
    marginRight: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      fontSize: "1em",
    },
  },
  username: {
    gridRow: "3/4",
    gridColumn: "1/2",

    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  iconWrapper: {
    display: "flex",
    gridRow: "3/4",
    gridColumn: "2/4",
    alignSelf:"center",
    alignItems: "center",
    color: "transparent",
    textTransform:"capitalize",
    transition: "color .35s",
    "&:hover": {
      color: "grey"
    },
    [theme.breakpoints.down('xs')]: {
      color: "grey",
      width: "100%",
    },
  },
  addIcon: {
    width: theme.spacing(6.5),
    padding: theme.spacing(1),
    "&:hover": {
      background: "transparent"
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      width: "35px",
      height: "35px",
      marginRight: theme.spacing(1)
    },
  }
}));

export default useStyles;