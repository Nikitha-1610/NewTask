import { useState, useRef } from "react";
import { MdCallEnd, MdCameraswitch } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";

const VideoCall = () => {
  const webcamRef = useRef(null); // Reference for the Webcam component
  const [isCameraOn, setIsCameraOn] = useState(false); // Camera on/off state
  const [isCameraFacingFront, setIsCameraFacingFront] = useState(true); // Camera facing state

  // Function to toggle the camera
  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  // Function to switch the camera (front/back)
  const switchCamera = () => {
    setIsCameraFacingFront((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 w-full max-w-[700px] h-full max-h-[500px] p-5 rounded-lg shadow-lg relative flex flex-col items-center justify-between">
      {/* Webcam View */}
      <div className="w-full h-[70%] flex items-center justify-center bg-black rounded-lg overflow-hidden">
        {isCameraOn ? (
          <Webcam
            ref={webcamRef}
            videoConstraints={{
              facingMode: isCameraFacingFront ? "user" : "environment",
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white flex items-center justify-center">
            <FaCamera size={50} />
            <p className="text-center mt-2">Camera is off</p>
          </div>
        )}
      </div>

      {/* Controls Section */}
      <div className="w-full h-[20%] flex justify-around items-center">
        {/* Mute Button */}
        <button
          className="w-[60px] h-[60px] bg-red-700 rounded-full flex items-center justify-center text-white"
          id="muteButton"
        >
          <BsFillMicMuteFill size={24} />
        </button>

        {/* End Call Button */}
        <button
          className="w-[60px] h-[60px] bg-red-700 rounded-full flex items-center justify-center text-white"
          id="endCallButton"
        >
          <MdCallEnd size={24} />
        </button>

        {/* Speaker Button */}
        <button
          className="w-[60px] h-[60px] bg-red-700 rounded-full flex items-center justify-center text-white"
          id="speakerButton"
        >
          <HiSpeakerWave size={24} />
        </button>

        {/* Toggle Camera Button */}
        <button
          onClick={toggleCamera}
          className={`w-[60px] h-[60px] ${
            isCameraOn ? "bg-green-700" : "bg-gray-500"
          } rounded-full flex items-center justify-center text-white`}
          id="toggleCameraButton"
        >
          <FaCamera size={24} />
        </button>

        {/* Switch Camera Button */}
        {isCameraOn && (
          <button
            onClick={switchCamera}
            className="w-[60px] h-[60px] bg-blue-700 rounded-full flex items-center justify-center text-white"
            id="switchCameraButton"
          >
            <MdCameraswitch size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
