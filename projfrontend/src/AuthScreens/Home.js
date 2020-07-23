import React from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            Home Screen
            <Redirect to="/userFeed" />
        </div>
    )
}

export default Home