import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)`
  padding: 1rem;
  margin-top: 1rem;
  & > p {
    font-weight: 600;
  }
`;
