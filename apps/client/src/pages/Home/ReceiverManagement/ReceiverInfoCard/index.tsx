import { Avatar, Box, Card, IconButton, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ReceiverInfoCardProps {
  name: string;
  accountNumber: string;
  onClickDelete: any;
  onClickEdit: any;
}

export default function ReceiverInfoCard({
  name,
  accountNumber,
  onClickDelete,
  onClickEdit,
}: ReceiverInfoCardProps) {
  return (
    <Card
      sx={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar />
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h6">{name}</Typography>
          <Typography>{accountNumber}</Typography>
        </Box>
      </Box>
      <Box>
        <IconButton aria-label="edit" onClick={onClickEdit}>
          <EditIcon fontSize="medium" />
        </IconButton>
        <IconButton aria-label="edit" onClick={onClickDelete}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Card>
  );
}
