import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';


export default function AlertDialog({ titleText,
                                      caption,
                                      handleClose,
                                      confirmHandler,
                                      isOpen,
                                      disabledButton }) {
  return (
    <div>
      <Dialog
        data-testid="wrapper"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle data-testid="dialogTitle"
                     id="alert-dialog-title">
          {titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            data-testid="dialogText"
            id="alert-dialog-description">
            {caption}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-testid="cancelButton" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button data-testid="confirmButton" disabled={disabledButton} onClick={confirmHandler} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  titleText: PropTypes.string,
  caption: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  confirmHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  disabledButton: PropTypes.bool,
}

AlertDialog.defaultProps = {
  titleText: '',
  caption: '',
  isOpen: false,
  disabledButton: false
}
