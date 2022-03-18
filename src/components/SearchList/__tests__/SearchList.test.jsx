import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SearchList from '..';

test('CommentsList', () => {
  const filteredUsers = [
    {
      id: 1,
      email: 'analist@user.com',
      job_title: 'Analist',
      name: 'Ana Silva'
    },
    {
      id: 2,
      email: 'intern@user.com',
      job_title: 'Intern',
      name: 'José Souza'
    }
  ];
  render(
    <Router basename="/">
      <Routes>
        <Route path="*" element={<SearchList filteredUsers={filteredUsers} />} />
      </Routes>
    </Router>
  );
  expect(screen.getByText('Ana Silva')).toBeInTheDocument();
  expect(screen.getByText('Analist')).toBeInTheDocument();
  expect(screen.getByText('analist@user.com')).toBeInTheDocument();
  expect(screen.getByText('José Souza')).toBeInTheDocument();
  expect(screen.getByText('Intern')).toBeInTheDocument();
  expect(screen.getByText('intern@user.com')).toBeInTheDocument();
});
