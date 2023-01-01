/* eslint-disable react/require-default-props */
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import { formatMoney } from '../../../../utils';

interface ReceivedColumn {
  id:
    | 'soTaiKhoan'
    | 'tenNguoiGui'
    | 'thoiGian'
    | 'soTien'
    | 'noiDung'
    | 'nutThanhToan'
    | 'nutHuy';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

interface CreatedColumn {
  id:
    | 'soTaiKhoan'
    | 'tenNguoiNhan'
    | 'thoiGian'
    | 'soTien'
    | 'noiDung'
    | 'nutThanhToan'
    | 'nutHuy';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const receivedColumns: readonly ReceivedColumn[] = [
  { id: 'soTaiKhoan', label: 'Số tài khoản' },
  {
    id: 'tenNguoiGui',
    label: 'Người gửi',
    minWidth: 200,
  },
  { id: 'thoiGian', label: 'Thời gian', minWidth: 150 },
  {
    id: 'soTien',
    label: 'Số tiền',
    minWidth: 120,
  },
  {
    id: 'noiDung',
    label: 'Nội dung',
    minWidth: 400,
  },
  {
    id: 'nutThanhToan',
    label: '',
    minWidth: 60,
  },
  {
    id: 'nutHuy',
    label: '',
    minWidth: 60,
  },
];

const createdColumns: readonly CreatedColumn[] = [
  { id: 'soTaiKhoan', label: 'Số tài khoản' },
  {
    id: 'tenNguoiNhan',
    label: 'Người nhận',
    minWidth: 200,
  },
  {
    id: 'thoiGian',
    label: 'Thời gian',
    minWidth: 150,
  },
  {
    id: 'soTien',
    label: 'Số tiền',
    minWidth: 120,
  },
  {
    id: 'noiDung',
    label: 'Nội dung',
    minWidth: 200,
  },
  {
    id: 'nutHuy',
    label: '',
    minWidth: 60,
  },
];

interface DebtTableProps {
  created: boolean;
  paid?: boolean;
  onClickDelete: any;
}

export default function DebtTable({
  created,
  paid = false,
  onClickDelete,
}: DebtTableProps) {
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell key="index">STT</TableCell>
            {created
              ? createdColumns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))
              : receivedColumns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover tabIndex={-1}>
            <TableCell>1</TableCell>
            <TableCell>0123456789</TableCell>
            <TableCell>Ho Lam Bao Khuyen</TableCell>
            <TableCell>16:06 27/12/2022</TableCell>
            <TableCell>{formatMoney(50000)} VND</TableCell>
            <TableCell>Làm ơn trả tiền cho mình nhé</TableCell>
            {!paid && (
              <>
                {!created && (
                  <TableCell sx={{ maxWidth: '5rem' }}>
                    <Button variant="contained" color="success">
                      Thanh toán
                    </Button>
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onClickDelete}
                  >
                    Xoá
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
