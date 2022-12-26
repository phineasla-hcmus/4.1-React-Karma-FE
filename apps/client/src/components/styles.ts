import { Box, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContentWrapper = styled(Box)`
  padding: 1.5rem 1.25rem;
  margin-top: 4rem;
`;

export const StyledBreadCrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: '1.5rem',
  '& button': {
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
}));
