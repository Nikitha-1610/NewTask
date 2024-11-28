const ProductivityChart = ({ daywiseHours }) => {
  console.log("ProductivityChart received daywiseHours:", daywiseHours);

  // Calculate total hours from daywiseHours
  const totalHours = Object.values(daywiseHours).reduce((sum, hours) => sum + hours, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Productivity</h3>
        <div className="text-sm text-gray-500 mt-4">
          {totalHours > 0 ? `${totalHours} hours` : "0h"}
        </div>
      </div>
      <div className="relative">
        <div className="flex items-end space-x-4 mt-5">
          {Object.keys(daywiseHours).map((day, index) => {
            const hours = daywiseHours[day] || 0; // Get hours for each day or default to 0
            const barHeight = hours > 0 ? `h-${hours * 4}` : "h-0"; // Show bars only for non-zero hours
            const barColor = index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"; // Alternate colors

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Render bars only if hours are non-zero */}
                <div className={`w-4 ${barHeight} ${barColor} rounded-md`}></div>
                <span className="text-xs mt-2">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;
