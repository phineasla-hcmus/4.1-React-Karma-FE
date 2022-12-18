import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../../components/Layout';
import { StyledContentWrapper } from '../../../components/styles';

import { StyledClickableCard } from './styles';

function TransferMoney() {
  const navigate = useNavigate();
  return (
    <Layout>
      <StyledContentWrapper>
        <Typography mb={2} variant="h5">
          Chuyển tiền
        </Typography>
        <Grid container>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <StyledClickableCard
              onClick={() => {
                navigate('/transfer/internal-bank');
              }}
            >
              Nội bộ
            </StyledClickableCard>
            <StyledClickableCard
              onClick={() => {
                navigate('/transfer/external-bank');
              }}
            >
              Liên ngân hàng
            </StyledClickableCard>
          </Grid>
        </Grid>
      </StyledContentWrapper>
    </Layout>
  );
}

export default TransferMoney;
