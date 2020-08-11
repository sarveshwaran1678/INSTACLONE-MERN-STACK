import React from 'react';
//import post from "../../Images/mayank.jpg";

import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserInfo({ myOwn, userDetails, postCount }) {
    return (
        <div className='row mb-3'>
            <div class='col-md-1'></div>
            <div class='col-md-3'>
                <Image
                    className='profile align-items-center'
                    cloudName={CloudName}
                    loading='lazy'
                    publicId={userDetails.profilePicPath}>
                    <Transformation
                        width='140'
                        height='140'
                        radius='50'
                        gravity='auto'
                        crop='fill'
                        quality='auto'
                        flags={['preserve_transparency']}
                    />
                    <Placeholder type='pixelate' />
                </Image>
            </div>
            <div className='col-md-6'>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-start align-items-center'>
                    <div
                        class=' bd-highlight mr-5'
                        style={{ fontWeight: '700' }}>
                        {userDetails.username}
                    </div>
                    {myOwn ? null : (
                        <button type='button' class='btn btn-primary px-5'>
                            Follow
                        </button>
                    )}
                </div>
                <div class='d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center'>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        {postCount} posts
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        {userDetails.followers.length} followers
                    </div>
                    <div class=' bd-highlight' style={{ fontWeight: '500' }}>
                        {userDetails.followings.length} following
                    </div>
                </div>
                <p style={{ fontWeight: '500' }} className='mb-1'>
                    {userDetails.name}
                </p>
                <p style={{ fontWeight: '500' }}>{userDetails.bio}</p>
            </div>
        </div>
    );
}

export default UserInfo;
