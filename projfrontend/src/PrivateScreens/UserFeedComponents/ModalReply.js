import React, { useState, useEffect } from 'react';

import { getAnotherUserDetails } from './APICalls';
import { isAuthenticated } from '../../AuthScreens/APICalls/signCalls';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ModalReply({ reply }) {
    const [replierDetails, setReplierDetails] = useState({
        username: '',
        profilePicPath: '',
        replyBody: reply.replyBody,
    });

    const [timeBefore, setTimeBefore] = useState('');

    useEffect(() => {
        getDetails();
        getTimeDiff();
    }, []);

    const getDetails = async () => {
        const anotherUserId = reply.UserId;
        const id = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        await getAnotherUserDetails(anotherUserId, id, token)
            .then((res) => {
                setReplierDetails({
                    ...replierDetails,
                    username: res.data.username,
                    profilePicPath: res.data.profilePicPath,
                });
            })
            .catch((err) => {
                console.log(
                    'Not able to get Replier UserName and ProfilePicPath for modal Reply'
                );
                console.log('ERR:', { ...err }.response);
            });
    };

    const getTimeDiff = () => {
        let milliseconds = new Date() - new Date(reply.updatedAt);

        let hour, minute, seconds, days;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        days = hour / 24;

        setTimeBefore(
            hour >= 24
                ? `${Math.trunc(days)} day(s) ago`
                : hour < 1
                ? `${minute} minutes ago`
                : `${hour} hours ago`
        );
    };

    return (
        <div
            className='row mb-3 '
            style={{ overflowY: 'visible', fontWeight: '500' }}>
            <div className='col-2 text-left' style={{ paddingRight: '0' }}>
                <Image
                    className='mr-2 mt-0'
                    cloudName={CloudName}
                    loading='lazy'
                    publicId={replierDetails.profilePicPath}>
                    <Transformation
                        width='45'
                        height='45'
                        radius='max'
                        gravity='auto'
                        crop='fill'
                        quality='auto'
                        flags={['preserve_transparency']}
                    />
                    <Placeholder type='pixelate' />
                </Image>
            </div>
            <div className='col-9 text-left ml-3 '>
                <span className='text-dark'>{replierDetails.username}</span>
                <br />
                <span className='text-dark'>
                    <small
                        style={{
                            fontWeight: '500',
                            textTransform: 'capitalize',
                        }}>
                        {replierDetails.replyBody}
                    </small>
                </span>
                <br />
                <span>
                    <small
                        style={{
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            fontStyle: 'italic',
                        }}>
                        {timeBefore}
                    </small>
                </span>
            </div>
        </div>
    );
}

export default ModalReply;
