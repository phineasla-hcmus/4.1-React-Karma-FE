/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../../components/AsyncDataRenderer';
import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import { MY_REMINDER_LIST, REMINDER_LIST } from '../../../mocks/reminder';
import { RECEIVER_LIST } from '../../../mocks/transfer';
import {
  reminderApi,
  useCreateReminderMutation,
} from '../../../redux/slices/reminderSlice';
import { useGetContactListQuery } from '../../../redux/slices/contactSlice';
import { RootState } from '../../../redux/store';
import { Receiver, Reminder } from '../../../types';

import DebtTab from './DebtTab';

export default function DebtManagement() {
  const [value, setValue] = useState(0);
  const [openAddDebtDialog, setOpenAddDebtDialog] = useState(false);
  const [chooseFromList, setChooseFromList] = useState(false);

  const { soTK } = useSelector((state: RootState) => state.auth.userInfo);

  const handleOpenAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(true);
  }, []);

  const handleCloseAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(false);
  }, []);

  const [
    getReminderList,
    { isLoading: reminderListLoading, data: reminderListData },
  ] = reminderApi.endpoints.getReminderList.useLazyQuery();

  const reminderList = useMemo(
    () => reminderListData || REMINDER_LIST,
    [reminderListData]
  ) as Reminder[];

  const [
    getMyReminderList,
    { isLoading: myReminderListLoading, data: myReminderListData },
  ] = reminderApi.endpoints.getMyReminderList.useLazyQuery();

  const myReminderList = useMemo(
    () => myReminderListData || MY_REMINDER_LIST,
    [reminderListData]
  ) as Reminder[];

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      switch (newValue) {
        case 0:
          getReminderList({});
          break;

        case 1:
          getMyReminderList({});
          break;

        default:
          break;
      }

      setValue(newValue);
    },
    []
  );

  const handleSelectChooseFromList = (event: ChangeEvent<HTMLInputElement>) => {
    setChooseFromList(event.target.checked);
  };

  useEffect(() => {
    getReminderList({});
  }, []);

  const { isLoading: getSavedListLoading, data: getSavedListData } =
    useGetContactListQuery({});

  const savedList = useMemo(
    () => getSavedListData || RECEIVER_LIST,
    [getSavedListData]
  ) as Receiver[];

  const [createReminder, { isLoading: createReminderLoading }] =
    useCreateReminderMutation();

  const handleCreateReminder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setOpenAddDebtDialog(false);

    const payload = {
      nguoiNhan: data.get('nguoiNhan'),
      soTK,
      soTien: data.get('soTien'),
      noiDung: data.get('noiDung'),
    };

    try {
      await createReminder(payload);
    } catch (error) {
      console.log('error', error);
    }
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
            <AsyncDataRenderer loading={reminderListLoading}>
              <DebtTab value={value} index={0} created data={reminderList} />
            </AsyncDataRenderer>
            <AsyncDataRenderer loading={myReminderListLoading}>
              <DebtTab
                value={value}
                index={1}
                created={false}
                data={myReminderList}
              />
            </AsyncDataRenderer>
          </Box>
        </Box>
      </StyledContentWrapper>
      <Dialog open={openAddDebtDialog} onClose={handleCloseAddDebtDialog}>
        <DialogTitle>Tạo nhắc nợ mới</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateReminder}>
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
              <AsyncDataRenderer loading={getSavedListLoading}>
                <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
                  <InputLabel id="receiver-select-label">
                    Số tài khoản
                  </InputLabel>
                  <Select
                    name="nguoiNhan"
                    labelId="receiver-select-label"
                    id="receiver-select"
                    label="Số tài khoản"
                  >
                    {savedList.map((item) => (
                      <MenuItem value={item.nguoiDung}>
                        {item.nguoiDung}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </AsyncDataRenderer>
            ) : (
              <TextField
                name="nguoiNhan"
                required
                margin="dense"
                label="Số tài khoản"
                type="number"
                fullWidth
              />
            )}
            <TextField
              name="soTien"
              required
              margin="dense"
              label="Số tiền cần chuyển"
              type="number"
              fullWidth
            />
            <TextField
              name="noiDung"
              required
              margin="dense"
              label="Nội dung"
              fullWidth
              multiline
              rows={4}
            />
            <DialogActions sx={{ paddingRight: 0 }}>
              <Button variant="outlined" onClick={handleCloseAddDebtDialog}>
                Hủy
              </Button>
              <Button variant="contained" type="submit">
                Tạo
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createReminderLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
