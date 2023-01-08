import { Alert, Box, Card, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { formatDateTime, formatMoney } from '../../../../utils';

import {
  StyledContentBox,
  StyledDivider,
  StyledRow,
  StyledTitle,
} from './styles';

export default function TransferReceipt() {
  const { soTK, tenTK, soTien, noiDung, loaiCK } = useSelector(
    (state: RootState) => state.transfer.transferInfo
  );

  return (
    <Box>
      <Alert severity="success">Giao dịch thành công</Alert>
      <Card sx={{ padding: '1rem', marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="caption">{formatDateTime(new Date())}</Typography>
        <Typography variant="h5">-{formatMoney(soTien)} VND</Typography>
        <Box
          sx={{
            borderRadius: '0.5rem',
            width: '70rem',
            margin: '2rem auto',
          }}
        >
          <StyledRow>
            <StyledTitle>Đến</StyledTitle>
            <StyledContentBox>
              <Typography>
                {tenTK} - {soTK}
              </Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Mô tả</StyledTitle>
            <StyledContentBox>
              <Typography>{noiDung}</Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Hình thức thanh toán</StyledTitle>
            <StyledContentBox>
              <Typography>
                {loaiCK === 'sender' ? 'Người nhận' : 'Người gửi'} trả phí
              </Typography>
            </StyledContentBox>
          </StyledRow>
        </Box>
      </Card>
    </Box>
  );
}
