import { Paper } from '@mui/material/';
import { styled } from '@mui/material/styles';

const EmptyState = styled(Paper)(() => ({
  backgroundColor: '#fff',
  padding: '2px',
  marginTop: '20px',
  height: '100px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export default EmptyState;
