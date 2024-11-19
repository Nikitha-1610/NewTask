const ProductivityChart = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <div className=" flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Productivity</h3>
        <div className="text-sm text-gray-500 mt-4">23 hours 24 min</div>
      </div>
      <div className="relative">
        {/* Productivity Bars */}
        <div className="flex items-end space-x-4">
          {[
            { day: "Mon", height: "h-16", color: "bg-blue-500" },
            { day: "Tue", height: "h-8", color: "bg-purple-500" },
            { day: "Wed", height: "h-20", color: "bg-blue-500" },
            { day: "Thu", height: "h-4", color: "bg-purple-500" },
            { day: "Fri", height: "h-12", color: "bg-blue-500" },
            { day: "Sat", height: "h-0", color: "" },
            { day: "Sun", height: "h-0", color: "" },
          ].map((bar, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-4 ${bar.height} ${bar.color} rounded-md`}
              ></div>
              <span className="text-xs mt-2">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
