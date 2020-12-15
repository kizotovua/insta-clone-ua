import makeStyles from "@material-ui/core/styles/makeStyles";
import {cloudinaryURL} from "../../../utils/variables";

const useStyles = makeStyles((theme) => ({
  photoUploader: {
    margin: "0 auto",
    width: "100%",
    minHeight: "20vh",
    backgroundImage: `url(${cloudinaryURL}insta_images/service/Pictures-icon_p6vzam.png)`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    cursor: "pointer"
  },
  fileInput: {
    display: "none !important"
  }
}));

export default useStyles;