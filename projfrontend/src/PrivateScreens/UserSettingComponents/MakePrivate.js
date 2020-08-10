import React, { useState } from 'react';

function MakePrivate() {
    const [isPrivate, setIsPrivate] = useState(false);
    return (
        <div style={{ minHeight: '66vh' }} className='text-center'>
            <h4 style={{ fontWeight: '700', paddingTop: '3.5vh' }}>
                Manage Your Profile
            </h4>
            <div className='text-left'>
                <i
                    class={
                        isPrivate === false
                            ? 'far fa-circle fa-lg text-danger mr-2 mt-2'
                            : 'far fa-dot-circle fa-lg text-success mr-2 mt-2'
                    }
                    onClick={() => setIsPrivate(!isPrivate)}></i>
                <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>
                    {isPrivate
                        ? 'Make Your Account Public'
                        : 'Make Your Account Private'}
                </span>

                <p
                    style={{ fontWeight: '600', letterSpacing: '0.5px' }}
                    className='my-3'>
                    When your account is private, only people you approve can
                    see your photos and videos on Instagram. Your existing
                    followers won't be affected.
                </p>
            </div>
        </div>
    );
}

export default MakePrivate;
