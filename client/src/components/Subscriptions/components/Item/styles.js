import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({

  root: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 2fr",
    padding: theme.spacing(.5),
  },
  linkAvatar: {
    width: theme.spacing(4),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    fontWeight: "500",
    '&:hover': {
      textDecoration: "underline",
    },
    '&::focus': {
      color: theme.palette.secondary
    },

    [theme.breakpoints.down('lg')]: {
      fontSize: "0.85em",
      overflowX: "hidden"
    },

  },
  avatar: {
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
  }
}));

export default useStyles;