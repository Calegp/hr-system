import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '..';

describe('When Home is loaded', () => {
  it('should show the page with the default values', () => {
    render(
      <Router basename="/">
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    );
    expect(screen.getByText('Criar')).toBeInTheDocument();
  });
});
