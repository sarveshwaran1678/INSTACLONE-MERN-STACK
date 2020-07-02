import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import imageCompression from 'browser-image-compression';


const App = () => {

    const [uri, setUri] = useState("")

    // const fileChangedHandler = (event) => {
    //     var fileInput = false
    //     if (event.target.files[0]) {
    //         fileInput = true
    //     }
    //     if (fileInput) {
    //         Resizer.imageFileResizer(
    //             event.target.files[0],
    //             300,
    //             300,
    //             'JPEG',
    //             100,
    //             0,
    //             uri => {
    //                 setUri(uri)
    //             },
    //             'base64'
    //         );
    //     }
    // }

    const fileChangedHandler = async (event) => {
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            console.log(compressedFile); // write your own logic

            //API call to send img in background

        } catch (error) {
            console.log(error);
        }
    }
    //<img src={uri}></img>

    return (
        <div className="App">
            {// <input type="file" onChange={fileChangedHandler} />
            }

            <form action="/" enctype="multipart/form-data" method="post">
                <input type="file" name="upload" onChange={fileChangedHandler} />

            </form>
        </div>
    )
}


export default App