import makeStyles from "@material-ui/core/styles/makeStyles";

export const gridGap = 10;

export const useStyles = makeStyles(theme => ({
 root: {
  display: "grid",
  padding: "20px 0",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: `${gridGap}px`,
  gridAutoRows: "minmax(min-content, 1fr)",
  justifyItems: "center",
  alignItems: "center"
 },

 photo: {
  width: "100%",
  height:"100%",
  objectFit: "cover"
 }

}))