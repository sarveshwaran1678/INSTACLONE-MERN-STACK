import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import './style.css';

import insta from './Images/insta.png';
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
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
});

function App() {
    return (
        <div class='container'>
            <div class='row'>
                <div class='col-md-6'>
                    <img src={insta} />
                </div>
                <div
                    class='col-md-4'
                    style={{ border: '1px solid black', borderRadius: '10px' }}>
                    <h2 style={{ marginTop: '10vh' }}>Instagram</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ errors, touched, values }) => (
                            <Form>
                                <div class='input-group mb-3 '>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text pre-text'>
                                            <i class='fas fa-envelope'></i>
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

                                    {values.email.length === 0 ? (
                                        <div class='input-group-append '>
                                            <span class='input-group-text post-text'></span>
                                        </div>
                                    ) : values.email.length > 0 &&
                                      errors.email ? (
                                        <div class='input-group-append p-0 '>
                                            <span class='input-group-text'>
                                                <i class='fas fa-times'></i>
                                            </span>
                                        </div>
                                    ) : (
                                        <div class='input-group-append '>
                                            <span class='input-group-text'>
                                                <i class='fas fa-check'></i>
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div class='input-group mb-3'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text'>
                                            <i class='fas fa-user-lock'></i>
                                        </span>
                                    </div>
                                    <Field
                                        className='form-control'
                                        type='text'
                                        name='password'
                                        placeholder='Enter Your Password'
                                    />
                                    {values.password.length === 0 ? (
                                        <div class='input-group-append'>
                                            <span class='input-group-text'></span>
                                        </div>
                                    ) : values.password.length > 0 &&
                                      errors.password ? (
                                        <div class='input-group-append'>
                                            <span class='input-group-text'>
                                                <i class='fas fa-times'></i>
                                            </span>
                                        </div>
                                    ) : (
                                        <div class='input-group-append'>
                                            <span class='input-group-text'>
                                                <i class='fas fa-check'></i>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button type='submit'>Submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div class='col-md-2'></div>
            </div>
        </div>
    );
}

export default App;
