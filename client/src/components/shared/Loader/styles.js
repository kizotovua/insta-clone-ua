import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  light: {
    position: 'fixed',
    zIndex: "10000",
    top: 0,
    left: 0,
    height: "100vh",
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
  dark: {
    position: 'fixed',
    zIndex: "10000",
    top: 0,
    left: 0,
    height: "100vh",
    width: '100%',
    background: "rgba(0,0,0,0.2)",
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }

}));

export default useStyles;