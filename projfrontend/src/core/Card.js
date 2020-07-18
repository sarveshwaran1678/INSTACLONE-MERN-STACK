import React, { Component } from 'react';
import post from '../Images/mayank.jpg';
import { Fragment } from 'react';
import Modal from './Modal';
function Card() {
    return (
        <div style={{ fontWeight: '500' }}>
            <div class='card'>
                <img
                    class='card-img-top'
                    src={post}
                    alt='Card image cap'
                    style={{ width: '100%' }}
                />
                <div class='card-body'>
                    <h5 class='card-title'>
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
                    </h5>

                    <p class='card-text'>1,234 likes</p>
                    <p class='card-text'>Naruto .....</p>
                    <p
                        class='card-text'
                        data-toggle='modal'
                        data-target='#exampleModal'>
                        View all 6 comments
                    </p>

                    {/* Modal */}
                    <div
                        class='modal fade bd-example-modal-lg '
                        id='exampleModal'
                        tabindex='-1'
                        role='dialog'
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'>
                        <div
                            class='modal-dialog modal-lg'
                            role='document'
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                            }}>
                            <div class='modal-content '>
                                <div class='modal-body d-md-block d-lg-block d-xl-block d-none'>
                                    <Modal className='' />
                                </div>
                                <div class='modal-body d-md-none d-lg-none d-xl-none '>
                                    <Modal className='' />
                                </div>
                            </div>
                        </div>
                    </div>
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

export default Card;
