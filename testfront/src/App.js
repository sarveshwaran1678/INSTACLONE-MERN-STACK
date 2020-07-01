import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';

const App = () => {

    const [uri, setUri] = useState("")

    const fileChangedHandler = (event) => {
        var fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    setUri(uri)
                },
                'base64'
            );
        }
    }

    return (
        <div className="App">
            <input type="file" onChange={fileChangedHandler} />
            <img src={uri}></img>
        </div>
    )
}


export default App