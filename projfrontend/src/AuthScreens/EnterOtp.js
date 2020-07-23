import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import '../style.css';

import enterOtp from '../Images/enterOtp.svg';

import insta from '../Images/insta.gif';
import { optChecker } from './APICalls/passwordCalls';

const EnterOtp = ({ location }) => {

    const [didRedirect, setDidRedirect] = useState(false)
    const [otpMatchedStatus, setOtpMatchedStatus] = useState(true)
    const [errMsg, setErrMsg] = useState("")

    const initialValues = {
        otp: '',
    };

    const onSubmit = async (values, onSubmit) => {
        console.log('Form data', values.otp);
        let userEmail = location.state.userEmail;
        let userOtp = values.otp
        await optChecker({ userOtp, userEmail })
            .then((res) => {
                console.log("RES:", res);
                setDidRedirect(true)
            })
            .catch((err) => {
                //console.log("STATUS", { ...err }.response.status);
                setErrMsg({ ...err }.response.data.msg)
                //console.log("MSG", { ...err }.response.data.msg);
                //console.log("ERR:", { ...err });
                setOtpMatchedStatus(false)

            })

        onsubmit.resetForm();
    };

    const performRedirect = () => {
        if (didRedirect) {
            return <Redirect to={{
                pathname: '/resetpassword',
                state: { userEmail: location.state.userEmail }
            }} />;
        }
    };

    return (
        <div class='row text-center'>
            <ToastContainer />
            {otpMatchedStatus ? null : toast.error(errMsg)}
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
                class='col-md-4 col-sm-7 col-lg-4 text-center col-10 '
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

                <img
                    src={enterOtp}
                    height={100}
                    style={{ borderRadius: '0 0 50% 50%' }}
                />
                <h4 style={{ marginTop: '2vh', fontWeight: 600 }}>
                    Verify Yourself!
                </h4>
                <h6 style={{ marginTop: '1vh', marginBottom: '5vh' }}>
                    Enter Your OTP
                </h6>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ errors, touched, values }) => (
                        <Form>
                            <div class='input-group mb-4 '>
                                <div class='input-group-prepend'>
                                    <span class='input-group-text'>
                                        <i class='far fa-envelope text-primary'></i>
                                    </span>
                                </div>

                                <Field
                                    className='form-control'
                                    type='numeric'
                                    name='otp'
                                    placeholder='Enter Your Otp'
                                    style={{
                                        backgroundcolor: 'white',
                                    }}
                                />

                                <div class='input-group-append '>
                                    <span class='input-group-text post-text'></span>
                                </div>
                            </div>

                            <div
                                style={{
                                    textAlign: 'center',
                                }}>
                                <button
                                    class='signIn '
                                    type='submit'
                                    style={{
                                        marginTop: '3vh',
                                        textAlign: 'center',
                                    }}>
                                    Confirm Otp
                                </button>
                            </div>
                            <h6
                                style={{
                                    marginTop: '10vh',
                                    textAlign: 'center',
                                }}>
                                Didn't received an OTP?
                                <Link
                                    style={{
                                        color: 'blue',
                                        display: 'inline-block',
                                    }}
                                    className='nav-link'
                                    to='/forgotpassword'>
                                    {' '}
                                    Resend OTP
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
                            color: 'purple',
                        }}>
                        Instagram
                    </span>
                </h6>
            </div>
        </div>
    );
};

export default EnterOtp;
