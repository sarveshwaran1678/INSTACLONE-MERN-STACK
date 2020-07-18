import React, { Component } from 'react';
import post from '../Images/mayank.jpg';
import UserStories from './UserStories';
import ModalComments from './ModalComments';

function Modal() {
    return (
        <div>
            <div className='row '>
                <div className='col-7'>
                    <img
                        class='card-img-top'
                        src={post}
                        alt='Card image cap'
                        style={{ width: '100%' }}
                    />
                    <div style={{ marginTop: '38px' }}>
                        Naruto Uzumaki...........
                    </div>
                </div>
                <div className='col-5'>
                    <div class='text-right'>
                        <i
                            class='fas fa-times fa-lg mr-4 '
                            data-dismiss='modal'
                        />
                    </div>

                    <img
                        src={post}
                        style={{ borderRadius: '50%' }}
                        height={50}
                    />

                    <span style={{ fontWeight: '500' }}> Sasuke Uchiha</span>
                    <hr />
                    <div
                        className='Comments mt-2'
                        style={{
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            borderRadius: '10px',
                            height: '30vh',
                        }}>
                        <ModalComments />
                        <ModalComments />
                        <ModalComments />
                    </div>
                    <hr />
                    <i
                        class='far fa-thumbs-up fa-lg mr-4'
                        style={{
                            color: 'blue',
                        }}></i>
                    <i
                        class='far fa-comment fa-lg'
                        style={{
                            color: '#28a745',
                        }}></i>
                    <p class='card-text'>1,234 likes</p>
                    <div class='input-group mb-3'>
                        <input
                            type='text'
                            class='form-control'
                            placeholder='Add a Comment'
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
                                }}>
                                Post
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
