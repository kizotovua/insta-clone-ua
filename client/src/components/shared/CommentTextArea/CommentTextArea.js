import React from 'react';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import PropTypes from 'prop-types';


const CommentTextArea = ({ changeHandler,disabled,submitFn }) => {
  const classes = useStyles();
  const clearInput = (ev) => ev.target.value = "";

  return (
    <div className={classes.root}>

      <OutlinedInput
        data-testid ="input"
        className={classes.textarea}
        fullWidth
        name="comment"
        inputProps={{maxLength:"1000"}}
        multiline
        rowsMax={10}
        placeholder="Leave your comment here..."
        type="text"
        onBlur={clearInput}
        onChange={changeHandler} />

      <Button
        data-testid ="button"
        className={classes.button}
        disableFocusRipple
        disabled={disabled}
        size="small"
        color="primary"
        onClick={submitFn} >

        Post
      </Button>

    </div>
  );
};

export default CommentTextArea;

CommentTextArea.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  submitFn: PropTypes.func.isRequired,
}
