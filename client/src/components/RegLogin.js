import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const RegLogin = () => {

  const history = useHistory();

  const [userCred, setUserCred] = useState({
    username: '',
    password: '',
    department: ''
  });

  const regHandler = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/auth/register', userCred)
      .then(res => {
        window.localStorage.setItem('userID', res.data.id);
        window.localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
        console.log('Data after login: ', res);
      })
      .catch(err => console.log(err));
  };

  const handleChanges = e => {
    setUserCred({
      ...userCred,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <form onSubmit={regHandler}>
        <label htmlFor="user">User</label>
        <input
          id="user"
          type="text"
          name="username"
          onChange={handleChanges}
          value={userCred.username}
        />
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="text"
          name="password"
          onChange={handleChanges}
          value={userCred.password}
        />
        <label htmlFor="department">Dept</label>
        <input
          id="department"
          type="text"
          name="department"
          onChange={handleChanges}
          value={userCred.department}
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default RegLogin;
