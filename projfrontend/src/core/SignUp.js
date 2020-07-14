import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import '../style.css';

import insta from '../Images/insta.png';
const initialValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
};

const onSubmit = (values, onSubmit) => {
    console.log('Form data', values);
    onSubmit.resetForm();
};

const validationSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(3, "Should be of min 3 characters")
        .max(32, 'Should have max of 32 characters'),
    username: Yup.string()
        .min(5, 'Should have min of 5 characters')
        .max(20, 'Should have max of 20 characters'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
});

const SignUp = () => {

    const [mode, setMode] = useState('password');
    return (

        <div class='row'>
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
                    Let's Get Started!
                    </h4>
                <h6 style={{ marginTop: '1vh', marginBottom: '7.5vh' }}>
                    Create a new Account !!
                    </h6>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ errors, touched, values }) => (
                        <Form>
                            {/*Username*/}
                            <div class='input-group mb-3 '>
                                {errors.username || !values.username ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class="fas fa-user-tag text-primary"></i>
                                        </span>
                                    </div>
                                ) : (
                                        <div class='input-group-prepend'>
                                            <span class='input-group-text text-success '>
                                                <i class='fas fa-user-tag text-success'></i>
                                            </span>
                                        </div>
                                    )}

                                <Field
                                    className='form-control'
                                    type='text'
                                    name='username'
                                    placeholder='Enter Your Username'
                                    style={{
                                        backgroundcolor: 'white',
                                    }}
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
                            {/*FullName*/}
                            <div class='input-group mb-3 '>
                                {errors.fullname || !values.fullname ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class="far fa-user text-primary"></i>
                                        </span>
                                    </div>
                                ) : (
                                        <div class='input-group-prepend'>
                                            <span class='input-group-text text-success '>
                                                <i class='far fa-user text-success'></i>
                                            </span>
                                        </div>
                                    )}

                                <Field
                                    className='form-control'
                                    type='text'
                                    name='fullname'
                                    placeholder='Enter Your fullname'
                                    style={{
                                        backgroundcolor: 'white',
                                    }}
                                />

                                {values.fullname.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text '></span>
                                    </div>
                                ) : values.fullname.length > 0 &&
                                    errors.fullname ? (
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
                            {/*Email*/}

                            <div class='input-group mb-3 '>
                                {errors.email || !values.email ? (
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class='far fa-envelope text-primary'></i>
                                        </span>
                                    </div>
                                ) : (
                                        <div class='input-group-prepend'>
                                            <span class='input-group-text text-success '>
                                                <i class='far fa-envelope-open text-success'></i>
                                            </span>
                                        </div>
                                    )}

                                <Field
                                    className='form-control'
                                    type='email'
                                    name='email'
                                    placeholder='Enter Your Email'
                                    style={{
                                        backgroundcolor: 'white',
                                    }}
                                />

                                {values.email.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.email.length > 0 &&
                                    errors.email ? (
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

                            {/* Password */}

                            <div class='input-group mb-3'>
                                {errors.password || !values.password ? (
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
                                    name='password'
                                    placeholder='Enter Your Password'
                                />
                                {values.password.length === 0 ? (
                                    <div class='input-group-append '>
                                        <span class='input-group-text'></span>
                                    </div>
                                ) : values.password.length > 0 &&
                                    errors.password ? (
                                            <div class='input-group-append '>
                                                <span class='input-group-text '>
                                                    <i class='fas fa-times text-danger '></i>
                                                </span>
                                            </div>
                                        ) : (
                                            <div class='input-group-append'>
                                                <span class='input-group-text '>
                                                    <i class='fas fa-check text-success '></i>
                                                </span>
                                            </div>
                                        )}

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

                            <button
                                class='signIn '
                                type='submit'
                                style={{
                                    marginTop: '5vh',
                                }}>
                                Create Account
                                    <i class='fas fa-long-arrow-alt-right ml-3 text-right'></i>
                            </button>
                            <h6
                                style={{
                                    marginTop: '10vh',
                                }}>
                                Already have an account?
                                    <span
                                    style={{
                                        color: 'blue',
                                    }}>
                                    Sign In
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

export default SignUp;
