import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { formatMoney } from '../../../../utils';

import { StyledRow, StyledTitle } from './styles';

interface TransferConfirmationProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TransferConfirmation({ handleSubmit }: TransferConfirmationProps) {
  const [saveReceiverInfo, setSaveReceiverInfo] = useState(false);

  const handleSelectSaveReceiverInfo = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSaveReceiverInfo(event.target.checked);
  };

  const { nguoiNhan, tenTK, soTien, noiDung, loaiCK } = useSelector(
    (state: RootState) => state.transfer.transferInfo
  );

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit}>
        <Card sx={{ padding: '1rem' }}>
          <StyledRow>
            <StyledTitle>To</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {tenTK} - {nguoiNhan}
            </Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Amount</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {formatMoney(soTien)} VND
            </Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Description</StyledTitle>
            <Typography sx={{ width: '100%' }}>{noiDung}</Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Payment method</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {loaiCK === 'sender' ? 'Sender pay fee' : 'Receiver pay fee'}
            </Typography>
          </StyledRow>
          <FormControl sx={{ display: 'block' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={saveReceiverInfo}
                  onChange={handleSelectSaveReceiverInfo}
                />
              }
              label="Save receiver info"
            />
          </FormControl>
          {saveReceiverInfo && (
            <TextField
              fullWidth
              sx={{ display: 'block' }}
              margin="normal"
              label="Nickname"
              name="tenGoiNho"
            />
          )}
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button type="submit">Tiếp tục</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TransferConfirmation;
