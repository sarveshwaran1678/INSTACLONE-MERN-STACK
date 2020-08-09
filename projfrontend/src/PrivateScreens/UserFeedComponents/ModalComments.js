import React, { useState } from 'react';
import post from '../../Images/mayank.jpg';
import ModalReply from './ModalReply';

function ModalComments() {
    const [reply, setReply] = useState(false);
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
                    <span
                        className='ml-2'
                        style={{ color: 'blue' }}
                        onClick={() => setReply(!reply)}>
                        Reply
                    </span>
                    <ModalReply open={reply} />
                    {reply === true ? (
                        <div class='input-group mb-3'>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Add a Reply'
                                style={{ border: '1px solid grey' }}
                            />
                            <div
                                class='input-group-append'
                                style={{ border: 'none' }}>
                                <span
                                    class='input-group-text'
                                    id='basic-addon2'
                                    style={{
                                        border: 'none',
                                        fontWeight: '500',
                                        color: 'blue',
                                    }}
                                    onClick={() => setReply(!reply)}>
                                    Post
                                </span>
                            </div>
                        </div>
                    ) : null}
                </span>
            </div>
        </div>
    );
}

export default ModalComments;
