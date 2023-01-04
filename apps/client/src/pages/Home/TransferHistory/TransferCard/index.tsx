import { Avatar, Box, Card, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { formatMoney } from '../../../../utils';

export interface TransferCardProps {
  type: 'transfer' | 'receive' | 'debt';
  title: string;
  description: string;
  dateTime: string;
  amount: number;
}

function TransferCard({
  type,
  title,
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
      <Avatar variant="square" src={mapTransferTypeToIcon()} />
      <Box ml={3}>
        <Typography sx={{ fontSize: '0.8rem', color: '#9b9a9a' }}>
          {dateTime}
        </Typography>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: type === 'receive' ? '#FFD700' : 'red',
          }}
        >
          {type === 'receive' ? '+' : '-'}
          {formatMoney(amount)} VND
        </Typography>
      </Box>
    </Card>
  );
}

export default TransferCard;
