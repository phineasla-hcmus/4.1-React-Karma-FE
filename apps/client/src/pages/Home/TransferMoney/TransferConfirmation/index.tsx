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
  activeStep: number;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TransferConfirmation({
  activeStep,
  handleSubmit,
}: TransferConfirmationProps) {
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
            <StyledTitle>Đến</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {tenTK} - {nguoiNhan}
            </Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Số tiền</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {formatMoney(soTien)} VND
            </Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Mô tả</StyledTitle>
            <Typography sx={{ width: '100%' }}>{noiDung}</Typography>
          </StyledRow>
          <StyledRow>
            <StyledTitle>Hình thức thanh toán</StyledTitle>
            <Typography sx={{ width: '100%' }}>
              {loaiCK === 'sender' ? 'Người gửi trả' : 'Người nhận trả'}
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
              label="Lưu lại thông tin người nhận"
            />
          </FormControl>
          {saveReceiverInfo && (
            <TextField
              fullWidth
              sx={{ display: 'block' }}
              margin="normal"
              label="Tên gợi nhớ"
              name="tenGoiNho"
            />
          )}
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => {
              console.log('TODO Back');
            }}
            sx={{ mr: 1 }}
          >
            Quay lại
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button type="submit">Tiếp tục</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TransferConfirmation;
