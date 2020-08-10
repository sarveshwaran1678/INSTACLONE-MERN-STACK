import React, { useState } from 'react';
import post from '../Images/mayank.jpg';
function UploadPicModal({ src1, handleSubmit, handleNext, next }) {
    const [filter, setFilter] = useState('');

    return (
        <div>
            {next === false ? (
                <div>
                    <div class='d-flex justify-content-between m-3 text-left'>
                        <div class='text-right'>
                            <i
                                class='fas fa-times fa-lg mr-2 d-md-inline text-dark'
                                data-dismiss='modal'
                                style={{ cursor: 'pointer' }}></i>
                        </div>
                        <div style={{ fontWeight: 500 }}>New Post</div>

                        <div
                            className='text-primary'
                            style={{ fontWeight: 500, cursor: 'pointer' }}
                            onClick={handleNext}>
                            Next
                        </div>
                    </div>

                    <img
                        src={src1}
                        className='w-100 '
                        style={
                            filter === 'sepia'
                                ? { filter: 'sepia(1)' }
                                : filter === 'grayscale'
                                ? { filter: 'grayscale(1)' }
                                : filter === 'saturate'
                                ? { filter: 'saturate(2)' }
                                : filter === 'blue'
                                ? { filter: 'contrast(0.7) saturate(1.5)' }
                                : filter === 'x'
                                ? { filter: 'saturate(1.6) hue-rotate(15deg)' }
                                : filter === 'y'
                                ? { filter: 'hue-rotate(-20deg)' }
                                : {}
                        }
                    />
                    <div class='d-flex justify-content-around my-3 '>
                        <div className='ml-2 mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{ filter: 'sepia(1)' }}
                                onClick={() => setFilter('sepia')}
                            />
                        </div>
                        <div className='mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{ filter: 'grayscale(1)' }}
                                onClick={() => setFilter('grayscale')}
                            />
                        </div>
                        <div className='mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{ filter: 'saturate(2)' }}
                                onClick={() => setFilter('saturate')}
                            />
                        </div>
                        <div className='mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{
                                    filter: 'contrast(0.7) saturate(1.5)',
                                }}
                                onClick={() => setFilter('blue')}
                            />
                        </div>
                        <div className='mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{
                                    filter: 'saturate(1.6) hue-rotate(15deg)',
                                }}
                                onClick={() => setFilter('x')}
                            />
                        </div>
                        <div className='mr-2'>
                            <img
                                src={src1}
                                className='w-100'
                                style={{ filter: 'hue-rotate(-20deg)' }}
                                onClick={() => setFilter('y')}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div class='d-flex justify-content-between m-3 text-left'>
                        <div>
                            <i
                                class='fas fa-angle-left fa-lg m-2 d-md-inline text-left'
                                onClick={handleNext}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>

                        <div style={{ fontWeight: 500 }}>New Post</div>

                        <div
                            className='text-primary'
                            style={{ fontWeight: 500, cursor: 'pointer' }}
                            onClick={handleSubmit}
                            data-dismiss='modal'>
                            Post
                        </div>
                    </div>
                    <hr className='m-0' />
                    <div className='mx-3 my-1'>
                        <img
                            src={post}
                            style={{
                                borderRadius: '50%',
                                height: '50px',
                                width: '50px',
                            }}
                        />
                        <span className='ml-2'>Write a Caption</span>
                    </div>

                    <img
                        src={src1}
                        className='w-100 '
                        style={
                            filter === 'sepia'
                                ? { filter: 'sepia(1)' }
                                : filter === 'grayscale'
                                ? { filter: 'grayscale(1)' }
                                : filter === 'saturate'
                                ? { filter: 'saturate(2)' }
                                : filter === 'blue'
                                ? { filter: 'contrast(0.7) saturate(1.5)' }
                                : filter === 'x'
                                ? {
                                      filter: 'saturate(1.6) hue-rotate(15deg)',
                                  }
                                : filter === 'y'
                                ? { filter: 'hue-rotate(-20deg)' }
                                : {}
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default UploadPicModal;
