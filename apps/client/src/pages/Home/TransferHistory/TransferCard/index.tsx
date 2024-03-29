/* eslint-disable react/require-default-props */
import { Avatar, Box, Card, Chip, Typography } from '@mui/material';
import React, { useCallback } from 'react';

export interface TransferCardProps {
  maNganHang?: number;
  type: 'transfer' | 'receive' | 'debt';
  title: string;
  description: string;
  dateTime: string;
  amount: string;
}

function TransferCard({
  maNganHang,
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
        {maNganHang && (
          <Chip
            sx={{ marginBottom: '0.5rem' }}
            label="External"
            color="primary"
          />
        )}
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
            color: amount.includes('+') ? '#008000' : 'red',
          }}
        >
          {amount}
        </Typography>
      </Box>
    </Card>
  );
}

export default TransferCard;
