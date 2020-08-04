import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { withRouter, Link, Redirect, useHistory } from 'react-router-dom';
import '../style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import insta from '../Images/insta.gif';
import { signUp } from './APICalls/signCalls';

const SignUp = () => {
    const history = useHistory();

    const [mode, setMode] = useState('password');
    const [didRedirect, setDidRedirect] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [signUpSuccess, setSignUpSuccess] = useState(true);

    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .min(3, 'Should be of min 3 characters')
            .max(32, 'Should have max of 32 characters'),
        username: Yup.string()
            .min(5, 'Should have min of 5 characters')
            .max(20, 'Should have max of 20 characters'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(15, 'Too Long!')
            .required('Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                'One Uppercase, One Lowercase, One Number and One Special Case Character'
            ),
    });
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
    const onSubmit = async (values, onSubmit) => {
        let { fullname, username, email, password } = values;

        await signUp({ name: fullname, username, email, password })
            .then((res) => {
                //console.log("From DB", res);

                setDidRedirect(true);
            })
            .catch((err) => {
                setErrMsg('Not able to save in DB');
                setShowToast(true);
            });

        onSubmit.resetForm();
    };

    const performRedirect = () => {
        if (didRedirect) {
            history.push({
                pathname: '/signinRedirected',
            });
        }
    };

    return (
        <div class='row' style={{ maxHeight: '100vh' }}>
            <ToastContainer />
            {Notify()}
            <div
                class='col-md-5 col-lg-6 d-none d-md-block d-lg-block text-lg-right'
                style={{
                    marginTop: '7.5vh',
                    zIndex: '-10',
                }}>
                <img src={insta} height={600} />
            </div>
            <div class='col-1 col-md-2 col-lg-1 col-sm-3' />
            <div
                class='col-md-4 col-sm-7 col-lg-4 text-center col-10 pl-4'
                style={{
                    borderRadius: '30px',
                    borderLeft: '1px solid #1BCA9B',
                    borderTop: '1px solid #1BCA9B',
                    marginTop: '8.5vh',
                    minWidth: '300px',
                    maxWidth: '400px',
                }}>
                <h2 style={{ marginTop: '4.5vh' }}>
                    I
                    <h4
                        style={{
                            textTransform: 'uppercase',
                            display: 'inline-block',
                        }}>
                        nsta
                    </h4>
                    C
                    <h4
                        style={{
                            textTransform: 'uppercase',
                            display: 'inline-block',
                        }}>
                        lone
                    </h4>
                </h2>
                <h4 style={{ marginTop: '5vh', fontWeight: 600 }}>
                    Let's Get Started!
                </h4>
                <h6 style={{ marginTop: '1vh', marginBottom: '5vh' }}>
                    Create a new Account
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
                                            <i class='fas fa-user-tag text-primary'></i>
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
                                            <i class='far fa-user text-primary'></i>
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
                                ) : values.email.length > 0 && errors.email ? (
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
                                    type={mode}
                                    name='password'
                                    placeholder='Enter Your Password'
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
                                                //console.log('Raju');
                                                PasswordValidator();
                                            }}></i>
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    textAlign: 'center',
                                }}>
                                {values.password.length !== 0 &&
                                values.username.length !== 0 &&
                                values.fullname.length !== 0 &&
                                values.email.length !== 0 &&
                                !errors.password &&
                                !errors.username &&
                                !errors.fullname &&
                                !errors.email ? (
                                    <button
                                        class='signIn '
                                        type='submit'
                                        style={{
                                            marginTop: '3vh',
                                            opacity: '1',
                                        }}>
                                        Create Account
                                    </button>
                                ) : (
                                    <button
                                        class='signIn '
                                        type='submit'
                                        style={{
                                            marginTop: '3vh',
                                            opacity: '0.5',
                                        }}>
                                        Create Account
                                    </button>
                                )}
                            </div>
                            <h6
                                style={{
                                    marginTop: '6vh',
                                    textAlign: 'center',
                                    zIndex: '10',
                                }}>
                                Already have an account?
                                <Link
                                    style={{
                                        color: 'blue',
                                        display: 'inline-block',
                                    }}
                                    // style={currentTab(history, '/signup')}
                                    className='nav-link'
                                    to='/signin'>
                                    {' '}
                                    Sign In
                                </Link>
                            </h6>
                        </Form>
                    )}
                </Formik>
            </div>
            {performRedirect()}
            <div class=' col-lg-1 col-sm-2 col-1 '></div>
            <div class='fixed-bottom' style={{ zIndex: '-1' }}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
                    <path
                        fill='#0099ff'
                        fill-opacity='0.5'
                        d='M0,32L40,58.7C80,85,160,139,240,176C320,213,400,235,480,250.7C560,267,640,277,720,266.7C800,256,880,224,960,213.3C1040,203,1120,213,1200,186.7C1280,160,1360,96,1400,64L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'></path>
                </svg>
            </div>
            <div class='fixed-bottom text-center mb-1'>
                {' '}
                <h6 style={{ color: '#2C3335' }}>
                    <i class='far fa-copyright'></i> 2020 InstaClone Inspired By
                    :
                    <span
                        style={{
                            color: '#E1306C',
                        }}>
                        Instagram <i class='fab fa-instagram'></i>
                    </span>
                </h6>
            </div>
        </div>
    );
};

export default SignUp;
