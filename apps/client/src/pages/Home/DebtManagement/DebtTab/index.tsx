import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';

import TabPanel from '../../../../components/TabPanel';
import { Reminder } from '../../../../types';
import DebtTable from '../DebtTable';

import { StyledCard } from './styles';

interface DebtTabProps {
  data: Reminder[];
  value: number;
  index: number;
  created: boolean;
}

export default function DebtTab({ data, value, index, created }: DebtTabProps) {
  const [openDeleteDebtDialog, setOpenDeleteDebtDialog] = useState(false);
  const [deleteContent, setDeleteContent] = useState('');

  const handleOpenDeleteDebtDialog = useCallback(() => {
    setOpenDeleteDebtDialog(true);
  }, []);

  const handleCloseDeleteDebtDialog = useCallback(() => {
    setOpenDeleteDebtDialog(false);
  }, []);

  const handleChangeDeleteContent = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDeleteContent(event.target.value);
    },
    []
  );

  const { pendingList, completedList } = useMemo(() => {
    return {
      pendingList: data.filter((item) => item.trangThai === 'pending'),
      completedList: data.filter((item) => item.trangThai === 'completed'),
    };
  }, []);

  return (
    <>
      <TabPanel value={value} index={index}>
        <StyledCard>
          <Typography>Cần xử lý</Typography>
          <DebtTable
            created={created}
            onClickDelete={handleOpenDeleteDebtDialog}
            data={pendingList}
          />
        </StyledCard>
        <StyledCard>
          <Typography>Đã thanh toán</Typography>
          <DebtTable
            created={created}
            completed
            onClickDelete={handleOpenDeleteDebtDialog}
            data={completedList}
          />
        </StyledCard>
      </TabPanel>
      <Dialog open={openDeleteDebtDialog} onClose={handleCloseDeleteDebtDialog}>
        <DialogTitle>Xoá nhắc nợ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xoá nhắc nợ này?
          </DialogContentText>
          <TextField
            value={deleteContent}
            name="deleteContent"
            required
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            onChange={handleChangeDeleteContent}
          />
        </DialogContent>
        <DialogActions sx={{ marginRight: '1rem' }}>
          <Button variant="outlined" onClick={handleCloseDeleteDebtDialog}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleCloseDeleteDebtDialog}>
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
