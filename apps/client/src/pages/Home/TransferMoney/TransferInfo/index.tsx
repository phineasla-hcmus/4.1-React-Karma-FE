import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';

// TODO: Get receiver list from external bank

interface TransferInfoProps {
  activeStep: number;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TransferInfo({ activeStep, handleSubmit }: TransferInfoProps) {
  const [chooseFromList, setChooseFromList] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [payment, setPayment] = useState('');
  const [transferType, setTransferType] = useState('');
  const [bank, setBank] = useState('');

  const handleSelectChooseFromList = (event: ChangeEvent<HTMLInputElement>) => {
    setChooseFromList(event.target.checked);
  };

  const handleSelectReceiver = (event: SelectChangeEvent) => {
    setReceiver(event.target.value as string);
  };

  const handleSelectPayment = (event: SelectChangeEvent) => {
    setPayment(event.target.value as string);
  };

  const handleSelectTransferType = (event: SelectChangeEvent) => {
    setTransferType(event.target.value as string);
  };

  const handleSelectBank = (event: SelectChangeEvent) => {
    setBank(event.target.value as string);
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} mt={1}>
        <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
          <InputLabel id="transfer-type-select-label">
            Loại chuyển khoản
          </InputLabel>
          <Select
            required
            labelId="transfer-type-select-label"
            name="loaiChuyenKhoan"
            id="transfer-type-select"
            value={transferType}
            label="Loại chuyển khoản"
            onChange={handleSelectTransferType}
          >
            <MenuItem value="internal">Chuyển khoản nội bộ</MenuItem>
            <MenuItem value="external">Chuyển khoản liên ngân hàng</MenuItem>
          </Select>
        </FormControl>
        {transferType === 'external' && (
          <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
            <InputLabel id="bank-select-label">Ngân hàng</InputLabel>
            <Select
              required
              labelId="bank-select-label"
              name="nganHang"
              id="bank-select"
              value={bank}
              label="Ngân hàng"
              onChange={handleSelectBank}
            >
              <MenuItem value="HCMUSBank">HCMUS Bank</MenuItem>
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ display: 'block' }}>
          <FormControlLabel
            control={
              <Switch
                checked={chooseFromList}
                onChange={handleSelectChooseFromList}
              />
            }
            label="Chọn từ danh sách đã lưu"
          />
        </FormControl>
        {chooseFromList ? (
          <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
            <InputLabel id="receiver-select-label">Số tài khoản</InputLabel>
            <Select
              name="soTK"
              labelId="receiver-select-label"
              id="receiver-select"
              value={receiver}
              label="Số tài khoản"
              onChange={handleSelectReceiver}
            >
              <MenuItem value="123456789">123456789</MenuItem>
              <MenuItem value="123456789">123456789</MenuItem>
              <MenuItem value="123456789">123456789</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <TextField
            type="number"
            required
            fullWidth
            sx={{ display: 'block' }}
            margin="normal"
            label="Số tài khoản"
            name="soTK"
          />
        )}
        <TextField
          required
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          type="number"
          label="Số tiền"
          name="soTien"
        />
        <TextField
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          label="Mô tả"
          name="noiDungCK"
          multiline
          rows={4}
        />
        <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
          <InputLabel id="payment-select-label">
            Hình thức thanh toán
          </InputLabel>
          <Select
            name="loaiCK"
            label="Hình thức thanh toán"
            labelId="payment-select-label"
            id="payment-select"
            value={payment}
            onChange={handleSelectPayment}
          >
            <MenuItem value="receiver">Người nhận trả</MenuItem>
            <MenuItem value="sender">Người gửi trả</MenuItem>
          </Select>
        </FormControl>
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

export default TransferInfo;
