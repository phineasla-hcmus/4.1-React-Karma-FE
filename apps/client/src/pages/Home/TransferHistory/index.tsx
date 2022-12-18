import { Box } from '@mui/material';
import React from 'react';

import TransferCard from './TransferCard';

function TransferHistory() {
  return (
    <Box mt={3}>
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
    </Box>
  );
}

export default TransferHistory;
