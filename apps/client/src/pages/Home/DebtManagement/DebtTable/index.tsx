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

import { Reminder } from '../../../../types';
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
  completed?: boolean;
  onClickDelete: any;
  data: Reminder[];
}

export default function DebtTable({
  created,
  completed = false,
  onClickDelete,
  data,
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
          {data.map((item, index) => (
            <TableRow key={item.maNN} hover tabIndex={-1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.soTK}</TableCell>
              <TableCell>{item.hoTen}</TableCell>
              <TableCell>{item.ngayTao}</TableCell>
              <TableCell>{formatMoney(item.soTien)} VND</TableCell>
              <TableCell>{item.noiDungNN}</TableCell>
              {!completed && (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
