import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

import { formatMoney } from '../../../../utils';

import { StyledRow, StyledTitle } from './styles';

function TransferConfirmation() {
  const [checked, setChecked] = useState(true);

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!checked) {
      setChecked(event.target.checked);
    }
  };

  return (
    <Box>
      <Card sx={{ padding: '1rem' }}>
        <StyledRow>
          <StyledTitle>Đến</StyledTitle>
          <Typography sx={{ width: '100%' }}>123456789</Typography>
        </StyledRow>
        <StyledRow>
          <StyledTitle>Tên chủ tài khoản</StyledTitle>
          <Typography sx={{ width: '100%' }}>HO LAM BAO KHUYEN</Typography>
        </StyledRow>
        <StyledRow>
          <StyledTitle>Số tiền</StyledTitle>
          <Typography sx={{ width: '100%' }}>{formatMoney(100000)}</Typography>
        </StyledRow>
        <StyledRow>
          <StyledTitle>Mô tả</StyledTitle>
          <Typography sx={{ width: '100%' }}>Chuyển tiền nè</Typography>
        </StyledRow>
      </Card>
      <FormControlLabel
        sx={{ marginTop: '0.5rem' }}
        control={<Checkbox onChange={handleChecked} />}
        label="Lưu lại thông tin người nhận"
      />
    </Box>
  );
}

export default TransferConfirmation;
