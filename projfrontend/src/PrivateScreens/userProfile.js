import React, { useState, useEffect } from 'react';
import post from '../Images/mayank.jpg';
import Navbar from '../AuthScreens/Navbar';
import UserInfo from './UserProfileComponents/UserInfo';
import UserPosts from './UserProfileComponents/UserPosts';
import UserInfoPhone from './UserProfileComponents/UserInfoPhone';
import UserStories from './UserProfileComponents/UserProfileStories';
import { isAuthenticated } from '../AuthScreens/APICalls/signCalls';
import { getOwnUser } from './UserFeedComponents/APICalls';

function UserProfile({ match }) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    const [myOwnPage, setMyOwnPage] = useState(false);

    const [userDetails, setUserDetails] = useState({
        username: '',
        profilePicPath: '',
        followings: [],
        followers: [],
        isPrivate: false,
        bio: '',
        followRequestPending: [],
        followRequestSent: [],
    });

    useEffect(() => {
        if (match.params.userId.toString() == userId.toString()) {
            setMyOwnPage(true);
            getUserDetails();
            //getUser

            //for post count get it here and loop (which will give us post count)
            //or can get it there and count which wont give us post count
        } else {
            //getAnotherUser
        }
    }, []);

    const getUserDetails = async () => {
        await getOwnUser(userId, token)
            .then((res) => {
                const data = res.data;

                setUserDetails({
                    ...userDetails,
                    username: data.username,
                    name: data.name,
                    profilePicPath: data.profilePicPath,
                });
            })
            .catch((err) => {
                console.log('ERR:', { ...err }.response);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='row mt-5'></div>
            <div class='container my-5'>
                <div className='d-none d-md-block'>
                    <UserInfo myOwn={myOwnPage} />
                </div>
                {/* Phone */}
                <UserInfoPhone />
                {/* Story */}
                <UserStories myOwn={myOwnPage} />

                <hr
                    className='mt-0'
                    style={{ borderTop: '1.75px solid rgba(0,0,0,.1)' }}
                />

                <UserPosts myOwn={myOwnPage} />
            </div>
        </div>
    );
}

export default UserProfile;
