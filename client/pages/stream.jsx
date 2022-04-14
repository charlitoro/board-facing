import React from "react";
import VideoJS from '../components/Stream/VideoPlayer' // point to where the functional component is stored

const App = () => {
    const playerRef = React.useRef(null);

    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        stream: true,
        sources: [{
            src: 'http://localhost:8000/live/test/index.m3u8',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    // const changePlayerOptions = () => {
    //   // you can update the player through the Video.js player instance
    //   if (!playerRef.current) {
    //     return;
    //   }
    //   // [update player through instance's api]
    //   playerRef.current.src([{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]);
    //   playerRef.current.autoplay(false);
    // };

    return (
        <>
            <div>Rest of app here</div>

            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

            <div>Rest of app here</div>
        </>
    );
}

export default App
