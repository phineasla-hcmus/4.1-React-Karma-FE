export interface UserInfo {
  hoTen: string;
  email: string;
  sdt: string;
  soTK: string;
  soDu: number;
}

export interface TransactionHistory {
  maCK: number;
  nguoiGui: string;
  nguoiNhan: string;
  soTien: number;
  ngayCK: string;
  noiDungCK: string;
  loaiCK: 'transfer' | 'receive' | 'debt';
}

export interface Receiver {
  nguoiDung: string;
  tenGoiNho: string;
}
