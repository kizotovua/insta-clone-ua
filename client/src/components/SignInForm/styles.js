import {makeStyles} from "@material-ui/core/styles";

const useStyles =  makeStyles((theme) => ({
  avatarWrapper: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "reverse",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  avatarPic: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: "10%"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  logo: {
    margin: theme.spacing(1),
    background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fileInput: {
    display: "none"
  },
  fab: {
    marginRight: theme.spacing(1)
  },
  passwordField: {
    position: "relative"
  },
  passVisibleButton: {
    position: "absolute",
    right: "15px",
    top:"55%",
    transform: "translateY(-40%)",
    cursor:"pointer"
  },
}));

export default useStyles;