import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: "100px 0 0 0",
  },
  errorTitleText: {
    marginBottom: theme.spacing(5),
    textAlign: "center"
  },
  errorText: {
    marginBottom: theme.spacing(5),
    textAlign: "center"
  },
  button: {
    display: 'flex',
    justifyContent: "center",
    width: "100%"
  }


}));

export default useStyles;