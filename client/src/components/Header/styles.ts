import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  padding: '0 1.25rem',
  height: '4rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
