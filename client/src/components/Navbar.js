import React, { useState } from 'react';
import * as CiIco from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

function Navbar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const filteredSidebarData = SidebarData.filter(
        (item) => !item.requiresAuth || (item.requiresAuth && isLoggedIn)
    );

    return (

        <>
            <IconContext.Provider value={{ color: '#f6f6f6' }}>
                
                <nav>
                    
                    <ul className={sidebar ? 'active' : 'hidden-navbar'} onClick={showSidebar}>
                        
                        <li className='navbar-toggle'>
                            
                            <Link to='#' className='menu-bars'>
                                <CiIco.CiMenuBurger onClick={showSidebar} />
                            </Link>

                        </li>

                        {SidebarData.map((item, index) => {

                            return (

                                <li key={index} className={item.cName}>

                                <Link to={item.path}>
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