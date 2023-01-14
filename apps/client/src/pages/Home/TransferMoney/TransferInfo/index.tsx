import { TextFieldsRounded } from '@mui/icons-material';
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
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncDataRenderer from '../../../../components/AsyncDataRenderer';
import { RECEIVER_LIST } from '../../../../mocks/transfer';
import { useGetContactListQuery } from '../../../../redux/slices/contactSlice';
import {
  transferApi,
  useGetExternalPaymentAccountInfoMutation,
} from '../../../../redux/slices/transferSlice';
import { Receiver } from '../../../../types';

interface TransferInfoProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function TransferInfo({ handleSubmit }: TransferInfoProps) {
  const [chooseFromList, setChooseFromList] = useState(false);
  const [payment, setPayment] = useState('');
  const [transferType, setTransferType] = useState('');
  const [bank, setBank] = useState('');
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
      data: { data: internalPaymentAccountInfo = {} } = {},
    },
  ] = transferApi.endpoints.getInternalPaymentAccountInfo.useLazyQuery();

  const [
    getExternalPaymentAccountInfo,
    {
      isLoading: externalPaymentAccountInfoLoading,
      data: { data: { data: externalPaymentAccountInfo = {} } = {} } = {},
    },
  ] = useGetExternalPaymentAccountInfoMutation();

  const handleLoadAccountName = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value.length > 0) {
      if (transferType === 'internal') {
        getInternalPaymentAccountInfo(e.target.value);
      }

      if (transferType === 'external') {
        getExternalPaymentAccountInfo({
          id: e.target.value,
          nganHang: bank,
        });
      }
    }
  };

  useEffect(() => {
    if (transferType === 'internal' && internalPaymentAccountInfo) {
      setTenTK(internalPaymentAccountInfo.hoTen);
    }

    if (transferType === 'external' && externalPaymentAccountInfo.lastName) {
      setTenTK(
        `${externalPaymentAccountInfo.lastName} ${externalPaymentAccountInfo.firstName}`
      );
    }
  }, [internalPaymentAccountInfo, externalPaymentAccountInfo, transferType]);

  const {
    isLoading: savedListLoading,
    data: { data: savedListData = [] } = {},
  } = useGetContactListQuery({});

  const savedList = useMemo(
    () => savedListData || RECEIVER_LIST,
    [savedListData]
  ) as Receiver[];

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} mt={1}>
        <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
          <InputLabel id="transfer-type-select-label">Transfer type</InputLabel>
          <Select
            required
            labelId="transfer-type-select-label"
            name="loaiChuyenKhoan"
            id="transfer-type-select"
            value={transferType}
            label="Transfer type"
            onChange={handleSelectTransferType}
          >
            <MenuItem value="internal">Internal transfer</MenuItem>
            <MenuItem value="external">External transfer</MenuItem>
          </Select>
        </FormControl>
        {transferType === 'external' && (
          <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
            <InputLabel id="bank-select-label">Bank</InputLabel>
            <Select
              required
              labelId="bank-select-label"
              name="nganHang"
              id="bank-select"
              value={bank}
              label="Bank"
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
            label="Choose from saved list"
          />
        </FormControl>
        {chooseFromList ? (
          <AsyncDataRenderer loading={savedListLoading}>
            {savedList ? (
              <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
                <InputLabel id="receiver-select-label">
                  Account number
                </InputLabel>
                <Select
                  name="soTK"
                  labelId="receiver-select-label"
                  id="receiver-select"
                  label="Account number"
                >
                  {savedList?.map((item) => (
                    <MenuItem value={`${item.tenGoiNho} - ${item.nguoiDung}`}>
                      {item.tenGoiNho} - {item.nguoiDung}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              'No receiver yet'
            )}
          </AsyncDataRenderer>
        ) : (
          <TextField
            type="number"
            required
            fullWidth
            sx={{ display: 'block' }}
            margin="normal"
            label="Account number"
            name="soTK"
            onBlur={handleLoadAccountName}
          />
        )}
        {!chooseFromList && (
          <AsyncDataRenderer
            loading={
              internalPaymentAccountInfoLoading ||
              externalPaymentAccountInfoLoading
            }
          >
            <TextField
              fullWidth
              sx={{ display: 'block' }}
              margin="normal"
              label="Account name"
              name="tenTK"
              value={tenTK}
              InputLabelProps={{
                shrink: true,
              }}
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
          label="Amount"
          name="soTien"
        />
        <TextField
          required
          fullWidth
          sx={{ display: 'block' }}
          margin="normal"
          label="Description"
          name="noiDungCK"
          multiline
          rows={4}
        />
        <FormControl sx={{ marginTop: '1rem', width: '100%' }} required>
          <InputLabel id="payment-select-label">Payment method</InputLabel>
          <Select
            name="loaiCK"
            label="Payment method"
            labelId="payment-select-label"
            id="payment-select"
            value={payment}
            onChange={handleSelectPayment}
          >
            <MenuItem value="receiver">Receiver pay fee</MenuItem>
            <MenuItem value="sender">Sender pay fee</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button type="submit">Next</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TransferInfo;
