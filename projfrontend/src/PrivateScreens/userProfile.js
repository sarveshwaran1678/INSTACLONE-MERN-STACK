import React, { useState } from 'react';

import post from '../Images/mayank.jpg';
import Navbar from '../AuthScreens/Navbar';
import UserInfo from './UserProfileComponents/UserInfo';
import UserPosts from './UserProfileComponents/UserPosts';
import UserInfoPhone from './UserProfileComponents/UserInfoPhone';
import UploadStoryModal from './UserProfileComponents/UploadStoryModal';

function UserProfile() {
    const [story, setStory] = useState(undefined);
    const reset = () => {
        setStory(undefined);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(story);
    };
    const handleFile = (e) => {
        setStory(e.target.result);
    };
    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsDataURL(file);
    };
    return (
        <div>
            <Navbar />
            <div class='container my-5'>
                <div className='d-none d-md-block'>
                    <div class='row mb-3'>
                        <div class='col-md-1'></div>
                        <div class='col-md-3'>
                            <img
                                className='profile align-items-center'
                                src={post}
                                style={{
                                    borderRadius: '50% ',
                                    height: '140px',
                                    width: '140px',
                                }}
                            />
                        </div>
                        <div className='col-md-6'>
                            <UserInfo />
                        </div>
                    </div>
                </div>
                {/* Phone */}
                <div class='row d-md-none'>
                    <div className='col-8'>
                        <UserInfoPhone />
                    </div>
                    <div class='col-2 mt-2'>
                        <img
                            className='profile align-items-center'
                            src={post}
                            style={{
                                borderRadius: '50% ',
                                height: '100px',
                                width: '100px',
                            }}
                        />
                    </div>
                </div>

                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none'>
                    <div
                        class=' bd-highlight mr-3'
                        style={{ fontWeight: '500' }}>
                        1000 followers
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        210 following
                    </div>
                </div>
                <div className='d-md-none text-left'>
                    <button type='button' class='btn btn-primary px-5'>
                        Follow
                    </button>
                </div>

                {/* Story */}
                <div
                    className='container d-flex flex-row bd-highlight  justify-content-start align-items-center'
                    style={{
                        scrollBehavior: 'smooth',
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                    }}>
                    <div className='justify-content-center align-items-center'>
                        <label htmlFor='file'>
                            <div
                                className='d-flex text-center align-items-center justify-content-center align-middle mr-3 mt-3'
                                style={{
                                    borderRadius: '50% ',
                                    height: '70px',
                                    width: '70px',
                                    background: '#DAE0E2',
                                }}>
                                <i
                                    class='fas fa-plus fa-lg'
                                    style={{ color: '#45CE30' }}></i>
                            </div>
                        </label>
                        <input
                            id='file'
                            name='file'
                            type='file'
                            data-toggle='modal'
                            data-target='#uploadStory'
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
                    <div className='justify-content-center align-items-center'>
                        <figure className='text-center'>
                            <img
                                className='profile mt-3 mx-3'
                                src={post}
                                style={{
                                    borderRadius: '50% ',
                                    height: '70px',
                                    width: '70px',
                                }}
                            />
                        </figure>
                    </div>
                    <div className='justify-content-center align-items-center'>
                        <figure className='text-center'>
                            <img
                                className='profile mt-3 mx-3'
                                src={post}
                                style={{
                                    borderRadius: '50% ',
                                    height: '70px',
                                    width: '70px',
                                }}
                            />
                        </figure>
                    </div>
                    <div className='justify-content-center align-items-center'>
                        <figure className='text-center'>
                            <img
                                className='profile mt-3 mx-3'
                                src={post}
                                style={{
                                    borderRadius: '50% ',
                                    height: '70px',
                                    width: '70px',
                                }}
                            />
                        </figure>
                    </div>
                    <div className='justify-content-center align-items-center'>
                        <figure className='text-center'>
                            <img
                                className='profile mt-3 mx-3'
                                src={post}
                                style={{
                                    borderRadius: '50% ',
                                    height: '70px',
                                    width: '70px',
                                }}
                            />
                        </figure>
                    </div>
                </div>

                <hr
                    className='mt-0'
                    style={{ borderTop: '1.75px solid rgba(0,0,0,.1)' }}
                />

                <UserPosts />
            </div>
            <div
                class='modal fade bd-example-modal-lg '
                id='uploadStory'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
                style={{ overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                    }}>
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
                        {story !== undefined ? (
                            <div class='modal-body p-0'>
                                <UploadStoryModal
                                    src={story}
                                    handleSubmit={handleSubmit}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
