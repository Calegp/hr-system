import { render, screen } from '@testing-library/react';

import Comments from '..';

test('Comments', () => {
  render(<Comments />);
  expect(screen.getByText('Digite um comentário')).toBeInTheDocument();
  expect(screen.getByText('Enviar')).toBeInTheDocument();
});
