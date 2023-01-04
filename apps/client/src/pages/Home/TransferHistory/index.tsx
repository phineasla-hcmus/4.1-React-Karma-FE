import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../../components/AsyncDataRenderer';
import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import { TRANSACTION_HISTORY } from '../../../mocks/transfer';
import { useGetTransactionHistoryQuery } from '../../../redux/slices/transferSlice';
import { RootState } from '../../../redux/store';
import { TransactionHistory } from '../../../types';

import TransferCard, { TransferCardProps } from './TransferCard';

const texts = {
  transfer: 'Chuyển tiền đến',
  debt: 'Thanh toán nhắc nợ cho',
  receive: 'Nhận tiền từ',
};

function TransferHistory() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { isLoading, data } = useGetTransactionHistoryQuery(userInfo.soTK);

  const mappedTransactionHistory = useMemo(() => {
    return (data?.lichSuGiaoDich || TRANSACTION_HISTORY.lichSuGiaoDich).map(
      (item: TransactionHistory) => ({
        type: item.loaiCK,
        title: texts[item.loaiCK].concat(
          ` ${item.loaiCK === 'receive' ? item.nguoiGui : item.nguoiNhan}`
        ),
        description: item.noiDungCK,
        amount: item.soTien,
        dateTime: item.ngayCK,
      })
    ) as TransferCardProps[];
  }, [data]);

  return (
    <Layout>
      <StyledContentWrapper>
        <AsyncDataRenderer loading={isLoading}>
          <StyledBreadCrumbs aria-label="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <Typography color="text.primary">Lịch sử giao dịch</Typography>
          </StyledBreadCrumbs>
          {mappedTransactionHistory.map((transaction) => (
            <TransferCard
              type={transaction.type}
              title={transaction.title}
              description={transaction.description}
              amount={transaction.amount}
              dateTime={transaction.dateTime}
            />
          ))}
        </AsyncDataRenderer>
      </StyledContentWrapper>
    </Layout>
  );
}

export default TransferHistory;
