import { Alert, Box, Card, Typography } from '@mui/material';
import React from 'react';

import { formatMoney } from '../../../../utils';

import {
  StyledContentBox,
  StyledDivider,
  StyledRow,
  StyledTitle,
} from './styles';

export default function TransferReceipt() {
  return (
    <Box>
      <Alert severity="success">Giao dịch thành công</Alert>
      <Card sx={{ padding: '1rem', marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="h6">Chuyển Tiền</Typography>
        <Typography variant="caption">24/12/2022 17:56</Typography>
        <Typography variant="h5">-{formatMoney(100000)}</Typography>
        <Box
          sx={{
            borderRadius: '0.5rem',
            width: '40rem',
            margin: '2rem auto',
          }}
        >
          <StyledRow>
            <StyledTitle>Từ</StyledTitle>
            <StyledContentBox>
              <Typography>Nguyen Ngoc Thanh Tam</Typography>
              <Typography>123456780</Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Đến</StyledTitle>
            <StyledContentBox>
              <Typography>Ho Lam Bao Khuyen</Typography>
              <Typography>123456789</Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Mô tả</StyledTitle>
            <StyledContentBox>
              <Typography>Chuyển tiền nè</Typography>
            </StyledContentBox>
          </StyledRow>
        </Box>
      </Card>
    </Box>
  );
}
