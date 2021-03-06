import React, { useEffect, useState } from 'react';
import Navbar from '../AuthScreens/Navbar';
import UserStoriesPhone from './UserFeedComponents/UserStoriesPhone';
import UserStories from './UserFeedComponents/UserStories';
import Card from './UserFeedComponents/Card';
import ProfileDetails from './UserFeedComponents/ProfileDetails';
import {
    getAllFollowingStories,
    getUserFeed,
} from './UserFeedComponents/APICalls';
import { isAuthenticated } from '../AuthScreens/APICalls/signCalls';

import { Link } from 'react-router-dom';
import UserSuggestions from './UserFeedComponents/UserSuggestions';

function UserFeed() {
    const ids = [
        '5f3cbe931a53e64440cd5239',
        '5f3cbeb01a53e64440cd523a',
        '5f3cbf6d1a53e64440cd523b',
    ];

    const [stories, setStories] = useState([]);
    const [feeds, setFeeds] = useState([]);
    // const [userName, setUserName] = useState("");

    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    useEffect(() => {
        getStories();
        getFeed();
    }, []);

    const getStories = async () => {
        await getAllFollowingStories(id, token)
            .then((res) => {
                setStories(res.data);
            })
            .catch((err) => {
                console.log('Error in getting stories');
                console.log({ ...err }.response.data);
            });
    };

    const getFeed = async () => {
        await getUserFeed(id, token)
            .then((res) => {
                setFeeds(res.data);
            })
            .catch((err) => {
                console.log('Error in getting user Feed');
                console.log({ ...err }.response.data);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='row mt-5'></div>
            <div
                className='container d-md-none d-lg-none'
                style={{
                    display: 'flex',
                    scrollBehavior: 'smooth',
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                }}>
                {stories.map((story, index) => (
                    <UserStoriesPhone
                        story={story}
                        key={story._id}
                        index={index}
                    />
                ))}
            </div>
            <div className='row' style={{ margin: '0 0' }}>
                <div className='col-md-1 col-lg-2 col-xl-2' />
                <div
                    className='col-md-6 col-lg-5 col-xl-5'
                    style={{ paddingRight: '0', paddingLeft: '0' }}>
                    {feeds.map((feed, index) => (
                        <Card feed={feed} key={feed._id} />
                    ))}
                </div>
                <div
                    className='col-lg-4 col-md-5 col-xl-4 d-lg-block d-md-block d-none '
                    style={{ maxWidth: '350px', minWidth: '317.5px' }}>
                    <div
                        className='position-fixed ml-3'
                        style={{ minWidth: '317.5px' }}>
                        <Link
                            to={`/profile/${id}`}
                            style={{ textDecoration: 'none' }}>
                            <div
                                className='User text-dark '
                                style={{ marginTop: '5vh' }}>
                                <ProfileDetails />
                            </div>
                        </Link>

                        <div
                            style={{
                                border: '1px solid #a2acba',
                                borderRadius: '7.5px',
                            }}>
                            <div
                                className='ml-4 my-1'
                                style={{ fontWeight: '600', color: '#a2acba' }}>
                                Stories
                            </div>
                            <div
                                className='Stories ml-1'
                                style={{
                                    height: '35vh',
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                }}>
                                {stories.map((story, index) => (
                                    <UserStories
                                        story={story}
                                        key={story._id}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>

                        <div
                            className='mt-2'
                            style={{
                                border: '1px solid #a2acba',
                                borderRadius: '7.5px',
                            }}>
                            <div
                                className='ml-4 my-1'
                                style={{ fontWeight: '600', color: '#a2acba' }}>
                                Suggestions For You
                            </div>
                            <div
                                className='Stories ml-1'
                                style={{
                                    height: '30vh',
                                    overflowY: 'scroll',
                                    overflowX: 'hidden',
                                }}>
                                {ids.map((id, index) => (
                                    <UserSuggestions id={id} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2' />
            </div>
        </div>
    );
}

export default UserFeed;
