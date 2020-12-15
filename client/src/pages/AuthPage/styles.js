import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  container: {
    boxSizing: "border-box",
    width: "100%",
    height: "100vh",
    paddingTop: theme.spacing(2),
  }
}));

export default useStyles;