import React from 'react';

function UserInfo() {
    return (
        <div>
            <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center'>
                <div class=' bd-highlight mr-5' style={{ fontWeight: '700' }}>
                    Rajender Singh
                </div>
                <button type='button' class='btn btn-primary px-5'>
                    Follow
                </button>
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
    );
}

export default UserInfo;
