import makeStyles from "@material-ui/core/styles/makeStyles";

export const gridGap = 8

export const useStyles = makeStyles(theme => ({
 root: {
  display: "grid",
  margin: "0 auto",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: theme.spacing(1),
  justifyItems: "center",
  gridAutoRows: "minmax(min-content, 1fr)"
 },
 photo: {
  width: "100%",
  height:"100%",
  objectFit: "cover"
 }
}))