import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CommentList = styled(Box)(() => ({
  backgroundColor: '#e9e9e9',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between'
}));

export const Comment = styled(Typography)(() => ({
  marginRight: '12px'
}));
