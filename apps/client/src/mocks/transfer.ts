import { Receiver, TransactionHistory } from '../types';

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
      nguoiGui: 'Nguyễn Ngọc Thanh Tâm',
      nguoiNhan: 'Hồ Lâm Bảo Khuyên',
      soTien: 100000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Trả tiền ăn bữa thứ 6',
      loaiCK: 'transfer',
    },
    {
      maCK: 2,
      nguoiGui: 'Nguyễn Ngọc Thanh Tâm',
      nguoiNhan: 'Nguyễn Thu Thảo Châu',
      soTien: 200000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Cảm ơn đã cho mượn tiền nha',
      loaiCK: 'debt',
    },
    {
      maCK: 3,
      nguoiGui: 'La Ngọc Hồng Phúc',
      nguoiNhan: 'Nguyễn Ngọc Thanh Tâm',
      soTien: 200000,
      ngayCK: '20:39 04/01/2023',
      noiDungCK: 'Trả tiền Haidilao nè',
      loaiCK: 'receive',
    },
  ] as TransactionHistory[],
};
