import React from 'react';
import user from '../../Images/mayank.jpg';
import post from '../../Images/mayankPost.jpg';
function StoryModalPhone() {
    return (
        <div className='d-md-none'>
            <div
                id='carouselExampleControls'
                class='carousel slide'
                data-ride='carousel'>
                <div class='carousel-inner'>
                    <div class='carousel-item active'>
                        <div class='row'>
                            <div class='col-6'>
                                <div
                                    className='row  mb-1 '
                                    style={{
                                        overflowY: 'visible',
                                        fontWeight: '500',
                                    }}>
                                    <div
                                        className='col-4 text-left'
                                        style={{ paddingRight: '0' }}>
                                        <img
                                            src={user}
                                            style={{ borderRadius: '50%' }}
                                            height={50}
                                            data-toggle='modal'
                                            data-target='#exampleModal1'
                                        />
                                    </div>
                                    <div className='col-8 text-left '>
                                        <span>Naruto Uzumaki</span>
                                        <br />
                                        <span>5mins ago</span>
                                    </div>
                                </div>
                            </div>
                            <div class='col-6 text-right'>
                                <i
                                    class='fas fa-times fa-lg '
                                    data-dismiss='modal'
                                />
                            </div>
                        </div>
                        <img
                            class='d-block w-100'
                            src={post}
                            alt='First slide'
                        />
                    </div>
                    <div class='carousel-item'>
                        <div
                            className='row  mb-1 '
                            style={{ overflowY: 'visible', fontWeight: '500' }}>
                            <div
                                className='col-1 text-left'
                                style={{ paddingRight: '0' }}>
                                <img
                                    src={user}
                                    style={{ borderRadius: '50%' }}
                                    height={50}
                                    data-toggle='modal'
                                    data-target='#exampleModal1'
                                />
                            </div>
                            <div className='col-11 text-left '>
                                <span>Naruto Uzumaki</span>
                                <br />
                                <span>5mins ago</span>
                            </div>
                        </div>
                        <img
                            class='d-block w-100'
                            src={post}
                            alt='Second slide'
                        />
                    </div>
                    <div class='carousel-item'>
                        <div
                            className='row  mb-1 '
                            style={{ overflowY: 'visible', fontWeight: '500' }}>
                            <div
                                className='col-1 text-left'
                                style={{ paddingRight: '0' }}>
                                <img
                                    src={user}
                                    style={{ borderRadius: '50%' }}
                                    height={50}
                                    data-toggle='modal'
                                    data-target='#exampleModal1'
                                />
                            </div>
                            <div className='col-11 text-left '>
                                <span>Naruto Uzumaki</span>
                                <br />
                                <span>5mins ago</span>
                            </div>
                        </div>
                        <img
                            class='d-block w-100'
                            src={post}
                            alt='Third slide'
                        />
                    </div>
                </div>
                <a
                    class='carousel-control-prev'
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='prev'>
                    <span
                        class='carousel-control-prev-icon'
                        aria-hidden='true'></span>
                    <span class='sr-only'>Previous</span>
                </a>
                <a
                    class='carousel-control-next'
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='next'>
                    <span
                        class='carousel-control-next-icon'
                        aria-hidden='true'></span>
                    <span class='sr-only'>Next</span>
                </a>
            </div>
        </div>
    );
}

export default StoryModalPhone;
