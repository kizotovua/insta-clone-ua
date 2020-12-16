import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { deepOrange} from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0095f6",
    },
    secondary: {
      main: deepOrange[800],
    },
    text: {
      primary: "#404040"
    }
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 480,
      md: 760,
      lg: 1040,
      xl: 1400,
    },
  },
});

export default theme;