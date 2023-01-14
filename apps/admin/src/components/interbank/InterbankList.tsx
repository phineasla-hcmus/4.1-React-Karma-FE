/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react';
import { useMediaQuery, Stack, Box, Typography } from '@mui/material';
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  FunctionField,
  DateInput,
  SelectInput,
  ReferenceInput,
  useRecordContext,
  useGetList,
  useGetMany,
} from 'react-admin';

import { formatDateTime, formatNumber } from '../../utils/helpers';

const bankerFilters = [
  <DateInput source="from" label="Start Date" />,
  <DateInput source="to" label="End Date" />,
  <ReferenceInput source="bankID" reference="banks" label="Bank">
    <SelectInput label="Bank" />
  </ReferenceInput>,
];

export function InterbankList() {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [soTienGui, setSoTienGui] = useState<number>(0);
  const [soTienNhan, setSoTienNhan] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tempSoTienGui = localStorage.getItem('soTienGui');
      const tempSoTienNhan = localStorage.getItem('soTienNhan');

      if (tempSoTienGui && +tempSoTienGui !== soTienGui) {
        setSoTienGui(+tempSoTienGui);
      }
      if (tempSoTienNhan && +tempSoTienNhan !== soTienNhan) {
        setSoTienNhan(+tempSoTienNhan);
      }
    }, 1000);

    return () => clearInterval(intervalId); // This is important
  }, [soTienGui, soTienNhan]);

  return (
    <>
      <List filters={bankerFilters} exporter={false}>
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.name}
            secondaryText={(record) => record.username}
            tertiaryText={(record) => record.email}
          />
        ) : (
          <Datagrid
            bulkActionButtons={false}
            sx={{
              '.MuiTableCell-head': {
                background: '#e6e0f3',
                fontWeight: 700,
              },
            }}
          >
            <TextField source="id" label="ID" sortable={false} />
            <TextField
              source="tkTrong"
              label="External Account"
              sortable={false}
            />
            <TextField
              source="tkNgoai"
              label="External Account"
              sortable={false}
            />
            <TextField
              source="nganHangLK.tenNH"
              label="External Bank"
              sortable={false}
            />
            <FunctionField
              sortable={false}
              source="soTien"
              label="Amount"
              render={(record: any) =>
                record.soTien > 0
                  ? `+${formatNumber(record.soTien)} VND`
                  : `${formatNumber(record.soTien)} VND`
              }
            />
            <FunctionField
              sortable={false}
              source="thoiGian"
              label="Transaction time"
              render={(record: any) => `${formatDateTime(record.thoiGian)}`}
            />
          </Datagrid>
        )}
      </List>
      <Stack
        direction="row"
        spacing={5}
        style={{ width: '50vw', margin: '1em' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tổng tiền gửi: {formatNumber(soTienGui)} VND
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tổng tiền nhận: {formatNumber(soTienNhan)} VND
        </Typography>
      </Stack>
    </>
  );
}
