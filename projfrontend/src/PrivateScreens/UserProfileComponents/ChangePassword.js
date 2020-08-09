import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import * as Yup from 'yup';

import post from '../../Images/mayank.jpg';

const ResetPassword = ({ location }) => {
    const [mode, setMode] = useState('password');
    const [errMsg, setErrMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [didRedirect, setDidRedirect] = useState(false);
    const confirmNewPass = '';
    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
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

    const PasswordValidator = () =>
        toast(
            <div>
                <span
                    style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '500',
                        color: '#a2acba',
                        fontSize: '13px',
                    }}>
                    Password must contain 1 Uppercase, 1 Lowercase,1 Numeric & 1
                    SpecialChar
                </span>
            </div>
        );
    const Notify = () => {
        if (showToast === true) {
            toast(<ShowError />);
        }
    };
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                'One Uppercase, One Lowercase, One Number and One Special Case Character'
            )
            .required('Required'),
        confirmNewPassword: Yup.string()
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                'One Uppercase, One Lowercase, One Number and One Special Case Character'
            )
            .required('Required'),
    });

    const onSubmit = async (values, onSubmit) => {
        let { newPassword, confirmNewPassword } = values;
        let email = location.state.userEmail;
        await confirmNewPass({ newPassword, confirmNewPassword, email })
            .then((res) => {
                setDidRedirect(true);
            })
            .catch((err) => {
                setErrMsg({ ...err }.response.data.msg);
                setShowToast(true);
            });
        onSubmit.resetForm();
    };

    const performRedirect = () => {
        if (didRedirect) {
            return <Redirect to='/signin' />;
        }
    };

    return (
        <div class='row text-center' style={{ minHeight: '66vh' }}>
            <ToastContainer />
            {Notify()}
            <div
                class='col-md-9 text-center mx-auto'
                style={{
                    marginTop: '3.5vh',
                    minWidth: '300px',
                    maxWidth: '400px',
                }}>
                <h4 style={{ fontWeight: '700' }}>Manage Your Password</h4>

                <div className='text-left my-4'>
                    <img
                        src={post}
                        style={{ borderRadius: '50%' }}
                        height={60}
                        width={60}
                    />
                    <span className='ml-2' style={{ fontWeight: '600' }}>
                        Mayank Jain
                    </span>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ errors, values }) => (
                        <Form>
                            <div class='input-group mb-3'>
                                {errors.currentPassword ||
                                !values.currentPassword ? (
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
                                    type={mode}
                                    name='currentPassword'
                                    placeholder='Enter Current Password'
                                />

                                {values.currentPassword.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.currentPassword.length > 0 &&
                                  errors.currentPassword ? (
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
                                <div class='input-group-append'>
                                    <span class='input-group-text border-left-0'>
                                        <i
                                            class='far fa-question-circle'
                                            onClick={() => {
                                                PasswordValidator();
                                            }}></i>
                                    </span>
                                </div>
                            </div>

                            <div class='input-group mb-3'>
                                {errors.newPassword || !values.newPassword ? (
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
                                    type={mode}
                                    name='newPassword'
                                    placeholder='Enter New Password'
                                />

                                {values.newPassword.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.newPassword.length > 0 &&
                                  errors.newPassword ? (
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
                                <div class='input-group-append'>
                                    <span class='input-group-text border-left-0'>
                                        <i
                                            class='far fa-question-circle'
                                            onClick={() => {
                                                PasswordValidator();
                                            }}></i>
                                    </span>
                                </div>
                            </div>

                            <div class='input-group mb-3'>
                                {errors.confirmNewPassword ||
                                !values.confirmNewPassword ? (
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
                                    type={mode}
                                    name='confirmNewPassword'
                                    placeholder='Confirm your Password'
                                />

                                {
                                    <div class='input-group-append'>
                                        <span class='input-group-text border-left-0'>
                                            {mode === 'text' ? (
                                                <i
                                                    class='fas fa-eye-slash '
                                                    onClick={() =>
                                                        setMode(
                                                            mode === 'text'
                                                                ? 'password'
                                                                : 'text'
                                                        )
                                                    }></i>
                                            ) : (
                                                <i
                                                    class='fas fa-eye '
                                                    onClick={() =>
                                                        setMode(
                                                            mode === 'text'
                                                                ? 'password'
                                                                : 'text'
                                                        )
                                                    }></i>
                                            )}
                                        </span>
                                    </div>
                                }
                                <div class='input-group-append'>
                                    <span class='input-group-text border-left-0'>
                                        <i
                                            class='far fa-question-circle'
                                            onClick={() => {
                                                PasswordValidator();
                                            }}></i>
                                    </span>
                                </div>
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
                                    Change Password
                                </button>
                            </div>
                            <Link to='/forgotpassword'>
                                <h6
                                    class='text-center'
                                    style={{
                                        marginTop: '5vh',
                                        color: 'blue',
                                    }}>
                                    Forgot Password?
                                </h6>
                            </Link>
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
};

export default ResetPassword;
