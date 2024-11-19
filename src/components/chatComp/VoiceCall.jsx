import { MdCallEnd } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import Webcam from "react-webcam";

const VoiceCall = ({ closeFeature }) => {
  return (
    <>
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="bg-gray-100 w-full max-w-[500px] h-[500px] p-5 rounded-lg shadow-lg relative">
          <div className="w-full h-[80%] flex justify-center  bg-black items-center">
            <Webcam />
          </div>
          <div className="w-full h-[80px] flex justify-around items-center absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <button className="w-[50px] h-[50px] bg-red-700 rounded-full">
              <div className="relative left-4">
                <BsFillMicMuteFill />
              </div>
            </button>
            <button
              onClick={closeFeature}
              className="w-[50px] h-[50px] bg-red-700 rounded-full"
            >
              <div className="relative left-4">
                <MdCallEnd />
              </div>
            </button>
            <button className="w-[50px] h-[50px] bg-red-700 rounded-full">
              <div className="relative left-4">
                <HiSpeakerWave />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceCall;
