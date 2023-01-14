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
import { formatDateTime, formatMoney } from '../../../utils';

import TransferCard, { TransferCardProps } from './TransferCard';

const texts = {
  transfer: 'Transfer money to',
  debt: 'Pay debt',
  receive: 'Receive money from',
};

function TransferHistory() {
  const soTK = localStorage.getItem('SOTK');

  const [
    getTransactionHistory,
    {
      isLoading: transactionHistoryLoading,
      data: { data: transactionHistoryData = [] } = {},
    },
  ] = transferApi.endpoints.getTransactionHistory.useLazyQuery();

  const [
    getReminderCheckoutHistory,
    {
      isLoading: reminderCheckoutHistoryLoading,
      data: { data: reminderCheckoutHistoryData = [] } = {},
    },
  ] = transferApi.endpoints.getReminderCheckoutHistory.useLazyQuery();

  const mappedTranferHistory = useMemo(() => {
    return (
      (transactionHistoryData as TransactionHistory[]) || TRANSACTION_HISTORY
    )
      .filter((item) => item.loai === 0)
      .map((item: TransactionHistory) => ({
        maNganHang: item.maNganHang,
        type: 'transfer',
        title: texts.transfer.concat(` ${item.nguoiNhan}`),
        description: item.noiDungCK,
        amount: `-${formatMoney(item.soTien)} VND`,
        dateTime: formatDateTime(new Date(item.ngayCK)),
      })) as TransferCardProps[];
  }, [transactionHistoryData]);

  const mappedReceiveHistory = useMemo(() => {
    return (
      (transactionHistoryData as TransactionHistory[]) || TRANSACTION_HISTORY
    )
      .filter((item) => item.loai === 1)
      .map((item: TransactionHistory) => ({
        maNganHang: item.maNganHang,
        type: 'receive',
        title: texts.receive.concat(` ${item.nguoiChuyen}`),
        description: item.noiDungCK,
        amount: `+${formatMoney(item.soTien)} VND`,
        dateTime: formatDateTime(new Date(item.ngayCK)),
      })) as TransferCardProps[];
  }, [transactionHistoryData]);

  const mappedReminderCheckoutHistory = useMemo(() => {
    return (
      (reminderCheckoutHistoryData as ReminderCheckoutHistory[]) ||
      REMINDER_CHECKOUT_HISTORY
    ).map((item: ReminderCheckoutHistory) => ({
      type: 'debt',
      title:
        item.nguoiChuyen === soTK
          ? texts.debt.concat(` to ${item.nguoiNhan}`)
          : texts.debt.concat(` from ${item.nguoiChuyen}`),
      description: item.noiDungCK,
      amount:
        item.nguoiChuyen === soTK
          ? `-${formatMoney(item.soTien)} VND`
          : `+${formatMoney(item.soTien)} VND`,
      dateTime: formatDateTime(new Date(item.ngayCK)),
    })) as TransferCardProps[];
  }, [reminderCheckoutHistoryData, soTK]);

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
  }, [getTransactionHistory]);

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Typography color="text.primary">Transaction history</Typography>
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
            <Tab label="Transfer money" />
            <Tab label="Receive money" />
            <Tab label="Pay debt" />
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
                  maNganHang={transaction.maNganHang}
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
                  maNganHang={transaction.maNganHang}
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
