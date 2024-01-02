import React from 'react';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import colors from '../utils/UI/colors';

const Navbar = () => {
  return (
    <nav className='ph4 pv2'>
      <ul>
        <li>
          {
            <Link to='/'>
              <strong>Redux Devtoolkit practice</strong>
            </Link>
          }
        </li>
      </ul>
      <ul>
        <li>
          <NavLink activeStyle={{ color: colors.fuchsia }} exact to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: colors.fuchsia }} to='/counter'>
            Counter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
