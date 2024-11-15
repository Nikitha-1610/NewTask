import { GoClock } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { MdOutlineDescription } from "react-icons/md";
import { BsPaperclip } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
const Assig = () => {
    return (
        <>
        <div className="w-[1050px] h-[800px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2">
            <span className="font-bold">
                Task 1: Landing Page and Dashboard of M App
            </span><br></br><br></br>
        <div>
        <table className="border-separate border-spacing-2 border-none">
          
  
  <tbody>
    <tr>
    <td className="status w-50 flex" ><GoClock /><div>Status</div></td>
    <td><div className="flex"><FaRegCircle /><div>In Progress</div></div></td>
    </tr>
    <tr>
    <td className="date w-50 flex" ><CiCalendar /><div>Due Date</div></td>
    <td>28-10-24</td>
    </tr>
    <tr>
    <td><div className="flex"><GoPeople /><div>Assigned to</div></div></td>
      <td className="da w-80 flex"> 
       <div className="flex"> <img src='Images/person.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
       Emplyee 1
       </div>
       <div className="flex"> <img src='Images/girl1.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
       Emplyee 2
       </div>
       <div className="flex"> <img src='Images/girl2.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
       Emplyee 3
       </div>
       </td>
    </tr>
    <tr>
      <td><div className="flex"><GoPerson /><div>Assigned By</div></div></td>
      <td className="da w-80 flex">       
        <div className="flex"> <img src='Images/girl3.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
       Emplyee 1
       </div>
       </td>
       
      </tr>
  </tbody>
    </table>
            </div>  <br></br>
            <div>
                <span className="flex"><MdOutlineDescription />Description</span>
                <div className="w-[990px] h-[80px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2"></div>
                </div>  <br></br>
                <div>
                    <div className="flex justify-between">                    
                <span className="flex"><BsPaperclip />Attachment(4)</span>
                <button className="text-blue-500">Download</button>
                </div><br></br>
                <div className="flex justify-between">
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[250px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                    <div className="w-[70px] h-[70px] p-2 rounded  bg-white shadow-[2px_2px_4px_0px_#7F767626] shadow-2px_2px_2px_0px_#7F767626]"></div>
                </div>
                </div> <br></br> 
                <div className="" >
                <span className="flex"><FiMessageCircle />Comments(8)</span><br></br>
                <div className="w-[990px] h-[50px] bg-[#FFFFFF] border-[0.2px] border-[#565557] rounded p-2 text-[#8B8A8E] flex">
                    <img src="" alt="" />
                    <img src='Images/person.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
                    Comments Here...
                    </div><br></br>
                <div className="w-[990px] h-[50px] bg-[#D0FCF9] border-[0.2px] border-[#565557] rounded p-2 text-[#8B8A8E] flex">
                <img src='Images/person.jpeg' alt="User Profile" className="w-[15px] h-[15px] rounded-full" />
                Your Comment</div>
                </div><br></br>
                <div className="w-[990px] h-[90px] p-2 rounded bg-[#CFF9D4]">
                    <span>Change Status</span>
                    <div className="flex">
                    <div className="w-[80px] h-[40px] p-[4px] rounded-[100px] border-t border-[#01C2B5] bg-[#01C2B5] flex justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#FBBC05] top-[10px]"></div>
                        <div>Low </div>
                    </div>
                    <div className="w-[80px] h-[40px] p-[4px] rounded-[100px] border-t border-[#01C2B5] bg-[#01C2B5] flex justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#34A853] top-[10px]"></div>
                        <div>Normal </div>
                    </div>
                    <div className="w-[80px] h-[40px] p-[4px] rounded-[100px] border-t border-[#01C2B5] bg-[#01C2B5] flex justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#EA4335] top-[10px]"></div>
                        <div>Urgent </div>
                    </div>
                    </div>
                </div>
                </div>
        </>
  );
};

export default Assig;        