import React from 'react';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function UserSuggestions() {
    return (
        <React.Fragment>
            <div
                className='row ml-0 mt-1 '
                style={{ overflowY: 'visible', fontWeight: '500' }}>
                <div className='col-3 text-right' style={{ paddingRight: '0' }}>
                    <Image
                        className='m-1'
                        cloudName={CloudName}
                        loading='lazy'
                        publicId='InstaClone/c75d9bf8-2129-4ae9-828f-3e559cce63d6'>
                        <Transformation
                            radius='max'
                            height='55'
                            width='55'
                            gravity='auto'
                            crop='fill'
                            quality='auto'
                            background='white'
                            flags={['preserve_transparency']}
                        />
                        <Placeholder type='pixelate' />
                    </Image>
                </div>
                <div
                    className='col-7 text-left mt-2 ml-2'
                    style={{ paddingRight: '0' }}>
                    <span>Rajender</span>
                    <br />
                    <div class='d-flex justify-content-between'>
                        <div> 21 followers</div>
                        <div className='text-primary'>Follow</div>
                    </div>
                    {/* <span>
                        21 followers{' '}
                        <span className='mr-2 text-primary'>Follow</span>
                    </span> */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserSuggestions;
