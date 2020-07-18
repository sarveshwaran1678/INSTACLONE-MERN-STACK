import React, { Component } from 'react';
import post from '../../Images/mayankPost.jpg';
import user from '../../Images/sarvesh.jpg';
import ModalComments from './ModalComments';
import { Image, Transformation } from 'cloudinary-react';

function Modal() {
    return (
        <div>
            <div className='row '>
                <div className='col-md-7 col-lg-7 col-xl-7 col-sm-12'>
                    <Image
                        cloudName='gonfreak'
                        publicId='https://res.cloudinary.com/gonfreak/image/fetch/https://res.cloudinary.com/gonfreak/image/upload/v1594631508/InstaClone/36b6cd4b-0d49-48d8-9bb7-f3aa3c95bdbf.jpg'
                        type='fetch'>
                        <Transformation
                            width='430'
                            height='400'
                            gravity='face'
                            crop='fill'
                            fetchFormat='auto'
                        />
                    </Image>
                    <div style={{ marginTop: '38px' }}>
                        Naruto Uzumaki...........
                    </div>
                </div>
                <div className='col-md-5 col-lg-5 col-xl-5 col-sm-12'>
                    <div class='text-right'>
                        <i
                            class='fas fa-times fa-lg mr-4 '
                            data-dismiss='modal'
                        />
                    </div>

                    <img
                        src={user}
                        style={{ borderRadius: '50%' }}
                        height={50}
                        width={50}
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
