import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`
  },

  homeIcon: {
    fill: theme.palette.text.primary,
  },
  homeIconBtn: {
    '&:hover': {
      background: "transparent"
    }
  },
  removal: {
    fontSize: ".8em",
    "&:hover": {
      backgroundColor: "red",
      color: "white"
    }
  }
}));

export default useStyles;