import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
  },
  textarea: {
    fontSize: "1em",
    padding: "16px",
    paddingRight: "60px",
    borderRadius: "1px"
  },
  button: {
    position: "absolute",
    top: "43%",
    right: "10px",
    transform: "translateY(-45%) scale(.75)",
    fontSize: "1em",
    textTransform: "capitalize",
  }
}));

export default useStyles;