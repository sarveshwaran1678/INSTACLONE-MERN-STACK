import React, { Component } from 'react';
import post from '../../Images/mayank.jpg';

function ModalReply({ open }) {
    return (
        <div>
            {open === true ? (
                <div
                    className='row mb-3 '
                    style={{ overflowY: 'visible', fontWeight: '500' }}>
                    <div
                        className='col-2 text-left'
                        style={{ paddingRight: '0' }}>
                        <img
                            src={post}
                            style={{ borderRadius: '50%' }}
                            height={50}
                        />
                    </div>
                    <div className='col-9 text-left ml-3 mt-2'>
                        <span>yeah launde</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ModalReply;
