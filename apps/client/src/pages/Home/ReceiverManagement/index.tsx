/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import { RECEIVER_LIST } from '../../../mocks';

import ReceiverInfoCard from './ReceiverInfoCard';

export default function ReceiverManagement() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    accountNumber: '',
    name: '',
  });
  const [openAddReceiver, setOpenAddReceiver] = useState(false);
  const [openDeleteReceiver, setOpenDeleteReceiver] = useState(false);
  const [openEditReceiver, setOpenEditReceiver] = useState(false);

  const handleClickOpenAddReceiverDialog = () => {
    setOpenAddReceiver(true);
  };

  const handleCloseAddReceiverDialog = () => {
    setOpenAddReceiver(false);
  };

  const handleClickOpenDeleteReceiverDialog = () => {
    setOpenDeleteReceiver(true);
  };

  const handleCloseDeleteReceiverDialog = () => {
    setOpenDeleteReceiver(false);
  };

  const handleClickOpenEditReceiverDialog = (receiver: any) => {
    setOpenEditReceiver(true);
    setValues({
      accountNumber: receiver.accountNumber,
      name: receiver.name,
    });
  };

  const handleCloseEditReceiverDialog = () => {
    setOpenEditReceiver(false);
    setValues({
      accountNumber: '',
      name: '',
    });
  };

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => {
              navigate('/');
            }}
          >
            Trang chủ
          </Link>
          <Typography color="text.primary">Quản lý người nhận</Typography>
        </StyledBreadCrumbs>
        <Box mt={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <Typography variant="h6">Danh sách người nhận</Typography>
            <Button
              variant="contained"
              onClick={handleClickOpenAddReceiverDialog}
            >
              Thêm người nhận
            </Button>
          </Box>
          {RECEIVER_LIST.map((item) => (
            <ReceiverInfoCard
              key={item.accountNumber}
              name={item.name}
              accountNumber={item.accountNumber}
              onClickDelete={handleClickOpenDeleteReceiverDialog}
              onClickEdit={() => handleClickOpenEditReceiverDialog(item)}
            />
          ))}
        </Box>
      </StyledContentWrapper>
      <Dialog open={openAddReceiver} onClose={handleCloseAddReceiverDialog}>
        <DialogTitle>Thêm người nhận</DialogTitle>
        <DialogContent>
          <TextField
            name="addAccountNumber"
            required
            margin="dense"
            label="Số tài khoản"
            type="number"
            fullWidth
          />
          <TextField
            name="addName"
            margin="dense"
            label="Tên gợi nhớ"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddReceiverDialog}>Hủy</Button>
          <Button onClick={handleCloseAddReceiverDialog}>Lưu</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditReceiver} onClose={handleCloseEditReceiverDialog}>
        <DialogTitle>Chỉnh sửa người nhận</DialogTitle>
        <DialogContent>
          <TextField
            value={values.accountNumber}
            name="editAccountNumber"
            required
            margin="dense"
            label="Số tài khoản"
            type="number"
            fullWidth
          />
          <TextField
            value={values.name}
            name="editName"
            margin="dense"
            label="Tên gợi nhớ"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditReceiverDialog}>Hủy</Button>
          <Button onClick={handleCloseEditReceiverDialog}>Lưu</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteReceiver}
        onClose={handleCloseDeleteReceiverDialog}
      >
        <DialogTitle>Xoá người nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xoá người nhận này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteReceiverDialog}>Hủy</Button>
          <Button onClick={handleCloseDeleteReceiverDialog}>Xoá</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
