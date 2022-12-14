import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';

import Layout from '../../components/Layout';
import { StyledContentWrapper } from '../../components/styles';
import TabPanel from '../../components/TabPanel';

interface State {
  balance: number;
  showBalance: boolean;
}

function Home() {
  const [values, setValues] = useState<State>({
    balance: 100000,
    showBalance: false,
  });

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    []
  );

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

        <Tabs
          sx={{ marginTop: '1rem' }}
          value={selectedTab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Lịch sử giao dịch" />
          <Tab label="Chuyển tiền" />
          <Tab label="Nhắc nợ" />
        </Tabs>
        <TabPanel index={0} value={selectedTab}>
          Lịch sử giao dịch
        </TabPanel>
        <TabPanel index={1} value={selectedTab}>
          Chuyển tiền
        </TabPanel>
        <TabPanel index={2} value={selectedTab}>
          Nhắc nợ
        </TabPanel>
      </StyledContentWrapper>
    </Layout>
  );
}

export default Home;
