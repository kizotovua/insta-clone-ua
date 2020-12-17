import { makeStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root:{
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    paddingTop: 0,
    width: "95%",
    backgroundColor: "#fafafa",
    marginBottom: theme.spacing(5)
  },
  list: {
    maxWidth: "100%",
    position: "relative",
    maxHeight: "280px",
    overflowY: "scroll",
    backgroundColor: "#fafafa",
    '&::-webkit-scrollbar': {
      width: '0.3em',
      height: '0.3em'
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
  userTitleBox: {
    width: "95%",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3)

  },
  userAvatar: {
    width: "55px",
    height: "55px",
    marginRight: theme.spacing(3),

    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]:{
      width: "45px",
      height: "45px",
    },
  },
  userName: {
    color: theme.palette.text.secondary,
    fontSize: "0.9em",

    [theme.breakpoints.down('lg')]: {
      fontSize: "0.8em",
    },
  },
  titleBoxHeader: {
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
    maxWidth: "100%",
    marginBottom: theme.spacing(1)
  },
  titleText: {
    color: theme.palette.text.secondary,
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: "1em",

    [theme.breakpoints.down('lg')]: {
      fontSize: "0.9em",
    },

  },

}));

export default useStyles;