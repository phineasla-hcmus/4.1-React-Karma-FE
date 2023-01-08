import {
  Receiver,
  ReminderCheckoutHistory,
  TransactionHistory,
} from '../types';

export const RECEIVER_LIST = [
  {
    tenGoiNho: 'Hồ Lâm Bảo Khuyên',
    nguoiDung: '123456789',
  },
  {
    tenGoiNho: 'La Ngọc Hồng Phúc',
    nguoiDung: '123456780',
  },
  {
    tenGoiNho: 'Nguyễn Thu Thảo Châu',
    nguoiDung: '123456777',
  },
  {
    tenGoiNho: 'Nguyễn Mai Xuân Huyên',
    nguoiDung: '123456721',
  },
] as Receiver[];

export const TRANSACTION_HISTORY = {
  lichSuGiaoDich: [
    {
      maCK: 1,
      nguoiGui: '111222333444',
      nguoiNhan: '123467891654',
      tenNguoiGui: 'Nguyễn Ngọc Thanh Tâm',
      tenNguoiNhan: 'Hồ Lâm Bảo Khuyên',
      soTien: 100000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Trả tiền ăn bữa thứ 6',
      loai: 'transfer',
      loaiCK: 'sender',
      phiCK: 30000,
    },
    {
      maCK: 2,
      nguoiGui: '111222333444',
      nguoiNhan: '123467891654',
      tenNguoiGui: 'La Ngọc Hồng Phúc',
      tenNguoiNhan: 'Nguyễn Ngọc Thanh Tâm',
      soTien: 200000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Trả tiền Haidilao nè',
      loai: 'receive',
      loaiCK: 'receiver',
      phiCK: 30000,
    },
  ] as TransactionHistory[],
};

export const REMINDER_CHECKOUT_HISTORY = {
  lichSuGiaoDich: [
    {
      maCK: 3,
      nguoiGui: '111222333444',
      nguoiNhan: '123467891654',
      tenNguoiGui: 'Nguyễn Ngọc Thanh Tâm',
      tenNguoiNhan: 'Nguyễn Thu Thảo Châu',
      soTien: 200000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Cảm ơn đã cho mượn tiền nha',
    },
    {
      maCK: 4,
      nguoiGui: '123467891654',
      nguoiNhan: '111222333444',
      tenNguoiGui: 'Nguyễn Thị Minh Thu',
      tenNguoiNhan: 'Nguyễn Ngọc Thanh Tâm',
      soTien: 50000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Cảm ơn đã cho mượn tiền nha',
    },
  ] as ReminderCheckoutHistory[],
};
