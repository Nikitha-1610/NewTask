const Timer = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-bold mb-4">Timer</h3>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <p>Create Wireframe</p>
          <p className="text-gray-400 text-xs">25m 20s</p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Start
        </button>
      </div>
      <hr className="my-4" />
      <ul className="space-y-2">
        {["Slack Logo Design", "Dashboard Design", "Create Wireframe"].map(
          (task, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span className="text-sm">{task}</span>
              <span className="text-gray-500 text-xs">30m 0s</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Timer;
