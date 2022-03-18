import { useState, useEffect } from 'react';

import Search from '@material-ui/icons/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import SearchList from '@src/components/SearchList';

import api from '../../services/api';
import HomeBox from './style';

const Home = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    api.get('users').then((response) => {
      setUserList(response.data.users);
    });
  }, []);

  const [searchField, setSearchField] = useState('');

  const filteredUsers = userList.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchField.toLowerCase()) ||
      user.email.toLowerCase().includes(searchField.toLowerCase()) ||
      user.job_title.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <HomeBox>
      <Grid sx={{ mb: 2 }} container spacing={2}>
        <Grid item xs={11}>
          <TextField
            type="search"
            label="Pesquisar"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button href="/user" variant="contained">
            Criar
          </Button>
        </Grid>
      </Grid>
      <SearchList filteredUsers={filteredUsers} />
    </HomeBox>
  );
};

export default Home;
