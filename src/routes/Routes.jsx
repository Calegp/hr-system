import { Route, Routes as Switch } from 'react-router-dom';

import Home from '../pages/Home';
import UserInfo from '../pages/UserInfo';

const Routes = () => (
  <Switch>
    <Route path="/" exact element={<Home />} />
    <Route path="/user" element={<UserInfo />} />
    <Route path="/user/:id" element={<UserInfo />} />
  </Switch>
);

export default Routes;
