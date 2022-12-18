import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledClickableCard = styled(Card)`
  font-weight: bold;
  width: 50%;
  padding: 1rem;
  &:first-child {
    margin-right: 2rem;
  }
  &:hover {
    cursor: pointer;
  }
`;
