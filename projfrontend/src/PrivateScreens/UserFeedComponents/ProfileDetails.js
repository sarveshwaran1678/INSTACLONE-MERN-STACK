import React, { useEffect, useState } from 'react';
//import post from "../../Images/sarvesh.jpg";
import { isAuthenticated } from '../../AuthScreens/APICalls/signCalls';
import { getOwnUser } from './APICalls';
import {
    Image,
    Transformation,
    CloudinaryContext,
    Placeholder,
} from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function ProfileDetails() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        name: '',
        profilePicPath: '',
    });

    const getDetails = async () => {
        const id = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        //console.log("ID", id);

        await getOwnUser(id, token)
            .then((res) => {
                //console.log(res);
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

    useEffect(() => {
        //console.log("CloudName", CloudName);
        getDetails();
    }, []);

    return (
        <div
            className='row mb-3 '
            style={{
                overflowY: 'visible',
                fontWeight: '500',
            }}>
            <div className='col-3 text-right' style={{ paddingRight: '0' }}>
                <Image
                    cloudName={CloudName}
                    loading='lazy'
                    publicId={userDetails.profilePicPath}>
                    <Transformation
                        height='60'
                        width='60'
                        gravity='auto'
                        crop='fill'
                        quality='auto'
                        radius='max'
                        flags={['preserve_transparency']}
                    />
                    <Placeholder type='pixelate' />
                </Image>
                {/*  <img src={post} style={{ borderRadius: "50%" }} height={50} />*/}
            </div>
            <div className='col-7 text-left mt-2'>
                <span>{userDetails.name}</span>
                <br />
                <span style={{ color: '#a2acba' }}>{userDetails.username}</span>
            </div>
        </div>
    );
}

export default ProfileDetails;
