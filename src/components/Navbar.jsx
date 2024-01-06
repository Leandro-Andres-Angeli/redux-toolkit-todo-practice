import React from 'react';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import colors from '../utils/UI/colors';
import Products from '../pages/Products';

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
        <li>
          <NavLink activeStyle={{ color: colors.fuchsia }} to='/products'>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: colors.fuchsia }} to='/todos'>
            Todos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
