import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../UIElements/Backdrop'
import MainHeader from './MainHeader'

import './MainNavigation.css'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'

function MainNavigation(props) {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);


    const openDrawerHandler = useCallback(() => {
        setDrawerIsOpen(true);
    }, []);

    const closeDrawerHandler = useCallback(() => {
        setDrawerIsOpen(false);
    }, []);



    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation
