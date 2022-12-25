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
      <DialogTitle id="otp-dialog-title">Xác nhận OTP</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: '100%' }}
          name="otp"
          placeholder="Nhập mã OTP..."
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
          Chúng tôi đã gửi mã OTP đến email của bạn
        </Typography>
        <Button color="primary" variant="outlined" onClick={onClickCancel}>
          Gửi lại
        </Button>
      </Box>

      <DialogActions sx={{ padding: '0.75rem 1.5rem' }}>
        <Button color="error" variant="contained" onClick={onClickCancel}>
          Hủy
        </Button>
        <Button color="primary" variant="contained" onClick={onClickConfirm}>
          Gửi
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default OTPModal;
