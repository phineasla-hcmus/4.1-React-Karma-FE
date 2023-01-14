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
  const { nguoiNhan, tenTK, soTien, noiDung, loaiCK } = useSelector(
    (state: RootState) => state.transfer.transferInfo
  );

  return (
    <Box>
      <Alert severity="success">Transaction completed!</Alert>
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
            <StyledTitle>To</StyledTitle>
            <StyledContentBox>
              <Typography>
                {tenTK} - {nguoiNhan}
              </Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Description</StyledTitle>
            <StyledContentBox>
              <Typography>{noiDung}</Typography>
            </StyledContentBox>
          </StyledRow>
          <StyledDivider />
          <StyledRow>
            <StyledTitle>Payment method</StyledTitle>
            <StyledContentBox>
              <Typography>
                {loaiCK === 'sender' ? 'Sender' : 'Receiver'} pay fee
              </Typography>
            </StyledContentBox>
          </StyledRow>
        </Box>
      </Card>
    </Box>
  );
}
