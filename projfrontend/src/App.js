import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';

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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <div class='input-group mb-3'>
                            <Field
                                className='form-control'
                                type='email'
                                name='email'
                                placeholder='Enter Your Email'
                                style={{ outline: 'none', shadow: 'none' }}
                            />
                            {errors.email && touched.email ? (
                                <div class='input-group-append'>
                                    <span class='input-group-text'>
                                        <i class='fas fa-times'></i>
                                    </span>
                                </div>
                            ) : (
                                <div class='input-group-append'>
                                    <span class='input-group-text'>
                                        <i class='far fa-times-circle'></i>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className='form-group'>
                            <Field
                                className='form-control'
                                type='text'
                                name='password'
                                placeholder='Enter Your Password'
                            />
                            <ErrorMessage name='password' />
                        </div>

                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default App;
