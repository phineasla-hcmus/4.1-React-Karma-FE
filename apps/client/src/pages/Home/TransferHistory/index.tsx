import { Typography } from '@mui/material';
import React from 'react';

import Layout from '../../../components/Layout';
import { StyledContentWrapper } from '../../../components/styles';

import TransferCard from './TransferCard';

function TransferHistory() {
  return (
    <Layout>
      <StyledContentWrapper>
        <Typography mb={2} variant="h5">
          Lịch sử giao dịch
        </Typography>
        <TransferCard
          type="transfer"
          description="Chuyển tiền đến Bảo Khuyên"
          amount={100000}
          dateTime="12:17 18/12/2022"
        />
        <TransferCard
          type="debt"
          description="Thanh toán nhắc nợ cho Thảo Châu"
          amount={200000}
          dateTime="12:17 18/12/2022"
        />
        <TransferCard
          type="receive"
          description="Nhận tiền từ Hồng Phúc"
          amount={200000}
          dateTime="12:17 18/12/2022"
        />
      </StyledContentWrapper>
    </Layout>
  );
}

export default TransferHistory;
