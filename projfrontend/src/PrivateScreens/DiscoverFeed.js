import React, { useState, useEffect } from 'react';
import Navbar from '../AuthScreens/Navbar';

import { getDiscoverFeed } from './UserFeedComponents/APICalls';
import { isAuthenticated } from '../AuthScreens/APICalls/signCalls';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function DiscoverFeed() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getDiscoverPosts();
    }, []);

    const getDiscoverPosts = async () => {
        await getDiscoverFeed(userId, token)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log('Not able to get discover feed');
                console.log('ERR:', { ...err }.response);
            });
    };

    return (
        <div>
            <Navbar />
            <div className='row mt-5'></div>
            <div className='container mt-5'>
                <div className='row mt-4'>
                    {posts.map((post) => (
                        <React.Fragment>
                            <div
                                className='col-6 col-md-4 mb-5 d-none d-sm-block'
                                style={{ height: '300px' }}>
                                <div className='col-12 col-md-11 w-100 h-100'>
                                    <div
                                        className='w-100 h-100'
                                        style={
                                            `${post.filter}` === 'sepia'
                                                ? {
                                                      filter: 'sepia(1)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : `${post.filter}` ===
                                                  'grayscale'
                                                ? {
                                                      filter: 'grayscale(1)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : `${post.filter}` ===
                                                  'saturate'
                                                ? {
                                                      filter: 'saturate(2)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : `${post.filter}` === 'blue'
                                                ? {
                                                      filter:
                                                          'contrast(0.7) saturate(1.5)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : `${post.filter}` === 'x'
                                                ? {
                                                      filter:
                                                          'saturate(1.6) hue-rotate(15deg)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : `${post.filter}` === 'y'
                                                ? {
                                                      filter:
                                                          'hue-rotate(-20deg)',
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                                : {
                                                      backgroundSize: 'contain',

                                                      backgroundPosition:
                                                          'center center',
                                                      backgroundImage: `url(${post.pictureUrl})`,
                                                  }
                                        }></div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default DiscoverFeed;
