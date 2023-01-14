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
import { Link } from 'react-router-dom';

import AsyncDataRenderer from '../../../components/AsyncDataRenderer';
import Layout from '../../../components/Layout';
import {
  StyledBreadCrumbs,
  StyledContentWrapper,
} from '../../../components/styles';
import { REMINDER_LIST } from '../../../mocks/reminder';
import { RECEIVER_LIST } from '../../../mocks/transfer';
import {
  reminderApi,
  useCreateReminderMutation,
} from '../../../redux/slices/reminderSlice';
import { useGetContactListQuery } from '../../../redux/slices/contactSlice';
import { Receiver, Reminder } from '../../../types';

import DebtTab from './DebtTab';

export default function DebtManagement() {
  const [value, setValue] = useState(0);
  const [openAddDebtDialog, setOpenAddDebtDialog] = useState(false);
  const [chooseFromList, setChooseFromList] = useState(false);

  const soTK = localStorage.getItem('SOTK');

  const handleOpenAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(true);
  }, []);

  const handleCloseAddDebtDialog = useCallback(() => {
    setOpenAddDebtDialog(false);
  }, []);

  const [
    getReminderList,
    {
      isLoading: reminderListLoading,
      data: { data: reminderListData = [] } = {},
    },
  ] = reminderApi.endpoints.getReminderList.useLazyQuery();

  const reminderList = useMemo(
    () => reminderListData || REMINDER_LIST,
    [reminderListData]
  ) as Reminder[];

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      switch (newValue) {
        case 0:
          getReminderList('others');
          break;

        case 1:
          getReminderList('me');
          break;

        default:
          break;
      }

      setValue(newValue);
    },
    [getReminderList]
  );

  const handleSelectChooseFromList = (event: ChangeEvent<HTMLInputElement>) => {
    setChooseFromList(event.target.checked);
  };

  useEffect(() => {
    getReminderList('others');
  }, [getReminderList]);

  const {
    isLoading: getSavedListLoading,
    data: { data: getSavedListData = [] } = {},
  } = useGetContactListQuery({});

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
      soTKNguoiNhan: data.get('nguoiNhan'),
      soTK,
      soTien: Number(data.get('soTien')),
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
          <Link to="/">Home</Link>
          <Typography color="text.primary">Debt management</Typography>
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
            <Typography variant="h6">Debt reminder list</Typography>
            <Button variant="contained" onClick={handleOpenAddDebtDialog}>
              Add debt reminder
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
              <Tab label="Debt reminder you created" />
              <Tab label="Debt reminder you received" />
            </Tabs>
          </AppBar>
          <Box>
            <AsyncDataRenderer loading={reminderListLoading}>
              <DebtTab value={value} index={0} created data={reminderList} />
            </AsyncDataRenderer>
            <AsyncDataRenderer loading={reminderListLoading}>
              <DebtTab
                value={value}
                index={1}
                created={false}
                data={reminderList}
              />
            </AsyncDataRenderer>
          </Box>
        </Box>
      </StyledContentWrapper>
      <Dialog open={openAddDebtDialog} onClose={handleCloseAddDebtDialog}>
        <DialogTitle>Add debt reminder</DialogTitle>
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
                label="Choose from saved list"
              />
            </FormControl>
            {chooseFromList ? (
              <AsyncDataRenderer loading={getSavedListLoading}>
                <FormControl sx={{ marginTop: '1rem', width: '100%' }}>
                  <InputLabel id="receiver-select-label">
                    Account number
                  </InputLabel>
                  <Select
                    name="nguoiNhan"
                    labelId="receiver-select-label"
                    id="receiver-select"
                    label="Account number"
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
                label="Account number"
                type="number"
                fullWidth
              />
            )}
            <TextField
              name="soTien"
              required
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
            />
            <TextField
              name="noiDung"
              required
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
            <DialogActions sx={{ paddingRight: 0 }}>
              <Button variant="outlined" onClick={handleCloseAddDebtDialog}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Add
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
