import React from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:2000/login',
        {admin: {email, password}},
        {withCredentials: true})
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
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
