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
import MobileNavbar from '../AuthScreens/MobileNavbar';
import { Link } from 'react-router-dom';

function UserFeed() {
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
                //console.log(res.data);

                setStories(res.data);
                //console.log(stories);
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
                    className='col-lg-4 col-md-5 col-xl-4 d-lg-block d-md-block d-none'
                    style={{ maxWidth: '350px' }}>
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                        <div
                            className='User text-dark'
                            style={{ marginTop: '5vh' }}>
                            <ProfileDetails />
                        </div>
                    </Link>

                    <div className='mt-5 ml-3' style={{ fontWeight: '500' }}>
                        Stories
                    </div>
                    <div
                        className='Stories mt-1 ml-3'
                        style={{
                            height: '50vh',
                            border: '1px solid black',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            borderRadius: '10px',
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
                <div className='col-lg-2' />
            </div>
        </div>
    );
}

export default UserFeed;
