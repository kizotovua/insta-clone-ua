import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    position: "fixed",
    top: "0",
    zIndex: "1000",
    backgroundColor: "white"
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0
  },
  link: {
    position: "relative",
    top: theme.spacing(1),
  }
}));

export default useStyles;