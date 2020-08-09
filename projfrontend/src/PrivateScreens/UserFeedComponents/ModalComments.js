import React, { useState, useEffect } from 'react';

import ModalReply from './ModalReply';
import { getAnotherUserDetails, getAllReplies, postReply } from './APICalls';
import { isAuthenticated } from '../../AuthScreens/APICalls/signCalls';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ModalComments({ comment, postId }) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    const [showReplyModal, setShowReplyModal] = useState(false);

    const [CommenterDetails, setCommenterDetails] = useState({
        commentBody: comment.commentBody,
        username: '',
        profilePicPath: '',
    });

    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [timeBefore, setTimeBefore] = useState('');

    useEffect(() => {
        getDetails();
        getTimeDiff();
        getReplies();
    }, []);

    const getDetails = async () => {
        const anotherUserId = comment.UserId;
        const id = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        await getAnotherUserDetails(anotherUserId, id, token)
            .then((res) => {
                setCommenterDetails({
                    ...CommenterDetails,
                    username: res.data.username,
                    profilePicPath: res.data.profilePicPath,
                });
            })
            .catch((err) => {
                console.log(
                    'Not able to get CommenterUserName and ProfilePicPath for modalComments'
                );
                console.log('ERR:', { ...err }.response);
            });
    };

    const getTimeDiff = () => {
        let milliseconds = new Date() - new Date(comment.updatedAt);

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

    const getReplies = async () => {
        await getAllReplies(userId, comment._id, token)
            .then((res) => {
                setReplies(res.data);
            })
            .catch((err) => {
                console.log('Not able to get replies');
                console.log('ERR:', { ...err }.response);
            });
    };

    const sendReply = async () => {
        await postReply(userId, comment._id, token, newReply)
            .then((res) => {
                setNewReply('');
            })
            .catch((err) => {
                console.log('Not able to post reply');
                console.log('ERR:', { ...err }.response);
            });

        await getReplies();
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
                    publicId={CommenterDetails.profilePicPath}>
                    <Transformation
                        width='45'
                        height='45'
                        radius='max'
                        gravity='face'
                        crop='fill'
                    />
                    <Placeholder type='pixelate' />
                </Image>
            </div>
            <div className='col-9 text-left ml-1'>
                <span>{CommenterDetails.username}</span>
                <div>
                    <small
                        style={{
                            fontWeight: '500',
                            textTransform: 'capitalize',
                        }}>
                        {CommenterDetails.commentBody}
                    </small>
                </div>
                <span style={{ color: '#28a745' }}>
                    <div class='d-flex justify-content-between text-left'>
                        <small
                            style={{
                                fontWeight: '500',
                                textTransform: 'capitalize',
                                fontStyle: 'italic',
                            }}>
                            {timeBefore}
                        </small>
                        <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => setShowReplyModal(!showReplyModal)}>
                            Reply
                        </span>
                    </div>
                    {showReplyModal === true ? (
                        <React.Fragment>
                            {replies.map((reply) => (
                                <ModalReply key={reply._id} reply={reply} />
                            ))}

                            <div class='input-group mb-3'>
                                <input
                                    type='text'
                                    class='form-control'
                                    placeholder='Add a Reply'
                                    style={{ border: '1px solid grey' }}
                                    value={newReply}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setNewReply(e.target.value);
                                    }}
                                />
                                <div
                                    class='input-group-append '
                                    style={{ border: 'none' }}>
                                    <span
                                        class='input-group-text'
                                        id='basic-addon2'
                                        style={{
                                            border: 'none',
                                            fontWeight: '500',
                                            color: 'blue',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            newReply.length == 0
                                                ? null
                                                : sendReply()
                                        }>
                                        Post
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : null}
                </span>
            </div>
        </div>
    );
}

export default ModalComments;
