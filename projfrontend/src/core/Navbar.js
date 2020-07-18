import React from 'react';

import logo from '../Images/cascade.jpg';
import styled from 'styled-components';

function Navbar() {
    return (
        <div style={{ borderBottom: '1px solid black', borderRadius: '5px' }}>
            <div class='container ' style={{ paddingRight: '0' }}>
                <nav class='navbar navbar-expand-lg '>
                    <span class='navbar-brand' href='#'>
                        <i class='fab fa-instagram fa-lg mr-2 '> </i>
                        <span
                            style={{ fontWeight: '500' }}
                            class='d-none d-md-inline-block d-lg-inline-block'>
                            InstaClone
                        </span>
                    </span>
                    <ul class='navbar-nav ml-auto'>
                        <li class='nav-item active '>
                            <form class='form-inline  my-lg-0'>
                                <input
                                    class='form-control mr-sm-2'
                                    type='search'
                                    placeholder='Search'
                                    aria-label='Search'
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px',
                                        width: '200px',
                                    }}
                                />
                            </form>
                        </li>
                    </ul>
                    <span>
                        <i class='far fa-bell fa-lg ml-2 mr-3'></i>
                        <i class='fas fa-user-astronaut fa-lg'></i>
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
