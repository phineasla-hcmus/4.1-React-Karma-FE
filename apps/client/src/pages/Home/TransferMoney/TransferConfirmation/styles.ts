import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0.5rem auto;
`;

export const StyledTitle = styled(Typography)`
  width: 50%;
  margin-right: 2rem;
  text-align: right;
  font-weight: 600;
`;
