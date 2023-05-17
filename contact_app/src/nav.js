import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import isAuthenticated from "./services/auth";

export default function Nav() {
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath.substring(1))
  }, [])

  function handleLogout() {
    Cookies.remove('refreshToken', { sameSite: 'strict' });
    Cookies.remove('accessToken', { sameSite: 'strict' });
    window.location.href = '/';
  }

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
          <a className={`nav-link ${activePage === '' ? 'active' : ''}`}
              href="/">Home</a>
      </li>
      {isAuthenticated() ? (
        <>
          <li className="nav-item">
              <a className={`nav-link ${activePage === 'contacts' ? 'active' : ''}`}
                  href="/contacts">Contatos</a>
          </li>
          <li className="nav-item">
              <a className={`nav-link ${activePage === 'groups' ? 'active' : ''}`}
                  href="/groups">Grupos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <a className={`nav-link ${activePage === 'login' ? 'active' : ''}`}
                href="/login">Login</a>
          </li>
        </>
      )}
    </ul>
  )
}