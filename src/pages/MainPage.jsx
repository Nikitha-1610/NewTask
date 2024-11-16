import { FaClockRotateLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiArrowsSplitBold } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { GiStopwatch } from "react-icons/gi";
import { CgPlayPauseR } from "react-icons/cg";


const MainPage = () => {
  return (
    <>
    <div>
      <h1>Hello User,</h1>
      <h1>Have a great day at work.Happy Working!!!</h1>
    </div><br></br>
    <div className="w-[900px] h-[90px] flex justify-around  bg-[#FFFFFF] border-[0.2px] border-white rounded">
        <div className="w-[170px] h-[90px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded shadow-custom-positive p-2">
            <div className="flex justify-between">
                <span className="text-xs">
                    Total Hours
                </span>
                <div className="w-[10px] h-[3px]"><BsThreeDotsVertical /></div>
            </div>
            <div className="flex justify-between relative top-3">
                <div className="relative top-5"><span>7:00:01</span></div>
                <div className="w-[50px] h-[50px] p-[15.32px] rounded-[14.55px] bg-[#E5FDF7]"><FaClockRotateLeft /></div>
            </div>

        </div>
        <div className="w-[170px] h-[90px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded shadow-custom-positive p-2">
            <div className="flex justify-between">
                <span className="text-xs">
                    Weakly Activity
                </span>
                <div className="w-[10px] h-[3px]"><BsThreeDotsVertical /></div>
            </div>
            <div className="flex justify-between relative top-3">
                <div className="relative top-5 left-2"><span>0%</span></div>
                <div className="w-[50px] h-[50px] p-[15.32px] rounded-[14.55px] bg-[#E5FDF7]"><PiArrowsSplitBold /></div>
            </div>

        </div>
        <div className="w-[170px] h-[90px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded shadow-custom-positive p-2">
            <div className="flex justify-between">
                <span className="text-xs">
                    Worked This Week
                </span>
                <div className="w-[10px] h-[3px]"><BsThreeDotsVertical /></div>
            </div>
            <div className="flex justify-between relative top-3">
                <div className="relative top-5"><span>40:00:05</span></div>
                <div className="w-[50px] h-[50px] p-[15.32px] rounded-[14.55px] bg-[#E5FDF7]"><FaClockRotateLeft /></div>
            </div>

        </div>
        <div className="w-[170px] h-[90px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded shadow-custom-positive p-2">
            <div className="flex justify-between">
                <span className="text-xs">
                    Project Worked
                </span>
                <div className="w-[10px] h-[3px]"><BsThreeDotsVertical /></div>
            </div>
            <div className="flex justify-between relative top-3">
                <div className="relative top-5 left-2"><span>2</span></div>
                <div className="w-[50px] h-[50px] p-[15.32px] rounded-[14.55px] bg-[#E5FDF7]"><FaRegFolder /></div>
            </div>

        </div>
        
    </div><br></br>
    <div className="w-[900px] h-[290px] flex justify-between bg-[#FFFFFF] border-[0.2px] border-none rounded">
        <div className="w-[350px] h-[290px] justify-around relative left-5 bg-[#FFFFFF] border-[0.2px] border-black rounded-xl p-2">
            <div className="w-[340px] h-[50px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span>My Tasks</span>
                    <span className="text-gray-500 relative left-1">(05)</span>
                </div>
                <div className="w-[50px] h-[50px] relative top-1 left-4 "><FaPlus /></div>
            </div>
            <div className="w-[340px] h-[45px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-none rounded p-2 ">
                <div>
                    <span className="text-gray-500">01</span>
                    <span className="text-gray-500 relative left-2">Create Wireframe</span>
                </div>
                <div className="w-[50px] h-[50px] relative top-1 left-4 "><FaRegCheckCircle /></div>
            </div>
            <div className="w-[340px] h-[45px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span className="text-gray-500">02</span>
                    <span className="text-gray-500 relative left-2">Slack Logo Design</span>
                </div>
                <div className="w-[50px] h-[70px] relative top-1 left-4 "><FaRegCheckCircle /></div>
            </div>
            <div className="w-[340px] h-[45px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span className="text-gray-500">03</span>
                    <span className="text-gray-500 relative left-2">Dashboard Design</span>
                </div>
                <div className="w-[50px] h-[70px] relative top-1 left-4 "><FaRegCheckCircle /></div>
            </div>
            <div className="w-[340px] h-[45px] flex justify-between  bg-[#E9FFF7] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span className="text-gray-500">04</span>
                    <span className="text-gray-500 relative left-2">Create Wireframe</span>
                </div>
                <div className="w-[17px] h-[17px] relative top-1 right-4 bg-[#2EB67D] rounded-full "><FaRegCheckCircle /></div>
            </div>
            <div className="w-[340px] h-[45px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span className="text-gray-500">05</span>
                    <span className="text-gray-500 relative left-2">App Icon Design</span>
                </div>
                <div className="w-[17px] h-[17px] relative top-1 right-4 bg-[#FFFFFF] rounded-full "><FaRegCheckCircle /></div>
            </div>
            
        </div>
        <div className="w-[350px] h-[290px] justify-around relative right-7 bg-[#FFFFFF] border-[0.2px] border-black rounded-xl p-2">
        <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span>Timer</span>
                    
                </div>
                <div className="w-[50px] h-[50px] relative top-1 left-4 "><AiOutlinePlaySquare /></div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#E5FDF7] border-[0.2px] border-white rounded p-2 ">
                <div className="flex justify-around">
                    <div className="w-[10px] h-[10px]"><GiStopwatch /></div>
                    <span className="text-[10px] relative left-4">Create Wireframe</span>
                    
                </div>
                <div className="flex">
                <span className="relative left-1">25m 20s</span>
                <div className="w-[30px] h-[45px] relative top-0 left-3 "><CgPlayPauseR /></div>
                <div><BsThreeDotsVertical /></div>
                </div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div>
                    <span>Main Project</span>
                    
                </div>
                <div className="w-[50px] h-[50px] relative top-1 left-4 "><AiOutlinePlaySquare /></div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div className="flex justify-around">
                    <div className="w-[10px] h-[10px]"><GiStopwatch /></div>
                    <span className="text-[10px] relative left-4">Slack Logo Design</span>
                    
                </div>
                <div className="flex">
                <span className="relative text-[10px] left-1">30m 00s</span>
                <div className="w-[30px] h-[45px] relative top-0 left-3 "><AiOutlinePlaySquare /></div>
                <div><BsThreeDotsVertical /></div>
                </div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div className="flex justify-around">
                    <div className="w-[10px] h-[10px]"><GiStopwatch /></div>
                    <span className="text-[10px] relative left-4">Dashboard Design</span>
                    
                </div>
                <div className="flex">
                <span className="relative text-[10px] left-1">30m 00s</span>
                <div className="w-[30px] h-[45px] relative top-0 left-3 "><AiOutlinePlaySquare /></div>
                <div><BsThreeDotsVertical /></div>
                </div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div className="flex justify-around">
                    <div className="w-[10px] h-[10px]"><GiStopwatch /></div>
                    <span className="text-[10px] relative left-4">Create Wireframe</span>
                    
                </div>
                <div className="flex">
                <span className="relative text-[10px] left-1">30m 00s</span>
                <div className="w-[30px] h-[45px] relative top-0 left-3 "><AiOutlinePlaySquare /></div>
                <div><BsThreeDotsVertical /></div>
                </div>
            </div>
            <div className="w-[340px] h-[40px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2 ">
                <div className="flex justify-around">
                    <div className="w-[10px] h-[10px]"><GiStopwatch /></div>
                    <span className="text-[10px] relative left-4">Create Wireframe</span>
                    
                </div>
                <div className="flex">
                <span className="relative text-[10px] left-1">30m 00s</span>
                <div className="w-[30px] h-[45px] relative top-0 left-3 "><AiOutlinePlaySquare /></div>
                <div><BsThreeDotsVertical /></div>
                </div>
            </div>
        </div>
       
    </div><br></br>
    <div className="w-[900px] h-[190px] flex justify-between bg-[#FFFFFF] border-[0.2px]  border-white rounded">
        <div className="w-[350px] h-[190px] justify-around relative left-4 bg-[#FFFFFF] border-[0.2px] border-black rounded-xl p-2">
            <div className="w-[340px] h-[50px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <span className="font-bold">Projects</span>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#EDFEEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#EDFEEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#EDFEEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#EDFEEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
        </div>
        <div className="w-[350px] h-[190px] justify-around relative right-6 bg-[#FFFFFF] border-[0.2px] border-black rounded-xl p-2">
            <div className="w-[340px] h-[50px] flex justify-between  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <span className="font-bold">Upcoming Deadlines</span>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#FEECEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#FEECEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#FEECEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
            <div className="w-[340px] h-[30px] flex justify-evenly  bg-[#FFFFFF] border-[0.2px] border-white rounded p-2">
                <div className="w-[30px] h-[20px] bg-[#EDFEEC] justify-center p-1   "><FaRegFolder /></div>
                <span className="w-[70px] h-[20px] border-black text-[10px]">Project Four</span>
                <div className="w-[70px] h-[20px] text-[10px] bg-[#FEECEC] p-1">00:30:00</div>
                <div className="w-[70px] h-[20px]"></div>
            </div>
        </div>
    </div>

    </>
  )
}

export default MainPage;

