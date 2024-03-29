import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout';
import { StyledContentWrapper } from '../../components/styles';
import { formatMoney } from '../../utils';
import { useUserInfoQuery } from '../../redux/slices/authSlice';
import AsyncDataRenderer from '../../components/AsyncDataRenderer';
import { USER_INFO } from '../../mocks/auth';

import { StyledClickableCard } from './styles';

function Home() {
  const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(false);

  const handleClickShowBalance = useCallback(() => {
    setShowBalance((v) => !v);
  }, []);

  const { isLoading, data: { data: userInfoData = {} } = {} } =
    useUserInfoQuery({});

  const userInfo = useMemo(() => userInfoData || USER_INFO, [userInfoData]);

  const paymentAccountInfo = useMemo(
    () => userInfoData.taiKhoanThanhToan,
    [userInfoData]
  );

  useEffect(() => {
    localStorage.setItem('SOTK', paymentAccountInfo?.soTK);
  }, [paymentAccountInfo]);

  return (
    <Layout>
      <StyledContentWrapper>
        <AsyncDataRenderer loading={isLoading}>
          <Card
            sx={{
              padding: '1.5rem',
              width: 'fit-content',
              marginBottom: '1rem',
            }}
          >
            <Typography sx={{ fontSize: '2rem' }}>
              {paymentAccountInfo?.soTK}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Account balance:{' '}
                <Typography sx={{ marginLeft: '0.2rem' }} component="span">
                  {showBalance
                    ? formatMoney(paymentAccountInfo?.soDu).concat(' VND')
                    : '*********'}
                </Typography>
              </Typography>
              <IconButton
                aria-label="toggle balance visibility"
                onClick={handleClickShowBalance}
                edge="end"
              >
                {showBalance ? (
                  <VisibilityOff sx={{ fontSize: '1.25rem' }} />
                ) : (
                  <Visibility sx={{ fontSize: '1.25rem' }} />
                )}
              </IconButton>
            </Box>
            <Typography variant="h6">{userInfo.hoTen}</Typography>
          </Card>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex' }}>
              <StyledClickableCard
                onClick={() => {
                  navigate('/transaction-history');
                }}
              >
                <Avatar
                  variant="square"
                  sx={{ marginRight: '1rem' }}
                  src="/img/transaction_history.png"
                />
                Transaction history
              </StyledClickableCard>
              <StyledClickableCard
                onClick={() => {
                  navigate('/receiver-management');
                }}
              >
                <Avatar
                  variant="square"
                  sx={{ marginRight: '1rem' }}
                  src="/img/receiver_list.png"
                />
                Receiver management
              </StyledClickableCard>
              <StyledClickableCard
                onClick={() => {
                  navigate('/transfer');
                }}
              >
                <Avatar
                  variant="square"
                  sx={{ marginRight: '1rem' }}
                  src="/img/transfer_money.png"
                />
                Transfer money
              </StyledClickableCard>
              <StyledClickableCard
                onClick={() => {
                  navigate('/debt-management');
                }}
              >
                <Avatar
                  variant="square"
                  sx={{ marginRight: '1rem' }}
                  src="/img/debt.png"
                />
                Debt management
              </StyledClickableCard>
            </Grid>
          </Grid>
        </AsyncDataRenderer>
      </StyledContentWrapper>
    </Layout>
  );
}

export default Home;
