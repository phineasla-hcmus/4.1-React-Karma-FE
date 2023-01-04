import React, { useCallback, useMemo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
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

  const { isLoading, data } = useUserInfoQuery({});

  const userInfo = useMemo(() => data || USER_INFO, [data]);

  return (
    <Layout>
      <StyledContentWrapper>
        <AsyncDataRenderer loading={isLoading}>
          <Box
            sx={{
              width: 'fit-content',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">
              Số dư khả dụng:{' '}
              <Typography sx={{ marginLeft: '0.2rem' }} component="span">
                {showBalance ? formatMoney(userInfo.soDu) : '*********'}
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
                Lịch sử giao dịch
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
                Quản lý người nhận
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
                Chuyển tiền
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
                Nhắc nợ
              </StyledClickableCard>
            </Grid>
          </Grid>
        </AsyncDataRenderer>
      </StyledContentWrapper>
    </Layout>
  );
}

export default Home;
