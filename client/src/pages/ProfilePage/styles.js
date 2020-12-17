import {makeStyles} from "@material-ui/core/styles";
import {lgScreen, mdScreen, smScreen} from "../../utils/variables";

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: theme.spacing(10),

    [theme.breakpoints.up('xs')]: {
     maxWidth: smScreen
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: mdScreen
    },
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