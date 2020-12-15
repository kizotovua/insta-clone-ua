import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  follow: {
    justifySelf: "end",
    transform: "scale(0.8)",
    fontSize: "1.1em",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  unfollow: {
    justifySelf: "end",
    transform: "scale(0.8)",
    fontSize: "1em",
    fontWeight: "400",
    textTransform: "capitalize",
    color: "#404040"
  }
}));

export default useStyles;