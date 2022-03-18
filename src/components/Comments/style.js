import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CommentArea = styled(Paper)(() => ({
  marginTop: '20px',
  padding: '16px',
  width: '70%',
  border: '1px solid #999999',
  backgroundColor: '#e2e2e2',
  borderRadius: '5px'
}));

export default CommentArea;
