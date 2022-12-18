import { Card, Typography } from '@mui/material';
import React from 'react';

import { StyledRow, StyledTitle } from './styles';

function TransferConfirmation() {
  return (
    <Card sx={{ padding: '1rem' }}>
      <StyledRow>
        <StyledTitle
          sx={{ width: '50%', marginRight: '2rem', textAlign: 'right' }}
        >
          Đến
        </StyledTitle>
        <Typography sx={{ width: '100%' }}>123456789</Typography>
      </StyledRow>
      <StyledRow>
        <StyledTitle
          sx={{ width: '50%', marginRight: '2rem', textAlign: 'right' }}
        >
          Tên chủ tài khoản
        </StyledTitle>
        <Typography sx={{ width: '100%' }}>HO LAM BAO KHUYEN</Typography>
      </StyledRow>
      <StyledRow>
        <StyledTitle
          sx={{ width: '50%', marginRight: '2rem', textAlign: 'right' }}
        >
          Số tiền
        </StyledTitle>
        <Typography sx={{ width: '100%' }}>100000</Typography>
      </StyledRow>
      <StyledRow>
        <StyledTitle
          sx={{ width: '50%', marginRight: '2rem', textAlign: 'right' }}
        >
          Mô tả
        </StyledTitle>
        <Typography sx={{ width: '100%' }}>Chuyển tiền nè</Typography>
      </StyledRow>
    </Card>
  );
}

export default TransferConfirmation;
