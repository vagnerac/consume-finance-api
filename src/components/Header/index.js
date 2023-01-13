import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.logoutRequest());
    history.push('/');
  };

  return (
    <Nav>
      <NavLink to="/">
        <FaHome size={24} />
      </NavLink>
      <NavLink to="/register">
        <FaUserAlt size={24} />
      </NavLink>
      {isLoggedIn ? (
        <NavLink onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </NavLink>
      ) : (
        <NavLink to="/login">
          <FaSignInAlt size={24} />
        </NavLink>
      )}

      {isLoggedIn && <FaCircle size={20} color="#9fff80" />}
    </Nav>
  );
}
