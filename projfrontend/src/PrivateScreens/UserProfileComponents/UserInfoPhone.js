import React from 'react';

import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfoPhone({ myOwn, userDetails, message, handleFollow }) {
    return (
        <div class='row d-md-none '>
            <div className='col-8'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center'>
                    <div
                        class=' bd-highlight mr-5'
                        style={{ fontWeight: '700' }}>
                        {userDetails.username}
                    </div>
                </div>
                <p style={{ fontWeight: '500' }} className='mb-1'>
                    {userDetails.name}
                </p>
                <p style={{ fontWeight: '500' }} className='mb-1'>
                    {userDetails.bio}
                </p>
            </div>
            <div class='col-4 mt-2'>
                <Image
                    className='profile align-items-center'
                    cloudName={CloudName}
                    loading='lazy'
                    publicId={userDetails.profilePicPath}>
                    <Transformation
                        width='100'
                        height='100'
                        radius='50'
                        gravity='auto'
                        crop='fill'
                        quality='auto'
                        flags={['preserve_transparency']}
                    />
                    <Placeholder type='pixelate' />
                </Image>
            </div>
            <div className='col-12'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center d-md-none'>
                    <div
                        class=' bd-highlight mr-3'
                        style={{ fontWeight: '500' }}>
                        {userDetails.followers.length} followers
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        {userDetails.followings.length} following
                    </div>
                </div>
            </div>

            {myOwn ? null : (
                <div
                    className='d-md-none text-left'
                    style={{ paddingLeft: '15px' }}>
                    <button
                        type='button'
                        class='btn btn-primary pl-4 pr-2'
                        onClick={handleFollow}>
                        {message}
                        <i
                            class={
                                message === 'Follow' ||
                                message === 'Send Follow Request'
                                    ? 'fas fa-user-plus  ml-3'
                                    : 'fas fa-user-times  ml-3'
                            }
                        />
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserInfoPhone;
