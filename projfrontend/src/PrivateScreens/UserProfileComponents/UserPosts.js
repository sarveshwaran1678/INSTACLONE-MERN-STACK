import React, { useState } from 'react';
//import post from "../../Images/mayank.jpg";

import { Image, Transformation, Placeholder } from 'cloudinary-react';

import '../../userfeed.css';
import Modal from '../UserFeedComponents/Modal';
import UploadPicModal from '../../AuthScreens/UploadPicModal';
import ProfilePostModal from './ProfilePostModal';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserPosts({ posts, myOwnPage }) {
    const [content, setContent] = useState(undefined);
    const [next, setNext] = useState(false);
    const handleNext = () => {
        setNext(!next);
    };
    const reset = () => {
        setContent(undefined);
        setNext(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleFile = (e) => {
        setContent(e.target.result);
    };
    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadstart = () => {
            return;
        };
        fileData.onloadend = handleFile;
        fileData.readAsDataURL(file);
    };

    return (
        <div className='container mx-auto'>
            <div className='text-center'>
                <i class='fas fa-th fa-lg mr-2'></i>
                <span style={{ fontWeight: '500' }}>POST'S</span>
            </div>
            <hr
                className='mt-2'
                style={{ borderTop: '1px solid rgba(0,0,0,.1)' }}
            />
            {posts.length !== 0 ? (
                <div className='row mt-4'>
                    {posts.map((post) => (
                        <React.Fragment>
                            <div className='col-6 col-md-4 mb-3'>
                                <Image
                                    className='m-2  w-100'
                                    cloudName={CloudName}
                                    loading='lazy'
                                    publicId={post.picturePath}
                                    style={
                                        `${post.filter}` === 'sepia'
                                            ? { filter: 'sepia(1)' }
                                            : `${post.filter}` === 'grayscale'
                                            ? { filter: 'grayscale(1)' }
                                            : `${post.filter}` === 'saturate'
                                            ? { filter: 'saturate(2)' }
                                            : `${post.filter}` === 'blue'
                                            ? {
                                                  filter:
                                                      'contrast(0.7) saturate(1.5)',
                                              }
                                            : `${post.filter}` === 'x'
                                            ? {
                                                  filter:
                                                      'saturate(1.6) hue-rotate(15deg)',
                                              }
                                            : `${post.filter}` === 'y'
                                            ? { filter: 'hue-rotate(-20deg)' }
                                            : {}
                                    }
                                    data-toggle='modal'
                                    data-target={`#exampleModal${post._id}`}>
                                    <Transformation
                                        gravity='auto'
                                        crop='fill'
                                        flags={['preserve_transparency']}
                                    />
                                    <Placeholder type='pixelate' />
                                </Image>
                            </div>

                            <div
                                class='modal fade bd-example-modal-lg '
                                id={`exampleModal${post._id}`}
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
                                        <div class='modal-body '>
                                            <Modal
                                                className=''
                                                myOwnPage={myOwnPage}
                                                post={post}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div className='mx-auto text-center mt-4 mb-5'>
                    <i class='fas fa-camera-retro fa-4x ml-2 mr-3  mb-2'></i>

                    <h3 className='mb-3'>Share Photos</h3>
                    <h5 className='mb-5'>
                        Share photos with your friends & family !
                    </h5>
                    <label htmlFor='file1'>
                        <h6
                            className='text-primary'
                            style={{ cursor: 'pointer' }}>
                            Share your first photo
                        </h6>
                    </label>
                    <input
                        id='file1'
                        name='file'
                        type='file'
                        data-toggle='modal'
                        data-target='#upload'
                        accept='image/*'
                        onClick={(event) => {
                            reset();
                            event.target.value = '';
                        }}
                        onChange={(event) => {
                            handleChangeFile(event.target.files[0]);
                        }}
                        style={{ display: 'none' }}
                    />
                </div>
            )}
            {/* Modal */}

            <div
                class='modal fade bd-example-modal-lg '
                id='upload'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
                style={{ overflow: 'hidden' }}>
                <div
                    class='text-right m-2'
                    style={{ position: 'absolute', right: '0' }}>
                    <i
                        class='fas fa-times fa-lg'
                        data-dismiss='modal'
                        style={{ color: 'white' }}
                    />
                </div>
                <div
                    class='modal-dialog modal-lg modal-dialog-centered '
                    role='document'
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                    }}>
                    <div
                        class='modal-content '
                        style={{ border: 'none', borderRadius: '0' }}>
                        {content !== undefined ? (
                            <div class='modal-body p-0'>
                                <UploadPicModal
                                    src1={content}
                                    handleSubmit={handleSubmit}
                                    handleNext={handleNext}
                                    next={next}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* ModalClosed */}
        </div>
    );
}

export default UserPosts;
