import React, { useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout';
import { StyledContentWrapper } from '../../components/styles';

import { StyledClickableCard } from './styles';

interface State {
  balance: number;
  showBalance: boolean;
}

function Home() {
  const navigate = useNavigate();

  const [values, setValues] = useState<State>({
    balance: 100000,
    showBalance: false,
  });

  const handleClickShowBalance = useCallback(() => {
    setValues((v) => ({
      ...v,
      showBalance: !v.showBalance,
    }));
  }, []);

  return (
    <Layout>
      <StyledContentWrapper>
        <Box
          sx={{
            maxWidth: '18rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">
            Số dư khả dụng:{' '}
            <Typography sx={{ marginLeft: '0.2rem' }} component="span">
              {values.showBalance ? values.balance : '*********'} VND
            </Typography>
          </Typography>
          <IconButton
            aria-label="toggle balance visibility"
            onClick={handleClickShowBalance}
            edge="end"
          >
            {values.showBalance ? (
              <VisibilityOff sx={{ fontSize: '1.25rem' }} />
            ) : (
              <Visibility sx={{ fontSize: '1.25rem' }} />
            )}
          </IconButton>
        </Box>
        <Grid container>
          <Grid item xs={9} sx={{ display: 'flex' }}>
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
      </StyledContentWrapper>
    </Layout>
  );
}

export default Home;
