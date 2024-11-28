// const ProductivityChart = ({ daywiseHours } ) => {
//   console.log("ProductivityChart received daywiseHours:", daywiseHours);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 w-full">
//       <div className=" flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Productivity</h3>
//         <div className="text-sm text-gray-500 mt-4">23 hours 24 min</div>
//       </div>
//       <div className="relative">
//         {/* Productivity Bars */}
//         <div className="flex items-end space-x-4">
//           {[
//             { day: "Mon", height: "h-16", color: "bg-blue-500" },
//             { day: "Tue", height: "h-8", color: "bg-purple-500" },
//             { day: "Wed", height: "h-20", color: "bg-blue-500" },
//             { day: "Thu", height: "h-4", color: "bg-purple-500" },
//             { day: "Fri", height: "h-12", color: "bg-blue-500" },
//             { day: "Sat", height: "h-0", color: "" },
//             { day: "Sun", height: "h-0", color: "" },
//           ].map((bar, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div
//                 className={`w-4 ${bar.height} ${bar.color} rounded-md`}
//               ></div>
//               <span className="text-xs mt-2">{bar.day}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductivityChart;

const ProductivityChart = ({ daywiseHours }) => {
  console.log("ProductivityChart received daywiseHours:", daywiseHours);

  // Calculate total hours from daywiseCompletedHours
  const totalHours = Object.values(daywiseHours).reduce((sum, hours) => sum + hours, 0);

  const hasData = totalHours > 0; // Check if there is any non-zero data

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Productivity</h3>
        <div className="text-sm text-gray-500 mt-4">
          {/* Display total hours in the text */}
          {totalHours > 0 ? `${totalHours} hours` : "0h"}
        </div>
      </div>
      <div className="relative">
        {/* Display message if no data */}
        {!hasData ? (
          <div className="text-center text-gray-500">No productivity data available</div>
        ) : (
          <div className="flex items-end space-x-4">
            {Object.keys(daywiseHours).map((day, index) => {
              const hours = daywiseHours[day] || 0; // Get hours for each day or default to 0
              const barHeight = hours > 0 ? `h-${hours * 4}` : "h-0"; // Convert hours to suitable height (multiply by 4 for visualization)
              const barColor = index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"; // Alternate colors

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-4 ${barHeight} ${barColor} rounded-md`}></div>
                  <span className="text-xs mt-2">{day}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductivityChart;
