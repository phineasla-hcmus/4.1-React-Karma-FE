export interface UserInfo {
  hoTen: string;
  email: string;
  sdt: string;
  soTK: string;
  soDu: number;
  taiKhoanThanhToan: PaymentAccountInfo;
}

export interface PaymentAccountInfo {
  soTK: string;
  soDu: number;
  maTK: number;
  hoatDong: boolean;
}

export interface TransactionHistory {
  maCK: number;
  nguoiChuyen: string;
  nguoiNhan: string;
  tenNguoiGui: string;
  tenNguoiNhan: string;
  soTien: number;
  ngayCK: string;
  noiDungCK: string;
  loai: number;
  loaiCK: 'sender' | 'receiver';
  phiCK: number;
}

export interface Receiver {
  nguoiDung: string;
  tenGoiNho: string;
}

export interface Reminder {
  maNN: number;
  soTKNguoiGui: string;
  soTKNguoiNhan: string;
  noiDungNN: string;
  soTien: number;
  ngayTao: string;
  trangThai: 'pending' | 'done';
}

export interface ReminderCheckoutHistory {
  maCK: number;
  nguoiChuyen: string;
  nguoiNhan: string;
  tenNguoiGui: string;
  tenNguoiNhan: string;
  soTien: number;
  ngayCK: string;
  noiDungCK: string;
}
