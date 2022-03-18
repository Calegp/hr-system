import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserInfo from '..';

test('UserInfo', () => {
  render(
    <Router basename="/">
      <Routes>
        <Route path="*" element={<UserInfo />} />
      </Routes>
    </Router>
  );

  expect(screen.getByText('Nome')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Data de Admissão')).toBeInTheDocument();
  expect(screen.getByText('Cargo')).toBeInTheDocument();
  expect(screen.getByText('Salvar')).toBeInTheDocument();
});
