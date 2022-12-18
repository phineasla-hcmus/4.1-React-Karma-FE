import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledClickableCard = styled(Card)`
  display: flex;
  align-items: center;
  width: 33%;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
  font-size: 1.5rem;
  margin-right: 2rem;
  font-weight: 600;
`;
