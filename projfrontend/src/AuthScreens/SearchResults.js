import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

const CloudName = process.env.REACT_APP_CLOUDNAME;

function SearchResults({ name, src, id }) {
    return (
        <div
            className='row mb-1'
            style={{
                overflowY: 'visible',
                fontWeight: '500',
                listStyleType: 'none',
            }}>
            <div className='d-flex flex-row bd-highlight justify-content-between align-items-center m-2'>
                <div>
                    <Link to={`/profile/${id}`}>
                        <Image
                            className='mx-2'
                            cloudName={CloudName}
                            loading='lazy'
                            publicId={src}>
                            <Transformation
                                width='40'
                                height='40'
                                radius='max'
                                gravity='auto'
                                crop='fill'
                                quality='auto'
                                flags={['preserve_transparency']}
                            />
                            <Placeholder type='pixelate' />
                        </Image>
                    </Link>
                </div>

                <Link to={`/profile/${id}`}>
                    <div>{name}</div>
                </Link>
            </div>
        </div>
    );
}

export default SearchResults;
