import React, { Component } from 'react';
import post from '../../Images/mayank.jpg';

function UserStories() {
    return (
        <div
            className='row ml-2 mb-3 '
            style={{ overflowY: 'visible', fontWeight: '500' }}>
            <div className='col-3 text-right' style={{ paddingRight: '0' }}>
                <img src={post} style={{ borderRadius: '50%' }} height={50} />
            </div>
            <div className='col-7 text-left '>
                <span>Naruto Uzumaki</span>
                <br />
                <span>36,541 followers</span>
            </div>
        </div>
    );
}

export default UserStories;
