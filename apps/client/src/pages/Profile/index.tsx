import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AsyncDataRenderer from '../../components/AsyncDataRenderer';
import Layout from '../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../components/styles';
import {
  useDeactivateAccountMutation,
  useUserInfoQuery,
} from '../../redux/slices/authSlice';

export default function Profile() {
  const { isLoading, data: { data: userInfoData = {} } = {} } =
    useUserInfoQuery({});

  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);

  const userInfo = useMemo(() => userInfoData, [userInfoData]);

  const [deActivateAccount, { isLoading: deactivateLoading }] =
    useDeactivateAccountMutation();

  const handleClickOpenDeactivateDialog = () => {
    setOpenDeactivateDialog(true);
  };

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
  };

  const navigate = useNavigate();

  const handleDeactivateAccount = async () => {
    try {
      await deActivateAccount({});
      handleCloseDeactivateDialog();
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      localStorage.removeItem('SOTK');
      navigate('/login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Thông tin cá nhân</Typography>
        </StyledBreadCrumbs>
        <AsyncDataRenderer loading={isLoading}>
          <Card sx={{ padding: '1rem' }}>
            <Box>
              <Typography>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  Họ tên
                </Typography>
                : {userInfo.hoTen}
              </Typography>
              <Typography>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  Email
                </Typography>
                : {userInfo.email}
              </Typography>
              <Typography>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  Điện thoại
                </Typography>
                : {userInfo.sdt}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: '1rem' }}
                onClick={handleClickOpenDeactivateDialog}
              >
                Đóng tài khoản
              </Button>
            </Box>
          </Card>
        </AsyncDataRenderer>
      </StyledContentWrapper>
      <Dialog open={openDeactivateDialog} onClose={handleCloseDeactivateDialog}>
        <DialogTitle>Đóng tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn đóng tài khoản?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ marginRight: '1rem' }}>
          <Button variant="outlined" onClick={handleCloseDeactivateDialog}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleDeactivateAccount}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deactivateLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
