import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({

  root: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr 2fr",
    padding: theme.spacing(.5),
  },
  linkAvatar: {
    width: "32px",
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
    }
  },
  avatar: {
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
  }
}));

export default useStyles;