const users = [
    {
      username: 'Sandhiya Ravikumar',
      email: 'sandyva@gmail.com',
      phone: '+91 6789054321',
      position: 'UX UI Designer',
      joiningDate: '02-11-2024',
    },
    // Duplicate user data for demonstration purposes
    ...Array(7).fill({
      username: 'Sandhiya Ravikumar',
      email: 'sandyva@gmail.com',
      phone: '+91 6789054321',
      position: 'UX UI Designer',
      joiningDate: '02-11-2024',
    })
  ];

const People = () => {
    return (
      <>
      <div className="p-5 p-5">
      <div className="mx-auto w-1/2 flex space-x-20 gap-2 my-5">
           <div className="flex flex-col items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center ">
            <span className='text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] '>12</span>
            <span className='text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none'>People</span>
           </div>
           <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
           <div className="flex flex-col items-start justify-center w-[200px] h-[100px] text-[20px]  text-[#333] text-center  ">
            <span className='text-center text-[42.52px] font-medium leading-[49.83px] tracking-[0.09966778010129929px] '>5</span>
            <span className='text-center text-[9.97px] font-medium leading-[11.68px] tracking-[0.1px] text-[#C4C4C4] underline decoration-skip-ink-none'>Department</span>
           </div>
           <div className="h-[130px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
           </div>
           </div>
        <div className="flex justify-center gap-5 mb-5 relative -left-[500px]">
        <select className="p-2 text-base rounded border border-gray-300 bg-white cursor-pointer">
          <option value="all">All</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="p-2 text-base rounded border border-gray-300 bg-white cursor-pointer">
          <option value="all-departments">All Departments</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>  

      <table className="w-full border-collapse mt-5 outline-none">
        <thead className="bg-[rgba(128,128,128,0.266)]">
          <tr>
            <th className="p-2 text-left border-b-2 border-gray-400/60"><input
                  type="checkbox"
                  className="selectAll"
                /></th> 
            <th className="p-2 text-left border-b-2 border-gray-400/60">Username</th>
            <th className="p-2 text-left border-b-2 border-gray-400/60">Mail ID</th>
            <th className="p-2 text-left border-b-2 border-gray-400/60">Phone number</th>
            <th className="p-2 text-left border-b-2 border-gray-400/60">Position</th>
            <th className="p-2 text-left border-b-2 border-gray-400/60">Joining Date</th>
            <th className="p-2 text-left border-b-2 border-gray-400/60">Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="p-2 text-left border-b-2 border-gray-400/60">
                <input
                  type="checkbox"
                  className="checkbox"
                />
              </td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">{user.username}</td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">{user.email}</td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">{user.phone}</td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">{user.position}</td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">{user.joiningDate}</td>
              <td className="p-2 text-left border-b-2 border-gray-400/60">
                <div className="flex items-center">
                  <button className="px-2.5 py-1 bg-[#0ee540] text-white border-none cursor-pointer rounded-lg">Approve</button>
                  <i className="fas fa-ellipsis-v ml-2 text-lg cursor-pointer text-gray-800 hover:text-blue-500"></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-5 space-x-80">
        <button className="px-5 py-2.5 bg-white text-black border-2 border-black cursor-pointer mx-2.5 rounded-md hover:bg-[#0056b3]">Previous</button>
        <span className="text-base mx-2">Page 1 of 10</span>
        <button className="px-5 py-2.5 bg-white text-black border-2 border-black cursor-pointer mx-2.5 rounded-md hover:bg-[#0056b3]">Next</button>
      </div>
      </>
    );
  };
  
  export default People;