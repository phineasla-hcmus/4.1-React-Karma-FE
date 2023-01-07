import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  FunctionField,
  useRecordContext,
} from 'react-admin';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Stack,
} from '@mui/material';

import { formatAccountNumber, formatNumber } from '../../utils/helpers';

function Aside() {
  const record = useRecordContext();
  if (record)
    return (
      <Stack
        direction="row"
        spacing={5}
        style={{ width: '50vw', margin: '1em' }}
      >
        <Card
          sx={{
            width: 300,
            height: 160,
            position: 'relative',
            backgroundImage: `url("/img/ATM.png")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: 5,
          }}
        >
          <CardContent
            sx={{
              margin: 'auto',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                marginTop: 1.5,
                fontWeight: 600,
              }}
            >
              {formatAccountNumber(record.taiKhoanThanhToan.soTK)}
            </Typography>
            <Typography
              sx={{
                fontSize: '17px',
                color: '#fff',
                marginTop: 1.5,
                fontWeight: 500,
              }}
            >
              {record.khachHang.hoTen}
            </Typography>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Detail Information
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'blue' }}>
            <b>Money:</b> {formatNumber(record.taiKhoanThanhToan.soDu)} VND
          </Typography>
          <Typography variant="subtitle1">
            <b>Fullname:</b> {record.khachHang.hoTen}
          </Typography>
          <Typography variant="subtitle1">
            <b>Email:</b> {record.khachHang.email}
          </Typography>
          <Typography variant="subtitle1">
            <b>Phone:</b> {record.khachHang.sdt}
          </Typography>
        </Box>
      </Stack>
    );
  return null;
}

export function UserEdit() {
  return (
    <Edit aside={<Aside />}>
      <SimpleForm>
        <Typography variant="h5" mb={3}>
          Recharge
        </Typography>
        <TextInput
          source="Amount recharge"
          type="number"
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
}
