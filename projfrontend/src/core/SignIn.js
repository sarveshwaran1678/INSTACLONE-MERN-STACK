import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import '../style.css';

import insta from '../Images/insta.png';
const initialValues = {
    email: '',
    password: '',
};

const onSubmit = (values, onSubmit) => {
    console.log('Form data', values);
    onSubmit.resetForm();
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required')
        .matches(
            /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])/,
            'One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
});

const SignIn = () => {
    const [mode, setMode] = useState('password');
    //console.log(mode);
    return (
        <div class='row text-center'>
            <div
                class='col-md-5 col-lg-6 d-none d-md-block d-lg-block text-lg-right'
                style={{
                    marginTop: '5vh',
                }}>
                <img src={insta} />
            </div>
            <div class='col-1 col-md-2 col-lg-1 col-sm-2' />
            <div
                class='col-md-4 col-sm-8 col-lg-4 text-left col-10 text-lg-left'
                style={{
                    borderRadius: '30px',
                    borderRight: '1px solid blue',
                    borderBottom: '1px solid blue',
                    marginTop: '8.5vh',
                    minWidth: '300px',
                    maxWidth: '500px',
                }}>
                <h2 style={{ marginTop: '3vh' }}>InstaClone</h2>
                <h4 style={{ marginTop: '7.5vh', fontWeight: 600 }}>
                    Welcome Back!
                </h4>
                <h6 style={{ marginTop: '1vh', marginBottom: '7.5vh' }}>
                    Log in to your existing account
                </h6>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ errors, touched, values }) => (
                        <Form>
                            <div class='input-group mb-3 '>
                                <div class='input-group-prepend'>
                                    <span class='input-group-text'>
                                        <i class='far fa-envelope text-primary'></i>
                                    </span>
                                </div>

                                <Field
                                    className='form-control'
                                    type='email'
                                    name='email'
                                    placeholder='Enter Your Email'
                                    style={{
                                        backgroundcolor: 'white',
                                    }}
                                />

                                <div class='input-group-append '>
                                    <span class='input-group-text post-text'></span>
                                </div>
                            </div>

                            {/* Password */}

                            <div class='input-group mb-3'>
                                <div class='input-group-prepend'>
                                    <span class='input-group-text'>
                                        <i class='fas fa-lock text-primary'></i>
                                    </span>
                                </div>

                                <Field
                                    className='form-control'
                                    type={mode}
                                    name='password'
                                    placeholder='Enter Your Password'
                                />
                                {
                                    <div class='input-group-append'>
                                        <span class='input-group-text'>
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
                            </div>

                            <h6
                                class='text-right'
                                style={{
                                    marginTop: '3vh',
                                    color: 'blue',
                                }}>
                                Forgot Password?
                            </h6>

                            <button
                                class='signIn '
                                type='submit'
                                style={{
                                    marginTop: '5vh',
                                }}>
                                Login
                                <i class='fas fa-long-arrow-alt-right ml-3 text-right'></i>
                            </button>
                            <h6
                                style={{
                                    marginTop: '10vh',
                                }}>
                                Don't have an account?
                                <span
                                    style={{
                                        color: 'blue',
                                    }}>
                                    Sign Up
                                </span>
                            </h6>
                        </Form>
                    )}
                </Formik>
            </div>
            <div class=' col-lg-1 col-sm-2 col-1 '></div>
        </div>
    );
}

export default SignIn;