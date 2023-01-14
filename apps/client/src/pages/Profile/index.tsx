import { Box, Button, Card, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../components/AsyncDataRenderer';
import Layout from '../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../components/styles';
import { useUserInfoQuery } from '../../redux/slices/authSlice';

export default function Profile() {
  const { isLoading, data: { data: userInfoData = {} } = {} } =
    useUserInfoQuery({});

  const userInfo = useMemo(() => userInfoData, [userInfoData]);

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
              >
                Đóng tài khoản
              </Button>
            </Box>
          </Card>
        </AsyncDataRenderer>
      </StyledContentWrapper>
    </Layout>
  );
}
