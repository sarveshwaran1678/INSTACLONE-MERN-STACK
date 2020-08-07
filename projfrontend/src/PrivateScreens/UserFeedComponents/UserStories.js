import React, { useEffect, useState } from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import { ToastContainer, toast, style } from 'react-toastify';

import StoryModal from './StoryModal';
import { getAnotherUserDetails } from './APICalls';

import post from '../../Images/mayankPost.jpg';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserStories({ story }) {
    const [userName, setUserName] = useState('');
    const [timeBefore, setTimeBefore] = useState('');

    useEffect(() => {
        getDetails();
        getTimeDiff();
    }, []);

    const getTimeDiff = () => {
        var milliseconds = new Date() - new Date(story.createdAt);

        var hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;

        setTimeBefore(hour < 1 ? `${minute} minutes ago` : `${hour} hours ago`);
    };

    const getDetails = async () => {
        const anotherUserId = story.UserId;
        await getAnotherUserDetails(anotherUserId)
            .then((res) => {
                setUserName(res.data.username);
            })
            .catch(() => {
                console.log('Not able to get Username for stories');
            });
    };

    const ShowModal = () => (
        <div class='d-none d-md-block w-100'>
            <Image
                className='m-1'
                cloudName={CloudName}
                loading='lazy'
                publicId={story.picturePath}>
                <Transformation crop='scale' gravity='center' />
                <Placeholder type='pixelate' />
            </Image>
        </div>
    );

    const notify = () => {
        toast(<ShowModal />);
    };

    return (
        <div>
            <ToastContainer
                limit={1}
                position='top-center'
                autoClose={10000}
                pauseOnHover
                style={{
                    width: '50vw',
                }}
            />
            <div
                className='row ml-0 mt-2 '
                style={{ overflowY: 'visible', fontWeight: '500' }}
                onClick={() => notify()}>
                <div className='col-3 text-right' style={{ paddingRight: '0' }}>
                    <Image
                        className='m-1'
                        cloudName={CloudName}
                        loading='lazy'
                        publicId={story.picturePath}>
                        <Transformation
                            height='70'
                            width='70'
                            gravity='face'
                            crop='fill'
                            radius='max'
                        />
                        <Placeholder type='pixelate' />
                    </Image>
                </div>
                <div className='col-7 text-left mt-3 ml-2'>
                    <span>{userName}</span>
                    <br />
                    <span>{timeBefore}</span>
                </div>
            </div>
        </div>
    );
}

export default UserStories;
