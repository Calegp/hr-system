import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Routes from '..';

describe('Routes', () => {
  test('renders home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByText('Criar')).toBeInTheDocument();
    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument();
  });

  it('renders user page', () => {
    render(
      <MemoryRouter initialEntries={['/user']}>
        <Routes />
      </MemoryRouter>
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Data de Admissão')).toBeInTheDocument();
    expect(screen.getByText('Cargo')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });
});
