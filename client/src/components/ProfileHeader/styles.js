import makeStyles from "@material-ui/core/styles/makeStyles";
import { grey } from "@material-ui/core/colors"
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: theme.spacing(2),
  },

  avatar: {
    gridColumn: "1/2",
    width: "150px",
    height: "150px",
  },

  toolbar: {
    gridColumn: "2/4",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gridGap: theme.spacing(1),
    alignItems: "center"
  },

  name: {
    color: grey[800],
    gridColumn: '1/2',
    gridRow: '1/2',
  },
  settings: {
    gridColumn: "2/4",
    display: "flex",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems:"center"
  },
  buttonUnfollow: {
    boxSizing: 'border-box',
    textTransform: "capitalize",
    color: grey[800],
    marginRight: theme.spacing(1),
    border: '1px solid lightgray'
  },
  buttonFollow: {
    boxSizing: 'border-box',
    textTransform: "capitalize",
    marginRight: theme.spacing(1),
    border: '1px solid lightgray',
  },
  statistics: {
    gridColumn: "1/3",
    display:"flex",
    justifyContent: "space-between"
  },
  username: {
    gridRow: "3/4",
    gridColumn: "1/2"
  },
  iconWrapper: {
    display: "flex",
    gridRow: "3/4",
    gridColumn: "2/4",
    alignSelf:"center",
    alignItems: "center",
    color: "transparent",
    transition: "color .35s",
    "&:hover": {
      color: "grey"
    }
  },
  addIcon: {
    width: theme.spacing(6.5),
    padding: theme.spacing(1),
    "&:hover": {
      background: "transparent"
    }
  }

}));

export default useStyles;