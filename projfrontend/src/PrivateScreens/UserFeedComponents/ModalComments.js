import React, { Component } from 'react';
import post from '../../Images/mayank.jpg';

function ModalComments() {
    return (
        <div
            className='row mb-3 '
            style={{ overflowY: 'visible', fontWeight: '500' }}>
            <div className='col-2 text-left' style={{ paddingRight: '0' }}>
                <img src={post} style={{ borderRadius: '50%' }} height={50} />
            </div>
            <div className='col-9 text-left ml-1'>
                <span>Naruto Uzumaki weds Hinata Hyuga</span>
                <br />
                <span style={{ color: '#28a745' }}>
                    34 min{' '}
                    <span className='ml-2' style={{ color: 'blue' }}>
                        Reply
                    </span>
                </span>
            </div>
        </div>
    );
}

export default ModalComments;
