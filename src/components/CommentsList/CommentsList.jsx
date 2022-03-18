import { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { CommentList, Comment } from './style';

const CommentsList = ({ comments }) => {
  const [commentsList, setCommentsList] = useState(comments);

  useEffect(() => setCommentsList(comments), [comments]);

  const deleteComment = (commentId) => {
    api.delete(`comments/${commentId}`).then(() => {
      setCommentsList(
        commentsList.filter((comment) => {
          return comment.id !== commentId;
        })
      );
    });
  };

  return commentsList.map((comment) => (
    <CommentList key={comment.id}>
      <Comment>{comment.value}</Comment>
      <Button
        type="button"
        variant="text"
        color="error"
        onClick={() => deleteComment(comment.id)}
      >
        Excluir
      </Button>
    </CommentList>
  ));
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default CommentsList;
