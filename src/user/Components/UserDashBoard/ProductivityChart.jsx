const ProductivityChart = ({ daywiseHours, isFullWidth, projectProgress }) => {
  const totalHours = Object.values(daywiseHours).reduce((sum, hours) => sum + hours, 0);

  return (
    <div className="flex justify-between bg-white shadow-md rounded-lg p-2">
      {/* Left side: Productivity chart */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4">Productivity</h3>
          <div className="text-sm text-gray-500 mt-4">
            {totalHours > 0 ? `${totalHours} hours` : "0h"}
          </div>
        </div>
        <div className="relative">
          <div className={`flex items-end sm:space-x-4  mt-5 ${isFullWidth ? 'justify-between' : 'justify-center'}`}>
            {Object.keys(daywiseHours).map((day, index) => {
              const hours = daywiseHours[day] || 0;
              const barHeight = hours > 0 ? `h-${hours * 4}` : "h-0";
              const barColor = index % 2 === 0 ? "bg-blue-500" : "bg-purple-500";

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-4 sm:w-6 ${barHeight} ${barColor} rounded-md`}></div>
                  <span className="text-xs mt-2">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right side: Project Progress (only if available) */}
      {projectProgress !== undefined && (
        <div className="flex flex-col justify-center items-center ml-6">
          <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
          <div className="text-sm text-gray-500 mb-4">{projectProgress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${projectProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductivityChart;
