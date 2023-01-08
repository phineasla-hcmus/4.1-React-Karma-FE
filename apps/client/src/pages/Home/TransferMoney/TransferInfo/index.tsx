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
import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';

import AsyncDataRenderer from '../../../../components/AsyncDataRenderer';
import { RECEIVER_LIST } from '../../../../mocks/transfer';
import { useGetSavedListQuery } from '../../../../redux/slices/savedListSlice';
import { transferApi } from '../../../../redux/slices/transferSlice';
import { Receiver } from '../../../../types';

interface TransferInfoProps {
  activeStep: number;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TransferInfo({ activeStep, handleSubmit }: TransferInfoProps) {
  const [chooseFromList, setChooseFromList] = useState(false);
  const [payment, setPayment] = useState('');
  const [transferType, setTransferType] = useState('');
  const [bank, setBank] = useState('');
  const [soTK, setSoTK] = useState('');
  const [tenTK, setTenTK] = useState('');

  const handleSelectChooseFromList = (event: ChangeEvent<HTMLInputElement>) => {
    setChooseFromList(event.target.checked);
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

  const [
    getInternalPaymentAccountInfo,
    {
      isLoading: internalPaymentAccountInfoLoading,
      data: internalPaymentAccountInfo,
    },
  ] = transferApi.endpoints.getInternalPaymentAccountInfo.useLazyQuery();

  const handleLoadAccountName = async () => {
    await getInternalPaymentAccountInfo(soTK);
    setTenTK(internalPaymentAccountInfo?.hoTen || 'Hồ Lâm Bảo Khuyên');
  };

  const { isLoading: savedListLoading, data: savedListData } =
    useGetSavedListQuery({});

  const savedList = useMemo(
    () => savedListData || RECEIVER_LIST,
    [savedListData]
  ) as Receiver[];

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
          <AsyncDataRenderer loading={savedListLoading}>
            <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
              <InputLabel id="receiver-select-label">Số tài khoản</InputLabel>
              <Select
                name="soTK"
                labelId="receiver-select-label"
                id="receiver-select"
                label="Số tài khoản"
              >
                {savedList?.map((item) => (
                  <MenuItem value={`${item.tenGoiNho} - ${item.nguoiDung}`}>
                    {item.tenGoiNho} - {item.nguoiDung}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AsyncDataRenderer>
        ) : (
          <TextField
            type="number"
            required
            fullWidth
            sx={{ display: 'block' }}
            margin="normal"
            label="Số tài khoản"
            name="soTK"
            onChange={(event) => {
              setSoTK(event.target.value);
            }}
            onBlur={handleLoadAccountName}
          />
        )}
        {!chooseFromList && (
          <AsyncDataRenderer loading={internalPaymentAccountInfoLoading}>
            <TextField
              fullWidth
              sx={{ display: 'block' }}
              margin="normal"
              label="Tên chủ tài khoản"
              name="tenTK"
              value={tenTK}
              InputProps={{ readOnly: true }}
            />
          </AsyncDataRenderer>
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
