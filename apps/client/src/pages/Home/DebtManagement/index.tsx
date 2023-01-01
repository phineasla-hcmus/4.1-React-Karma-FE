/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';

import DebtTab from './DebtTab';

export default function DebtManagement() {
  const [value, setValue] = useState(0);
  const [openAddDebtDialog, setOpenAddDebtDialog] = useState(false);
  const [chooseFromList, setChooseFromList] = useState(false);
  const [receiver, setReceiver] = useState('');

  const handleOpenAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(true);
  }, []);

  const handleCloseAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(false);
  }, []);

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  const handleSelectChooseFromList = (event: ChangeEvent<HTMLInputElement>) => {
    setChooseFromList(event.target.checked);
  };

  const handleSelectReceiver = (event: SelectChangeEvent) => {
    setReceiver(event.target.value as string);
  };

  return (
    <Layout>
      <StyledContentWrapper>
        <StyledBreadCrumbs aria-label="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <Typography color="text.primary">Nhắc nợ</Typography>
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
            <Typography variant="h6">Danh sách nhắc nợ</Typography>
            <Button variant="contained" onClick={handleOpenAddDebtDialog}>
              Tạo nhắc nợ mới
            </Button>
          </Box>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Nhắc nợ từ bạn" />
              <Tab label="Nhắc nợ đến bạn" />
            </Tabs>
          </AppBar>
          <Box>
            <DebtTab value={value} index={0} created />
            <DebtTab value={value} index={1} created={false} />
          </Box>
        </Box>
      </StyledContentWrapper>
      <Dialog open={openAddDebtDialog} onClose={handleCloseAddDebtDialog}>
        <DialogTitle>Tạo nhắc nợ mới</DialogTitle>
        <DialogContent>
          <FormControl sx={{ display: 'block' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={chooseFromList}
                  onChange={handleSelectChooseFromList}
                />
              }
              label="Chọn từ danh sách đã lưu"
            />
          </FormControl>
          {chooseFromList ? (
            <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
              <InputLabel id="receiver-select-label">Số tài khoản</InputLabel>
              <Select
                labelId="receiver-select-label"
                id="receiver-select"
                value={receiver}
                label="Số tài khoản"
                onChange={handleSelectReceiver}
              >
                <MenuItem value="123456789">123456789</MenuItem>
                <MenuItem value="123456789">123456789</MenuItem>
                <MenuItem value="123456789">123456789</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              name="accountNumber"
              required
              margin="dense"
              label="Số tài khoản"
              type="number"
              fullWidth
            />
          )}
          <TextField
            name="amount"
            required
            margin="dense"
            label="Số tiền cần chuyển"
            type="number"
            fullWidth
          />
          <TextField
            name="debtContent"
            required
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions sx={{ marginRight: '1rem' }}>
          <Button variant="outlined" onClick={handleCloseAddDebtDialog}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleCloseAddDebtDialog}>
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
