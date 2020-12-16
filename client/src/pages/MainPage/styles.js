import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: theme.spacing(10),
    display: "grid",
    gridTemplateColumns: "68% 32%",

    [theme.breakpoints.down('sm')]: {
      display: "grid",
      gridTemplateColumns: "1fr",
    },
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

    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  }
}));

export default useStyles;