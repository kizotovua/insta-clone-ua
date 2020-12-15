import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cover: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top:0,
    left:0,
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: "100",
    backgroundColor: "black",
    opacity: "0",
    cursor: 'pointer',
    transition: 'opacity linear .1s',
    "&:hover": {
      opacity: ".65"
    }
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "white",
    marginRight: theme.spacing(.5),
  },
  amount: {
    fontSize: ".8em",
    color: "white",
    fontWeight: "bold"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

export default useStyles;