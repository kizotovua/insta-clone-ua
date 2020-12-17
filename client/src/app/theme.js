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
      md: 720,
      lg: 1020,
      xl: 1280,
    },
  },
});

export default theme;