import Assig from "../components/Assig";

const Screen2 = () => {
    return (
        <>
        <div>
        <div className="flex justify-between ">
            <div className="w-[150px] h-[40px] border border-gray-500 bg-[#A0F4A9] rounded p-2">Today Assigned(3)</div>
            <div className="justify-around">
            <button className="w-[150px] h-[40px] p-2  rounded-3xl bg-[#01C2B5]">+ Add a Task</button>
            <button className="w-[150px] h-[40px] p-2  rounded bg-[#FFFFFF]">Filter</button>

        </div>
        
        </div><br></br>
      <div>
        <Assig></Assig><br></br>
        <Assig></Assig><br></br>
        <Assig></Assig>

        </div> 
        </div>
       

      </>
    );
  };
  
  export default Screen2;