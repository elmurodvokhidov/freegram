import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <h1>Logo</h1>
            <NavLink to={'/register'}>Register</NavLink> <br /> <br />
            <NavLink to={'/login'}>Login</NavLink> <br /> <br />
            <NavLink to={'/google'}>Login with Google</NavLink>
        </>
    );
}

export default Navbar;