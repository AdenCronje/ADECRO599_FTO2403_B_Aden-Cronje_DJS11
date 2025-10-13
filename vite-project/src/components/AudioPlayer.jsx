import React from "react";
import PropTypes from "prop-types";

export default function AudioPlayer({ audioSrc }) {
  return (
    <audio controls>
      <source src={audioSrc} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}

AudioPlayer.propTypes = {
  audioSrc: PropTypes.string.isRequired,
};
