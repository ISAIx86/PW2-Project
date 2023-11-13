import React, { useState } from 'react';
import * as CiIco from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#f6f6f6' }}>
        <nav>
          <ul className={sidebar ? 'active' : 'hidden-navbar'} >
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={toggleSidebar}>
                <CiIco.CiMenuBurger />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} onClick={() => { if (sidebar) { toggleSidebar(); } }}>
                    {item.icon}
                    <span className={sidebar ? '' : 'hidden-text'}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>


      </IconContext.Provider>
    </>

  )
}

export default Navbar