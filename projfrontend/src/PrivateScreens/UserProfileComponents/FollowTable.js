import React from 'react';
import post from '../../Images/mayank.jpg';

function FollowTable() {
    return (
        <div classname='container'>
            <div class='d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center m-2'>
                <div>
                    <span style={{ fontWeight: '700' }}>Followers</span>
                </div>
                <div>
                    <i
                        class='fas fa-times fa-lg'
                        data-dismiss='modal'
                        style={{ color: 'black' }}
                    />
                </div>
            </div>
            <hr />
            <div
                style={{
                    minHeight: '300px',
                    maxHeight: '300px',
                    overflowY: 'scroll',
                }}>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center mx-auto'>
                    <div>
                        <img
                            src={post}
                            height={50}
                            width={50}
                            style={{ borderRadius: '50%', cursor: 'pointer' }}
                            data-dismiss='modal'
                        />
                        <span
                            className='mx-3 '
                            style={{ fontWeight: '500', cursor: 'pointer' }}
                            data-dismiss='modal'>
                            Username
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowTable;
