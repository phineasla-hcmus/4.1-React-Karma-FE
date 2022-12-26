import { Avatar, Box, Card, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { formatMoney } from '../../../../utils';

interface TransferCardProps {
  type: 'transfer' | 'receive' | 'debt';
  description: string;
  dateTime: string;
  amount: number;
}

function TransferCard({
  type,
  description,
  dateTime,
  amount,
}: TransferCardProps) {
  const mapTransferTypeToIcon = useCallback(() => {
    if (type === 'debt') {
      return '/img/debt.png';
    }

    if (type === 'transfer') {
      return '/img/transfer_money.png';
    }

    return '/img/receive_money.png';
  }, [type]);

  return (
    <Card
      sx={{
        padding: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Avatar src={mapTransferTypeToIcon()} />
      <Box ml={3}>
        <Typography sx={{ fontSize: '0.8rem', color: '#9b9a9a' }}>
          {dateTime}
        </Typography>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {description}
        </Typography>
        <Typography>
          {type === 'debt' ? '-' : '+'}
          {formatMoney(amount)}
        </Typography>
      </Box>
    </Card>
  );
}

export default TransferCard;
