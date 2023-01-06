import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <NavLink to="/">
        <FaHome size={24} />
      </NavLink>
      <NavLink to="/register">
        <FaUserAlt size={24} />
      </NavLink>
      <NavLink to="/login">
        <FaSignInAlt size={24} />
      </NavLink>
    </Nav>
  );
}
