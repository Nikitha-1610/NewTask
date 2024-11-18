import { MdCallEnd } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";


const VoiceCall = () => {
    return (
      <>
      <div>
      <div className="bg-gray-100 w-[500px] h-[500px] p-5 rounded-lg shadow-lg relative  top-[90px]">
        <div className="w-[400px] h-[400px] relative top-4 left-6"><Webcam /></div>
       <div className="w-[400px] h-[100px] flex justify-around relative bottom-12">
        <button className="w-[50px] h-[50px] bg-red-700 rounded-full" id="muteButton"><div className="relative left-4 "><BsFillMicMuteFill /></div></button>
        <button className="onClick={startWebcam} w-[50px] h-[50px] bg-red-700 rounded-full"><div className="relative left-4 "><MdCallEnd /></div></button>
        <button className="w-[50px] h-[50px] bg-red-700 rounded-full"><div className="relative left-4 "><HiSpeakerWave /></div></button>
        </div>
      </div>
      </div>
       </>
  );
};

export default VoiceCall;