import React from 'react';
import {authLogin} from '../../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin({admin: {email, password}}));
  };

  return (
    <div className="admin-content-wrapper">
      <form onSubmit={handleSubmit}>
        <label
          className="form-label"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onChange={handleEmail}
          value={email}
          className="form-control"
          type="text"
          id="email"
        />
        <label
          className="form-label"htmlFor="password"
        >
          Contraseña
        </label>
        <input
          onChange={handlePassword}
          value={password}
          className="form-control"type="password"
          id="password"
        />

        <input
          className="btn
          btn-primary"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
