import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';

import TransferCard from './TransferCard';

function TransferHistory() {
  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Lịch sử giao dịch</Typography>
        </StyledBreadCrumbs>
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