// LiveStream.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './livestream.css';

function LiveStream({ videoLink, toggleVideo }) {
  return (
    <div className="livestream">
      <h1>Live Stream Page</h1>

      {/* Embed the YouTube livestream using an iframe */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoLink}`}
        title="YouTube Livestream"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      {/* Button to toggle between videos */}
      <button onClick={toggleVideo}>Toggle Video</button>
    </div>
  );
}

LiveStream.propTypes = {
  videoLink: PropTypes.string.isRequired,
  toggleVideo: PropTypes.func.isRequired,
};

export default LiveStream;
