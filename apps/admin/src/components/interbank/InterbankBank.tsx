import React from 'react';
import { useCreate, useCreateSuggestionContext } from 'react-admin';
import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';

export function CreateCategory() {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [create] = useCreate();
  const [value, setValue] = React.useState(filter || '');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    create(
      'categories',
      { data: { title: value } },
      {
        onSuccess: (data) => {
          setValue('');
          onCreate(data);
        },
      }
    );
  };

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="New category name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
