import { Icon } from '@iconify/react'; 

const TaskCard = ({ title, time }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2 mb-4">
      <div className="w-1 bg-teal-500 rounded-full h-full mr-3"></div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
      <div className="ml-auto">
        <button className="text-gray-400 hover:text-gray-600">
          <Icon icon="mdi:dots-vertical" /> 
        </button>
      </div>
    </div>
  );  
};

export default TaskCard;


