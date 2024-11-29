import { useState } from "react";
import VoiceCall from "./VoiceCall";

const ParentComponent = () => {
  const [isVoiceCallVisible, setIsVoiceCallVisible] = useState(false);

  // Function to handle closing the voice call screen
  const handleCloseVoiceCall = () => {
    setIsVoiceCallVisible(false); // Set visibility to false to hide the voice call
  };

  // Function to show the voice call screen
  const handleStartCall = () => {
    setIsVoiceCallVisible(true); // Set visibility to true to show the voice call
  };

  return (
    <div>
      {/* Button to start a call */}
      <button
        onClick={handleStartCall}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Start Voice Call
      </button>

      {/* Conditionally render the VoiceCall component */}
      {isVoiceCallVisible && <VoiceCall onClose={handleCloseVoiceCall} />}
    </div>
  );
};

export default ParentComponent;
