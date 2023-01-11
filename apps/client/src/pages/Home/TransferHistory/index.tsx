import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../../components/AsyncDataRenderer';
import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import TabPanel from '../../../components/TabPanel';
import {
  REMINDER_CHECKOUT_HISTORY,
  TRANSACTION_HISTORY,
} from '../../../mocks/transfer';
import { transferApi } from '../../../redux/slices/transferSlice';
import { RootState } from '../../../redux/store';
import { ReminderCheckoutHistory, TransactionHistory } from '../../../types';
import { formatMoney } from '../../../utils';

import TransferCard, { TransferCardProps } from './TransferCard';

const texts = {
  transfer: 'Chuyển tiền đến',
  debt: 'Thanh toán nhắc nợ',
  receive: 'Nhận tiền từ',
};

function TransferHistory() {
  const userInfo = useSelector((state: RootState) => state.auth.user);

  const [
    getTransactionHistory,
    { isLoading: transactionHistoryLoading, data: transactionHistoryData },
  ] = transferApi.endpoints.getTransactionHistory.useLazyQuery();

  const [
    getReminderCheckoutHistory,
    {
      isLoading: reminderCheckoutHistoryLoading,
      data: reminderCheckoutHistoryData,
    },
  ] = transferApi.endpoints.getReminderCheckoutHistory.useLazyQuery();

  const mappedTranferHistory = useMemo(() => {
    return (
      (transactionHistoryData?.lichSuGiaoDich as TransactionHistory[]) ||
      TRANSACTION_HISTORY.lichSuGiaoDich
    )
      .filter((item) => item.loai === 'transfer')
      .map((item: TransactionHistory) => ({
        type: item.loai,
        title: texts[item.loai].concat(
          ` ${item.tenNguoiNhan} - ${item.nguoiNhan}`
        ),
        description: item.noiDungCK,
        amount: `-${formatMoney(item.soTien)} VND`,
        dateTime: item.ngayCK,
      })) as TransferCardProps[];
  }, [transactionHistoryData]);

  const mappedReceiveHistory = useMemo(() => {
    return (
      (transactionHistoryData?.lichSuGiaoDich as TransactionHistory[]) ||
      TRANSACTION_HISTORY.lichSuGiaoDich
    )
      .filter((item) => item.loai === 'receive')
      .map((item: TransactionHistory) => ({
        type: item.loai,
        title: texts[item.loai].concat(
          ` ${item.tenNguoiGui} - ${item.nguoiGui}`
        ),
        description: item.noiDungCK,
        amount: `+${formatMoney(item.soTien)} VND`,
        dateTime: item.ngayCK,
      })) as TransferCardProps[];
  }, [transactionHistoryData]);

  const mappedReminderCheckoutHistory = useMemo(() => {
    return (
      (reminderCheckoutHistoryData?.lichSuGiaoDich as ReminderCheckoutHistory[]) ||
      REMINDER_CHECKOUT_HISTORY.lichSuGiaoDich
    ).map((item: ReminderCheckoutHistory) => ({
      type: 'debt',
      title:
        item.nguoiGui === userInfo.soTK
          ? texts.debt.concat(` cho ${item.tenNguoiNhan} - ${item.nguoiNhan}`)
          : texts.debt.concat(` từ ${item.tenNguoiGui} - ${item.nguoiGui}`),
      description: item.noiDungCK,
      amount:
        item.nguoiGui === userInfo.soTK
          ? `-${formatMoney(item.soTien)} VND`
          : `+${formatMoney(item.soTien)} VND`,
      dateTime: item.ngayCK,
    })) as TransferCardProps[];
  }, [transactionHistoryData]);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        getTransactionHistory({});
        break;

      case 1:
        getTransactionHistory({});
        break;

      case 2:
        getReminderCheckoutHistory({});
        break;

      default:
        break;
    }

    setValue(newValue);
  };

  useEffect(() => {
    getTransactionHistory({});
  }, []);

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Lịch sử giao dịch</Typography>
        </StyledBreadCrumbs>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Chuyển tiền" />
            <Tab label="Nhận tiền" />
            <Tab label="Thanh toán nhắc nợ" />
          </Tabs>
        </AppBar>
        <Box>
          <AsyncDataRenderer loading={transactionHistoryLoading}>
            <TabPanel value={value} index={0}>
              {mappedTranferHistory.map((transaction) => (
                <TransferCard
                  type={transaction.type}
                  title={transaction.title}
                  description={transaction.description}
                  amount={transaction.amount}
                  dateTime={transaction.dateTime}
                />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {mappedReceiveHistory.map((transaction) => (
                <TransferCard
                  type={transaction.type}
                  title={transaction.title}
                  description={transaction.description}
                  amount={transaction.amount}
                  dateTime={transaction.dateTime}
                />
              ))}
            </TabPanel>
          </AsyncDataRenderer>
          <AsyncDataRenderer loading={reminderCheckoutHistoryLoading}>
            <TabPanel value={value} index={2}>
              {mappedReminderCheckoutHistory.map((transaction) => (
                <TransferCard
                  type={transaction.type}
                  title={transaction.title}
                  description={transaction.description}
                  amount={transaction.amount}
                  dateTime={transaction.dateTime}
                />
              ))}
            </TabPanel>
          </AsyncDataRenderer>
        </Box>
      </StyledContentWrapper>
    </Layout>
  );
}

export default TransferHistory;
