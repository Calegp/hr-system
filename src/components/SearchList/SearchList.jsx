import React, { useState, useEffect } from 'react';

import { Clear } from '@material-ui/icons';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material/';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import EmptyState from './style';

const propTypes = {
  filteredUsers: PropTypes.arrayOf(PropTypes.object)
};

const SearchList = ({ filteredUsers }) => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState(filteredUsers);

  useEffect(() => setUsers(filteredUsers), [filteredUsers]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 10 - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteUser = (event, id) => {
    api.delete(`users/${id}`);
    event.stopPropagation();

    setUsers(
      users.filter((user) => {
        return user.id !== id;
      })
    );
  };

  const navigate = useNavigate();

  return users.length > 0 ? (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#c988f7'
            }}
          >
            <TableCell>Nome</TableCell>
            <TableCell align="right">Cargo</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * 10, page * 10 + 10).map((user) => (
            <TableRow
              key={user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: '#dfdfdf'
                },
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.job_title}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => deleteUser(e, user.id)} aria-label="delete">
                  <Clear />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={users.length}
              rowsPerPage={10}
              page={page}
              rowsPerPageOptions={[]}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : (
    <EmptyState>
      <Typography>Nenhum usuário encontrado</Typography>
    </EmptyState>
  );
};

SearchList.propTypes = propTypes;

export default SearchList;
