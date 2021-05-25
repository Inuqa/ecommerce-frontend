import React from 'react';
import {useSelector} from 'react-redux';
import {
  Redirect,
  Route,
} from 'react-router-dom';
const PrivateRoute = ({children, ...rest}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({location}) =>
      auth.loggedIn ? (
      children
      ) : (
      <Redirect to={
        {pathname: '/admin/login',
          state: {from: location},
        }}
      />)}
    />
  );
};

export default PrivateRoute;