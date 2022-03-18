import { useEffect, useState } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import CommentsList from '@src/components/CommentsList';

import api from '../../services/api';
import CommentArea from './style';

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const userId = Number(id);

  useEffect(() => {
    api.get(`users/${userId}/comments`).then((response) => {
      setComments(response.data.comments);
    });
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    onSubmit: (userComment) => {
      api
        .post('comments', {
          comment: {
            user_id: userId,
            value: userComment.comment
          }
        })
        .then(() => {
          api.get(`users/${userId}/comments`).then((response) => {
            setComments(response.data.comments);
          });
        });
    }
  });

  return (
    <CommentArea>
      <Box
        sx={{
          '& .MuiTextField-root': { mr: 4, mb: 2, width: '80%' }
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              id="comment"
              label="Digite um comentário"
              multiline
              name="comment"
              onChange={formik.handleChange}
              rows={5}
              value={formik.values.comment}
              variant="filled"
            />
            <Button color="primary" variant="contained" type="submit">
              Enviar
            </Button>
          </div>
        </form>
        <CommentsList comments={comments} />
      </Box>
    </CommentArea>
  );
};

Comments.propTypes = {
  id: PropTypes.string
};

export default Comments;
