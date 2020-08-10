import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import post from '../../Images/mayank.jpg';
import UploadStoryModal from './UploadStoryModal';

export default function UserStories() {
    const [story, setStory] = useState(undefined);
    const LargeFile = () => (
        <div>
            <span
                style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#a2acba',
                }}>
                File Size Should Be Less Than 5Mb!
            </span>
            <i className='fas fa-times ml-3 text-success'></i>
        </div>
    );
    const reset = () => {
        setStory(undefined);
    };
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(story);
    //   };
    const handleFile = (e) => {
        setStory(e.target.result);
    };
    const handleChangeFile = (file) => {
        if (file.size > 5000000) {
            toast(<LargeFile />);
        } else {
            let fileData = new FileReader();
            fileData.onloadend = handleFile;
            fileData.readAsDataURL(file);
        }
    };

    return (
        <React.Fragment>
            <ToastContainer />
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
                                <UploadStoryModal src={story} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
