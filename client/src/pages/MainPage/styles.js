import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: "100px 0 0 0",
    display: "grid",
    gridTemplateColumns: "68% 32%",
  },
  feed: {
    gridColumn: "1/2"
  },
  subscriptions: {
    position: "sticky",
    top: "100px",
    height: "100vh",
    width: "100%",
    gridColumn: "2/3",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  }
}));

export default useStyles;