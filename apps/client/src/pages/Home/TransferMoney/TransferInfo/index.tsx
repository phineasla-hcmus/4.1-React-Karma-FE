import {
  Box,
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

function TransferInfo() {
  const [chooseFromList, setChooseFromList] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [payment, setPayment] = useState('');
  const [transferType, setTransferType] = useState('');
  const [bank, setBank] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('data', data);
  };

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
      <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
        <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
          <InputLabel id="transfer-type-select-label">
            Loại chuyển khoản
          </InputLabel>
          <Select
            labelId="transfer-type-select-label"
            id="transfer-type-select"
            value={transferType}
            label="Loại chuyển khoản"
            onChange={handleSelectTransferType}
          >
            <MenuItem value="Chuyển khoản nội bộ">Chuyển khoản nội bộ</MenuItem>
            <MenuItem value="Chuyển khoản liên ngân hàng">
              Chuyển khoản liên ngân hàng
            </MenuItem>
          </Select>
        </FormControl>
        {transferType === 'Chuyển khoản liên ngân hàng' && (
          <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
            <InputLabel id="bank-select-label">Ngân hàng</InputLabel>
            <Select
              labelId="bank-select-label"
              id="bank-select"
              value={bank}
              label="Ngân hàng"
              onChange={handleSelectBank}
            >
              <MenuItem value="Vietcombank">Vietcombank</MenuItem>
              <MenuItem value="Agribank">Agribank</MenuItem>
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
          <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
            <InputLabel id="receiver-select-label">Người nhận</InputLabel>
            <Select
              labelId="receiver-select-label"
              id="receiver-select"
              value={receiver}
              label="Người nhận"
              onChange={handleSelectReceiver}
            >
              <MenuItem value="123456789">123456789</MenuItem>
              <MenuItem value="123456789">123456789</MenuItem>
              <MenuItem value="123456789">123456789</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            sx={{ display: 'block' }}
            margin="normal"
            label="Số tài khoản"
            name="accountId"
          />
        )}
        <TextField
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          label="Tên chủ tài khoản"
          name="accountName"
          value="Hồ Lâm Bảo Khuyên"
          InputProps={{ readOnly: true }}
        />
        <TextField
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          type="number"
          label="Số tiền"
          name="amount"
        />
        <TextField
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          label="Mô tả"
          name="description"
          multiline
          rows={4}
        />
        <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
          <InputLabel id="payment-select-label">
            Hình thức thanh toán
          </InputLabel>
          <Select
            label="Hình thức thanh toán"
            labelId="payment-select-label"
            id="payment-select"
            value={payment}
            onChange={handleSelectPayment}
          >
            <MenuItem value="Người nhận trả">Người nhận trả</MenuItem>
            <MenuItem value="Người gửi trả">Người gửi trả</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default TransferInfo;
