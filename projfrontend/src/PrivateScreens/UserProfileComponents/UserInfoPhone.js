import React from 'react';
import post from '../../Images/mayank.jpg';
function UserInfoPhone() {
    return (
        <div class='row d-md-none'>
            <div className='col-8'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center'>
                    <div
                        class=' bd-highlight mr-5'
                        style={{ fontWeight: '700' }}>
                        Rajender Singh
                    </div>
                </div>
                <p style={{ fontWeight: '500' }} className='mb-1'>
                    Rajender Web Developer & Competetive Coder
                </p>
            </div>
            <div class='col-2 mt-2'>
                <img
                    className='profile align-items-center'
                    src={post}
                    style={{
                        borderRadius: '50% ',
                        height: '100px',
                        width: '100px',
                    }}
                />
            </div>
            <div className='col-12'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none'>
                    <div
                        class=' bd-highlight mr-3'
                        style={{ fontWeight: '500' }}>
                        1 followers
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        2 following
                    </div>
                </div>
            </div>

            <div
                className='d-md-none text-left'
                style={{ paddingLeft: '15px' }}>
                <button type='button' class='btn btn-primary px-5'>
                    Follow
                </button>
            </div>
        </div>
    );
}

export default UserInfoPhone;
