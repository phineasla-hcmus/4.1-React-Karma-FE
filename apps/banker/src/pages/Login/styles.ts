import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCaptchaWrapper = styled(Box)`
  div iframe {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
`;
