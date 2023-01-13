import { Reminder } from '../types';

export const REMINDER_LIST = [
  {
    maNN: 1,
    soTKNguoiGui: '123456789',
    noiDungNN: 'Trả tiền cho mình nha',
    soTien: 100000,
    ngayTao: '21:54 05/01/2023',
    trangThai: 'pending',
  },
  {
    maNN: 2,
    soTKNguoiGui: '123456789',
    noiDungNN: 'Trả tiền cho mình nha',
    soTien: 300000,
    ngayTao: '21:54 05/01/2023',
    trangThai: 'completed',
  },
] as Reminder[];

export const MY_REMINDER_LIST = [
  {
    maNN: 1,
    soTKNguoiGui: '123456789',
    noiDungNN: 'Trả tiền ăn bữa đi',
    soTien: 100000,
    ngayTao: '21:54 05/01/2023',
    trangThai: 'pending',
  },
  {
    maNN: 2,
    soTKNguoiGui: '123456789',
    noiDungNN: 'Trả tiền đi chơi đi',
    soTien: 300000,
    ngayTao: '21:54 05/01/2023',
    trangThai: 'completed',
  },
] as Reminder[];
