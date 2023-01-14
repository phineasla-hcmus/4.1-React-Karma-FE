import React from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { StyledDialog } from './styles';

interface OTPModalProps {
  open: boolean;
  onClose: any;
  onClickCancel: any;
  onClickConfirm: any;
  handleChangeOTP: any;
}

function OTPModal({
  open,
  onClose,
  onClickCancel,
  onClickConfirm,
  handleChangeOTP,
}: OTPModalProps) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="otp-dialog-title"
    >
      <DialogTitle id="otp-dialog-title">OTP confirmation</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: '100%' }}
          name="otp"
          placeholder="Enter OTP..."
          onChange={handleChangeOTP}
        />
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1.5rem',
        }}
      >
        <Typography sx={{ textAlign: 'left' }} variant="caption">
          We have sent OTP code to your email
        </Typography>
      </Box>

      <DialogActions sx={{ padding: '0.75rem 1.5rem' }}>
        <Button color="error" variant="contained" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onClickConfirm}>
          Send
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default OTPModal;
