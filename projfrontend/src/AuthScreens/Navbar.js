import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { signout, isAuthenticated } from './APICalls/signCalls';
import UploadPicModal from './UploadPicModal';

function Navbar() {
    const id = isAuthenticated().user._id;

    var show = false;
    const [content, setContent] = useState(undefined);
    const [next, setNext] = useState(false);

    const ShowUpload = () => (
        <div>
            <i className='fas fa-times fa-lg ml-3 mr-3 text-danger'></i>
            <span
                style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#a2acba',
                }}>
                Uploaded Successfully
            </span>
        </div>
    );
    const handleNext = () => {
        setNext(!next);
    };
    const reset = () => {
        setContent(undefined);
        setNext(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        toast(<ShowUpload />);
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
        <div>
            <ToastContainer />
            <div
                style={{
                    borderBottom: '1px solid black',
                    borderRadius: '5px',
                    background: 'white',
                }}
                className='fixed-top '>
                <div class='container ' style={{ paddingRight: '0' }}>
                    <nav class='navbar navbar-expand-lg mx-auto '>
                        <span class='navbar-brand'>
                            <Link
                                to='/userfeed'
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                }}>
                                <i class='fab fa-instagram fa-lg mr-2 d-md-inline text-dark'></i>
                            </Link>

                            <Link to='/userfeed'>
                                <span
                                    style={{ fontWeight: '500' }}
                                    class='d-md-inline-block d-lg-inline-block text-dark'>
                                    InstaClone
                                </span>
                            </Link>
                        </span>
                        <ul class='navbar-nav mx-auto'>
                            <li class='nav-item active '>
                                <form class='form-inline  my-lg-0 d-none d-md-inline-block'>
                                    <input
                                        class='form-control mr-sm-2'
                                        type='search'
                                        placeholder='Search'
                                        aria-label='Search'
                                        style={{
                                            border: '1px solid black',
                                            borderRadius: '5px',
                                            width: '200px',
                                        }}
                                    />
                                </form>
                            </li>
                        </ul>
                        <span>
                            <i class='far fa-compass fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            <i class='far fa-heart fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            <Link
                                to={`/profile/${id}`}
                                style={{ color: 'black' }}>
                                <i class='far fa-user-circle fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            </Link>
                            <label htmlFor='file1'>
                                <i class='fas fa-camera-retro fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
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

                            <Link to='/' style={{ color: 'black' }}>
                                <i
                                    class='far fas fa-door-open fa-lg d-md-none mr-1'
                                    onClick={() =>
                                        signout(() => {
                                            console.log(
                                                'Signed out Successfully'
                                            );
                                        })
                                    }></i>
                            </Link>
                        </span>
                    </nav>
                </div>
            </div>
            {/* MobileNavbar */}
            <div class='fixed-bottom d-md-none '>
                <div
                    class='d-flex justify-content-around fixed-bottom d-md-none p-3 mb-0'
                    style={{ background: 'white' }}>
                    <div>
                        <Link
                            to='/userfeed'
                            style={{ color: 'black', textDecoration: 'none' }}>
                            <i
                                class='fas fa-home fa-lg'
                                style={{ color: '#262626' }}></i>
                        </Link>
                    </div>
                    <div>
                        <i
                            class='fab fa-sistrix fa-lg'
                            style={{ color: '#262626' }}></i>
                    </div>
                    <div>
                        <label htmlFor='file1'>
                            <i
                                class='fas fa-plus fa-lg'
                                style={{ color: '#262626' }}></i>
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
                                setContent(event.target.value.files[0]);
                                handleChangeFile(event.target.files[0]);
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div>
                        <i
                            class='far fa-heart fa-lg'
                            style={{ color: '#262626' }}></i>
                    </div>

                    <div>
                        <Link to={`/profile/${id}`} style={{ color: 'black' }}>
                            <i
                                class='far fa-user-circle fa-lg'
                                style={{ color: '#262626' }}></i>
                        </Link>
                    </div>
                </div>
            </div>
            {/* MobileNavbar Closed */}

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

export default Navbar;
