import { MdCallEnd } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";

import { MdPerson } from "react-icons/md";
const VoiceCall = () => {
    return (
      <>
      <div>
      <div className="bg-gray-100 h-[460px] w-[400px]  p-5 rounded-lg shadow-lg  justify-center">
        <div className="h-[420px] w-[400px] relative  ">
          <div className="w-[100px] h-[100px] rounded-full bg-white relative top-[100px] left-[130px]">
            <div className="w-[70px] h-[70px] relative top-[10px] left-[15px]"><MdPerson className="w-[70px] h-[70px]"/></div></div>
          </div>
       <div className="w-[400px] h-[100px] flex justify-around relative bottom-12 ">
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