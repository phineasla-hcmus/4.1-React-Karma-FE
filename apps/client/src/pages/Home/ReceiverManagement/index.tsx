import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../../components/AsyncDataRenderer';
import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import { RECEIVER_LIST } from '../../../mocks/transfer';
import {
  useAddUserToContactListMutation,
  useDeleteUserContactListByIdMutation,
  useGetContactListQuery,
  useUpdateUserContactListByIdMutation,
} from '../../../redux/slices/contactSlice';
import { Receiver } from '../../../types';

import ReceiverInfoCard from './ReceiverInfoCard';

export default function ReceiverManagement() {
  const [values, setValues] = useState({
    accountNumber: '',
    name: '',
  });
  const [openAddReceiver, setOpenAddReceiver] = useState(false);
  const [openDeleteReceiver, setOpenDeleteReceiver] = useState(false);
  const [openEditReceiver, setOpenEditReceiver] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState('');

  const handleClickOpenAddReceiverDialog = () => {
    setOpenAddReceiver(true);
  };

  const handleCloseAddReceiverDialog = () => {
    setOpenAddReceiver(false);
  };

  const handleClickOpenDeleteReceiverDialog = (receiver: Receiver) => {
    setOpenDeleteReceiver(true);
    setSelectedDeleteUser(receiver.nguoiDung);
  };

  const handleCloseDeleteReceiverDialog = () => {
    setOpenDeleteReceiver(false);
  };

  const handleClickOpenEditReceiverDialog = (receiver: Receiver) => {
    setOpenEditReceiver(true);
    setValues({
      accountNumber: receiver.nguoiDung,
      name: receiver.tenGoiNho,
    });
  };

  const handleCloseEditReceiverDialog = () => {
    setOpenEditReceiver(false);
  };

  const { isLoading: getSavedListLoading, data: getSavedListData } =
    useGetContactListQuery({});

  const savedList = useMemo(
    () => getSavedListData?.data || RECEIVER_LIST,
    [getSavedListData?.data]
  ) as Receiver[];

  const [addUserToSavedList, { isLoading: addUserLoading }] =
    useAddUserToContactListMutation();

  const handleAddUserToSavedList = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setOpenAddReceiver(false);

    const payload = {
      nguoiDung: data.get('soTK'),
      tenGoiNho: data.get('tenGoiNho'),
    };

    try {
      await addUserToSavedList(payload);
    } catch (error) {
      console.log('error', error);
    }
  };

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserContactListByIdMutation();

  const handleEditUserInSavedList = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setOpenEditReceiver(false);

    try {
      await updateUser({
        soTK: data.get('soTK'),
        payload: data.get('tenGoiNho'),
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserContactListByIdMutation();

  const handleDeleteUserInSavedList = async () => {
    setOpenDeleteReceiver(false);

    try {
      await deleteUser(selectedDeleteUser);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Quản lý người nhận</Typography>
        </StyledBreadCrumbs>
        <AsyncDataRenderer loading={getSavedListLoading}>
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
            {savedList.map((item) => (
              <ReceiverInfoCard
                key={item.nguoiDung}
                name={item.tenGoiNho}
                accountNumber={item.nguoiDung}
                onClickDelete={() => handleClickOpenDeleteReceiverDialog(item)}
                onClickEdit={() => handleClickOpenEditReceiverDialog(item)}
              />
            ))}
          </Box>
        </AsyncDataRenderer>
      </StyledContentWrapper>
      <Dialog open={openAddReceiver} onClose={handleCloseAddReceiverDialog}>
        <DialogTitle>Thêm người nhận</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddUserToSavedList}>
            <TextField
              name="soTK"
              required
              margin="dense"
              label="Số tài khoản"
              type="number"
              fullWidth
            />
            <TextField
              name="tenGoiNho"
              margin="dense"
              label="Tên gợi nhớ"
              fullWidth
            />
            <DialogActions sx={{ paddingRight: 0 }}>
              <Button variant="outlined" onClick={handleCloseAddReceiverDialog}>
                Hủy
              </Button>
              <Button variant="contained" type="submit">
                Lưu
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={openEditReceiver} onClose={handleCloseEditReceiverDialog}>
        <DialogTitle>Chỉnh sửa người nhận</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleEditUserInSavedList}>
            <TextField
              value={values.accountNumber}
              name="soTK"
              required
              margin="dense"
              label="Số tài khoản"
              type="number"
              fullWidth
            />
            <TextField
              value={values.name}
              name="tenGoiNho"
              margin="dense"
              label="Tên gợi nhớ"
              fullWidth
            />
            <DialogActions sx={{ paddingRight: 0 }}>
              <Button
                variant="outlined"
                onClick={handleCloseEditReceiverDialog}
              >
                Hủy
              </Button>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
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
        <DialogActions sx={{ marginRight: '1rem' }}>
          <Button variant="outlined" onClick={handleCloseDeleteReceiverDialog}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleDeleteUserInSavedList}>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={addUserLoading || updateUserLoading || deleteUserLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
