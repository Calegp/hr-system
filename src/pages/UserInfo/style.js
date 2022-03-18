import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ImageBox = styled(Box)(() => ({
  marginBottom: '8px',
  height: '280px',
  padding: '16px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#000'
}));

export const UserBox = styled(Box)(() => ({
  padding: '2rem'
}));

export const FormItems = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '400px'
}));
