import { render, screen } from '@testing-library/react';

import CommentsList from '..';

test('CommentsList', () => {
  const comments = [
    {
      id: 1,
      value: 'Comentario teste'
    },
    {
      id: 2,
      value: 'Segundo Comentario teste'
    }
  ];
  render(<CommentsList comments={comments} />);
  expect(screen.getByText('Comentario teste')).toBeInTheDocument();
  expect(screen.getByText('Segundo Comentario teste')).toBeInTheDocument();
});
