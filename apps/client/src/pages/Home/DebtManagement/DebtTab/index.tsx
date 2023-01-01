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
import React, { ChangeEvent, useCallback, useState } from 'react';

import TabPanel from '../../../../components/TabPanel';
import DebtTable from '../DebtTable';

import { StyledCard } from './styles';

interface DebtTabProps {
  value: number;
  index: number;
  created: boolean;
}

export default function DebtTab({ value, index, created }: DebtTabProps) {
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

  return (
    <>
      <TabPanel value={value} index={index}>
        <StyledCard>
          <Typography>Cần xử lý</Typography>
          <DebtTable
            created={created}
            onClickDelete={handleOpenDeleteDebtDialog}
          />
        </StyledCard>
        <StyledCard>
          <Typography>Đã thanh toán</Typography>
          <DebtTable
            created={created}
            paid
            onClickDelete={handleOpenDeleteDebtDialog}
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
