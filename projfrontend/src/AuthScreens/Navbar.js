import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Autosuggest from 'react-autosuggest';
import { signout, isAuthenticated, getAllUsers } from './APICalls/signCalls';
import UploadPicModal from './UploadPicModal';
import SearchResults from './SearchResults';

function Navbar() {
    const [languages, setLanguages] = useState([]);
    const id = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const searchUsers = async () => {
        await getAllUsers(id, token)
            .then((res) => {
                setLanguages(res.data);
            })
            .catch((err) => {});
    };
    useEffect(() => {
        searchUsers();
    }, []);

    const [value, setValue] = useState('');
    const [content, setContent] = useState(undefined);
    const [next, setNext] = useState(false);

    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const result =
            inputLength === 0
                ? []
                : languages.filter(
                      (lang) =>
                          lang.username.toLowerCase().includes(inputValue) ||
                          lang.username.toLowerCase().includes(inputValue)
                  );
        return result;
    };

    const getSuggestionValue = (suggestion) => suggestion.username;

    const renderSuggestion = (suggestion) => (
        <SearchResults
            name={suggestion.username}
            src={suggestion.profilePicPath}
            id={suggestion._id}
        />
    );
    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };
    const handleSubmitSearch = (event) => {
        event.preventDefault();
    };
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };
    const renderInputComponent = (inputProps) => (
        <form
            className='form-inline my-2 my-lg-0 d-none d-md-block'
            onSubmit={handleSubmitSearch}>
            <input
                style={{
                    border: '1px solid black',
                    borderRadius: '7px',
                    textTransform: 'lowercase',
                }}
                {...inputProps}
                className='form-control mr-3'
                type='search'
                placeholder='Search Users'
                aria-label='Search'
            />
        </form>
    );
    const inputProps = {
        value,
        onChange: onChange,
        className: 'form-control mr-sm-2',
    };

    const handleNext = () => {
        setNext(!next);
    };
    const reset = () => {
        setContent(undefined);
        setNext(false);
    };

    const handleFile = (e) => {
        setContent(e.target.result);
    };
    const handleChangeFile = (file) => {
        let fileData = new FileReader();
        // fileData.onloadstart = () => {
        //     return;
        // };
        fileData.onloadend = handleFile;
        fileData.readAsDataURL(file);
    };

    return (
        <div>
            <ToastContainer />
            <div
                style={{
                    borderBottom: '1px solid black',
                    borderRadius: '5px',
                    background: 'white',
                }}
                className='fixed-top '>
                <div className='container ' style={{ paddingRight: '0' }}>
                    <nav class='navbar navbar-expand-lg mx-auto '>
                        <span class='navbar-brand'>
                            <Link
                                to='/userfeed'
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                }}>
                                <i class='fab fa-instagram fa-lg mr-2 d-md-inline text-dark'></i>
                            </Link>

                            <Link to='/userfeed'>
                                <span
                                    style={{ fontWeight: '500' }}
                                    class='d-md-inline-block d-lg-inline-block text-dark'>
                                    InstaClone
                                </span>
                            </Link>
                        </span>
                        <ul class='navbar-nav mx-auto'>
                            <li class='nav-item active '>
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={
                                        onSuggestionsFetchRequested
                                    }
                                    onSuggestionsClearRequested={
                                        onSuggestionsClearRequested
                                    }
                                    onChange={onChange}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                    renderInputComponent={renderInputComponent}
                                />
                            </li>
                        </ul>
                        <span>
                            <Link style={{ color: 'black' }} to='/discoverFeed'>
                                <i class='far fa-compass fa-lg ml-2 mr-3  d-md-inline-block'></i>
                            </Link>
                            <i class='far fa-heart fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            <Link
                                to={`/profile/${id}`}
                                style={{ color: 'black' }}>
                                <i class='far fa-user-circle fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            </Link>
                            <label htmlFor='file1'>
                                <i class='fas fa-camera-retro fa-lg ml-2 mr-3 d-none d-md-inline-block'></i>
                            </label>
                            <input
                                id='file1'
                                name='file'
                                type='file'
                                data-toggle='modal'
                                data-target='#upload'
                                accept='image/*'
                                onClick={(event) => {
                                    reset();
                                    event.target.value = '';
                                }}
                                onChange={(event) => {
                                    handleChangeFile(event.target.files[0]);
                                }}
                                style={{ display: 'none' }}
                            />

                            <Link to='/' style={{ color: 'black' }}>
                                <i
                                    class='far fas fa-door-open fa-lg d-md-none mr-1'
                                    onClick={() =>
                                        signout(() => {
                                            console.log(
                                                'Signed out Successfully'
                                            );
                                        })
                                    }></i>
                            </Link>
                        </span>
                    </nav>
                </div>
            </div>
            {/* MobileNavbar */}
            <div className='fixed-bottom d-md-none '>
                <div
                    class='d-flex justify-content-around fixed-bottom d-md-none p-3 mb-0'
                    style={{ background: 'white' }}>
                    <div>
                        <Link
                            to='/userfeed'
                            style={{ color: 'black', textDecoration: 'none' }}>
                            <i
                                class='fas fa-home fa-lg'
                                style={{ color: '#262626' }}></i>
                        </Link>
                    </div>
                    <div>
                        <i
                            class='fab fa-sistrix fa-lg'
                            style={{ color: '#262626' }}></i>
                    </div>
                    <div>
                        <label htmlFor='file1'>
                            <i
                                class='fas fa-plus fa-lg'
                                style={{ color: '#262626' }}></i>
                        </label>

                        <input
                            id='file1'
                            name='file'
                            type='file'
                            data-toggle='modal'
                            data-target='#upload'
                            accept='image/*'
                            onClick={(event) => {
                                reset();
                                event.target.value = '';
                            }}
                            onChange={(event) => {
                                setContent(event.target.value.files[0]);
                                handleChangeFile(event.target.files[0]);
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div>
                        <i
                            class='far fa-heart fa-lg'
                            style={{ color: '#262626' }}></i>
                    </div>

                    <div>
                        <Link to={`/profile/${id}`} style={{ color: 'black' }}>
                            <i
                                class='far fa-user-circle fa-lg'
                                style={{ color: '#262626' }}></i>
                        </Link>
                    </div>
                </div>
            </div>
            {/* MobileNavbar Closed */}

            {/* Modal */}

            <div
                class='modal fade bd-example-modal-lg '
                id='upload'
                tabindex='-1'
                role='dialog'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'>
                <div
                    class='modal-dialog modal-lg modal-dialog-centered '
                    role='document'
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                    }}>
                    <div
                        class='modal-content '
                        style={{ border: 'none', borderRadius: '0' }}>
                        {content !== undefined ? (
                            <div className='modal-body p-0'>
                                <UploadPicModal
                                    src1={content}
                                    handleNext={handleNext}
                                    next={next}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* ModalClosed */}
        </div>
    );
}

export default Navbar;
