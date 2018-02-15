import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default ({ logout, isAuthenticated }) => {
  return(
      <div key="user">
      {isAuthenticated ? (
        <div>
          <NavLink key="places" to="/places">Точки збору</NavLink>
          <NavLink key="requests" to="/requests">Запити</NavLink>
          <NavLink key="reports" to="/reports">Повідомлення про неточності</NavLink>
          <a onClick={logout}>
            <img className="user-navProfileImage" src="http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png" alt="User profile image" />
            <span className="user-navLogout">Вийти</span>
          </a>
        </div>
      ) : (
        <NavLink key="login" to="/login">Увійти</NavLink>
      )}
      </div>
  )
};
