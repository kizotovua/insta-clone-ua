import {makeStyles} from "@material-ui/core/styles";
import {mdScreen, smScreen} from "../../../../utils/variables";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: smScreen,
    [theme.breakpoints.up('xs')]: {
      maxWidth: smScreen
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: mdScreen
    },
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
  }
}));

export default useStyles;