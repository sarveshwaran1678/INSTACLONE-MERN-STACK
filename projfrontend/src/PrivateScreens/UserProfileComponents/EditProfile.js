import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as Yup from 'yup';
import post from '../../Images/mayank.jpg';

function EditProfile() {
    const [errMsg, setErrMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [content, setContent] = useState(undefined);
    const confirmNewPass = '';
    const initialValues = {
        username: '',
        fullName: '',
        bio: '',
    };
    const ShowError = () => (
        <div>
            <i className='fas fa-times fa-lg ml-3 mr-3 text-danger'></i>
            <span
                style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#a2acba',
                }}>
                {errMsg}
            </span>
        </div>
    );

    const Notify = () => {
        if (showToast === true) {
            toast(<ShowError />);
        }
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!'),
        fullName: Yup.string().min(5, 'Too Short!').max(25, 'Too Long!'),
        bio: Yup.string().min(5, 'Too Short!').max(101, 'Too Long!'),
    });

    const onSubmit = async (values, onSubmit) => {
        console.log(content);
        onSubmit.resetForm();
    };
    const handleFile = (e) => {
        const cont = e.target.result;
        setContent(e.target.result);
        console.log('file content', content);
    };
    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsDataURL(file);
    };
    return (
        <div class='row text-center' style={{ minHeight: '66vh' }}>
            <ToastContainer />
            {Notify()}

            <div class='col-md-1 d-none d-md-block' />
            <div
                class='col-md-9 text-center col-sm-6 col-12'
                style={{
                    marginTop: '3.5vh',
                    minWidth: '300px',
                    maxWidth: '400px',
                }}>
                <h4 style={{ fontWeight: '700' }}>Manage Your Profile</h4>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <div className='text-left my-4'>
                                {/* <label htmlFor='file'>
                                    <img
                                        src={
                                            content === undefined
                                                ? post
                                                : content
                                        }
                                        style={{ borderRadius: '50%' }}
                                        height={60}
                                        width={60}
                                    />

                                </label>
                                <input
                                    id='file'
                                    name='file'
                                    type='file'
                                    onChange={(event) => {
                                        handleChangeFile(event.target.files[0]);
                                    }}
                                    style={{ display: 'none' }}
                                /> */}
                                <img
                                    src={content === undefined ? post : content}
                                    style={{ borderRadius: '50%' }}
                                    height={60}
                                    width={60}
                                />
                                <span
                                    className='ml-2'
                                    style={{ fontWeight: '500' }}>
                                    Mayank Jain
                                </span>
                            </div>

                            <div class='custom-file mb-3'>
                                <label for='customFile'></label>
                                <input
                                    id='file'
                                    name='file'
                                    type='file'
                                    onChange={(event) => {
                                        handleChangeFile(event.target.files[0]);
                                    }}
                                    className='custom-file-input'
                                />
                                <label
                                    class='custom-file-label'
                                    for='customFile'>
                                    Upload Profile Photo
                                </label>
                            </div>

                            <div class='input-group mb-3'>
                                {errors.username || !values.username ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class='fas fa-user text-primary'></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text  '>
                                            <i class='fas fa-lock-user text-success'></i>
                                        </span>
                                    </div>
                                )}

                                <Field
                                    className='form-control'
                                    type='text'
                                    name='username'
                                    placeholder='Enter New Username'
                                />

                                {values.username.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.username.length > 0 &&
                                  errors.username ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-danger'>
                                            <i class='fas fa-times  '></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-success '>
                                            <i class='fas fa-check'></i>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div class='input-group mb-3'>
                                {errors.fullName || !values.fullName ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class='fas fa-lock text-primary'></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text  '>
                                            <i class='fas fa-lock-open text-success'></i>
                                        </span>
                                    </div>
                                )}

                                <Field
                                    className='form-control'
                                    type='text'
                                    name='fullName'
                                    placeholder='Enter New FullName'
                                />

                                {values.fullName.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.fullName.length > 0 &&
                                  errors.fullName ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-danger'>
                                            <i class='fas fa-times  '></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-success '>
                                            <i class='fas fa-check'></i>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div class='input-group mb-3'>
                                {errors.bio || !values.bio ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class='fas fa-lock text-primary'></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text  '>
                                            <i class='fas fa-lock-open text-success'></i>
                                        </span>
                                    </div>
                                )}

                                <Field
                                    className='form-control'
                                    type='text'
                                    name='bio'
                                    placeholder='Update Your Bio'
                                />
                                {values.bio.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.bio.length > 0 && errors.bio ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-danger'>
                                            <i class='fas fa-times  '></i>
                                        </span>
                                    </div>
                                ) : (
                                    <div class='input-group-append '>
                                        <span class='input-group-text text-success '>
                                            <i class='fas fa-check'></i>
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    textAlign: 'center',
                                }}>
                                <button
                                    class='signIn px-5'
                                    type='submit'
                                    style={{
                                        marginTop: '3vh',
                                        textAlign: 'center',
                                    }}>
                                    Update Profile
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div class='fixed-bottom text-center mb-1'>
                <h6 style={{ color: '#2C3335' }}>
                    <i class='far fa-copyright'></i> 2020 InstaClone Inspired By
                    :
                    <span
                        style={{
                            color: 'purple',
                        }}>
                        Instagram
                    </span>
                </h6>
            </div>
        </div>
    );
}

export default EditProfile;
