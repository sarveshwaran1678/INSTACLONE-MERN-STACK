import React from 'react';
import Navbar from './Navbar';
import post from '../Images/48918556.jpg';
import post1 from '../Images/39093691.jpg';

import './AboutUs.css';

function AboutUs() {
    return (
        <div>
            <Navbar />
            <div className='row mt-4'></div>
            <div
                className='container text-center '
                style={{ fontFamily: 'Montserrat', fontWeight: '500' }}>
                <h1 style={{ fontWeight: '700' }} className='mt-5 niceText'>
                    InstaClone
                </h1>

                <p
                    className='text-justify  mt-1'
                    style={{ wordSpacing: '2px', lineHeight: '250%' }}>
                    This is a personal project inspired by
                    <span className='niceText'> Instagram </span>
                    .This project had been developed on
                    <span className='text-primary'> MERN Stack</span>, Database
                    being hosted on
                    <span style={{ color: '#43be31' }}> MongoDB Atlas</span>,
                    images are being stored and accessed using
                    <span className='text-primary'> Cloudinary </span> &
                    deployed on
                    <span style={{ color: '#3C40C6' }}> Heroku</span>.
                </p>
                <h2
                    style={{ fontWeight: '700', color: 'black' }}
                    className='mt-2 mb-4'>
                    About Developers
                </h2>
                <div className='row mx-auto'>
                    <div className='col-md-1'> </div>
                    <div className='col-md-5'>
                        <div class='card' style={{ width: '20rem' }}>
                            <img
                                class='card-img-top'
                                src={post}
                                alt='Card image cap'
                            />

                            <h5 class='card-title my-2'>Mayank Jain</h5>

                            <ul class='list-group list-group-flush'>
                                <li class='list-group-item'>
                                    <i class='fab fa-github fa-lg mr-4'></i>
                                    <a
                                        href='https://github.com/BackStabber99'
                                        style={{ textDecoration: 'none' }}>
                                        Github Account
                                    </a>
                                </li>
                                <li class='list-group-item'>
                                    <i class='fab fa-linkedin-in fa-lg mr-2'></i>
                                    <a
                                        href=' https://www.linkedin.com/in/mayank-jain-124040159/'
                                        style={{ textDecoration: 'none' }}>
                                        Linkedin Account
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-1'> </div>
                    <div className='col-md-5'>
                        <div class='card' style={{ width: '20rem' }}>
                            <img
                                class='card-img-top'
                                src={post1}
                                alt='Card image cap'
                            />

                            <h5 class='card-title my-2'>Rajender Singh</h5>
                            <ul class='list-group list-group-flush'>
                                <li class='list-group-item'>
                                    <i class='fab fa-github fa-lg mr-4'></i>
                                    <a
                                        href='https://github.com/RajenderSinghB'
                                        style={{ textDecoration: 'none' }}>
                                        Github Account
                                    </a>
                                </li>
                                <li class='list-group-item'>
                                    <i class='fab fa-linkedin-in fa-lg mr-2'></i>
                                    <a
                                        href='https://www.linkedin.com/in/banoularajendersingh/'
                                        style={{ textDecoration: 'none' }}>
                                        Linkedin Account
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5'></div>
        </div>
    );
}

export default AboutUs;
