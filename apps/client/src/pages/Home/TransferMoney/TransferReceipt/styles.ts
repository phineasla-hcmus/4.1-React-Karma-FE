import { Box, Divider, Typography } from '@mui/material';
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

export const StyledDivider = styled(Divider)`
  width: 60%;
  margin: 0 auto;
  border-color: #ccc;
`;

export const StyledContentBox = styled(Box)`
  width: 100%;
  text-align: left;
`;
