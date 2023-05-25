import React, { useState } from "react";
import api from "./services/api";
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('token/', {
        username,
        password,
      })
      if (res.status === 200) {
        const { refresh, access } = res.data;
        Cookies.set('refreshToken', refresh, {
          expires: 1,
          sameSite: 'none',
          secure: true,
        })
        Cookies.set('accessToken', refresh, {
          expires: 1,
          sameSite: 'none',
          secure: true,
        })
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating md-2">
              <input type="text" className="form-control" placeholder="Entre com o username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <label>Username</label>
            </div>
            <div className="form-floating md-2">
              <input type="password" className="form-control" placeholder="Entre com a senha"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
