import { Typography } from '@mui/material';
import React, { useMemo } from 'react';

import TabPanel from '../../../../components/TabPanel';
import { Reminder } from '../../../../types';
import DebtTable from '../DebtTable';

import { StyledCard } from './styles';

interface DebtTabProps {
  data: Reminder[];
  value: number;
  index: number;
  created: boolean;
}

export default function DebtTab({ data, value, index, created }: DebtTabProps) {
  const { pendingList, completedList } = useMemo(() => {
    return {
      pendingList: data.filter((item) => item.trangThai === 'pending'),
      completedList: data.filter((item) => item.trangThai === 'completed'),
    };
  }, [data]);

  return (
    <>
      <TabPanel value={value} index={index}>
        <StyledCard>
          <Typography>Cần xử lý</Typography>
          <DebtTable created={created} data={pendingList} />
        </StyledCard>
        <StyledCard>
          <Typography>Đã thanh toán</Typography>
          <DebtTable created={created} completed data={completedList} />
        </StyledCard>
      </TabPanel>
    </>
  );
}
