import React from 'react';
import post from '../../Images/mayank.jpg';
function UserInfo({ myOwn }) {
    return (
        <div className='row mb-3'>
            <div class='col-md-1'></div>
            <div class='col-md-3'>
                <img
                    className='profile align-items-center'
                    src={post}
                    style={{
                        borderRadius: '50% ',
                        height: '140px',
                        width: '140px',
                    }}
                />
            </div>
            <div className='col-md-6'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center'>
                    <div
                        class=' bd-highlight mr-5'
                        style={{ fontWeight: '700' }}>
                        Rajender Singh
                    </div>
                    {myOwn ? null : (
                        <button type='button' class='btn btn-primary px-5'>
                            Follow
                        </button>
                    )}
                </div>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center'>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        1,250 posts
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        1000 followers
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        210 following
                    </div>
                </div>

                <p style={{ fontWeight: '500' }}>
                    Rajender Web Developer & Competetive Coder
                </p>
            </div>
        </div>
    );
}

export default UserInfo;
