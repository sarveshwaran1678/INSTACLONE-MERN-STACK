import React, { Component } from 'react';
import Navbar from '../../core/Navbar';
import UserStoriesPhone from './UserStoriesPhone';
import UserStories from './UserStories';
import Card from './Card';

function UserFeed() {
    return (
        <div>
            <Navbar />
            <UserStoriesPhone />
            <div className='row' style={{ margin: '0 0' }}>
                <div className='col-md-1 col-lg-2 col-xl-2' />
                <div
                    className='col-md-6 col-lg-5 col-xl-5'
                    style={{ paddingRight: '0', paddingLeft: '0' }}>
                    <Card />
                </div>
                <div
                    className='col-lg-4 col-md-5 col-xl-4 d-lg-block d-md-block d-none'
                    style={{ maxWidth: '350px' }}>
                    <div className='User' style={{ marginTop: '5vh' }}>
                        <UserStories />
                    </div>

                    <div
                        className='Stories mt-5'
                        style={{
                            height: '50vh',
                            border: '1px solid black',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            borderRadius: '10px',
                        }}>
                        <span className='m-4' style={{ fontWeight: '500' }}>
                            STORIES
                        </span>
                        <UserStories />
                        <UserStories />
                        <UserStories />
                        <UserStories />
                        <UserStories />
                        <UserStories />
                        <UserStories />
                    </div>
                </div>
                <div className='col-lg-2' />
            </div>
        </div>
    );
}

export default UserFeed;
