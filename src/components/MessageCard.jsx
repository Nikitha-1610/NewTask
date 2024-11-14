import { FaRegSmile, FaEllipsisV } from "react-icons/fa";

const MessageCard = () => {
  return (
    <div className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className=" flex gap-2">
          <img
            src="https://material-ui.com/static/images/avatar/1.jpg"
            alt=""
            className="w-10 h-10 rounded-full mb-2"
          />
          <div>
            <div className="font-semibold text-gray-800">Username 4</div>
            <div className="text-xs text-gray-500">2024/10/21</div>
          </div>
        </div>
        <FaEllipsisV className="text-gray-400 cursor-pointer" />
      </div>

      <div className="mt-4 text-gray-800 text-sm">
        Did you done the first project, please send me the completed PDFs.
      </div>

      <div className="mt-4">
        <textarea
          className="w-full p-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
          placeholder="@ John, write your comment"
        ></textarea>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <FaRegSmile className="text-gray-500 cursor-pointer" />
          <button className="text-gray-500 cursor-pointer">🙂</button>
        </div>
        <button className="px-4 py-2 text-sm text-white bg-teal-500 rounded-md hover:bg-teal-600">
          Send
        </button>
      </div>

      <button className="w-full mt-2 text-center text-teal-500 text-sm font-semibold focus:outline-none">
        Go to Chat
      </button>
    </div>
  );
};

export default MessageCard;
