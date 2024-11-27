// const   MostWorkedCard = () => {
//   const data = [
//     { label: "Research", value: 40, color: "#3B82F6" }, // Blue
//     { label: "Design", value: 30, color: "#F59E0B" }, // Orange
//     { label: "Animation", value: 30, color: "#10B981" }, // Green
//   ];

//   // Function to calculate cumulative percentages for each segment
//   const calculateOffset = (data) => {
//     let cumulative = 0;
//     return data.map((item) => {
//       const start = cumulative;
//       cumulative += item.value;
//       return start;
//     });
//   };

//   const offsets = calculateOffset(data);

//   return (
//     <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
//       <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
//       <div className="relative flex items-center justify-center mb-6">
//         {/* Circular Progress Bar */}
//         <svg className="w-32 h-32" viewBox="0 0 36 36">
//           {data.map((item, index) => (
//             <circle
//               key={index}
//               cx="18"
//               cy="18"
//               r="15.9155"
//               fill="transparent"
//               stroke={item.color}
//               strokeWidth="3"
//               strokeDasharray={`${item.value} ${100 - item.value}`}
//               strokeDashoffset={`-${offsets[index]}`}
//               style={{
//                 transform: "rotate(-90deg)",
//                 transformOrigin: "center",
//               }}
//             />
//           ))}
//           {/* Inner Circle with Text */}
//           <circle cx="18" cy="18" r="12" fill="white" />
//           <text
//             x="18"
//             y="18"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             className="text-gray-800 font-semibold"
//             style={{ fontSize: "5px" }}
//           >
//             54h
//           </text>
//         </svg>
//       </div>
//       {/* Legend */}
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span
//               className="w-4 h-4 rounded-full"
//               style={{ backgroundColor: item.color }}
//             ></span>
//             <span className="text-sm text-gray-600">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostWorkedCard;

// const MostWorkedCard = ({ data }) => {
//   const calculateOffset = (data) => {
//     let cumulative = 0;
//     return data.map((item) => {
//       const start = cumulative;
//       cumulative += item.value;
//       return start;
//     });
//   };

//   const offsets = calculateOffset(data);

//   // Calculate total hours
//   const totalHours = data.reduce((sum, item) => sum + item.value, 0);

//   return (
//     <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
//       <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
//       <div className="relative flex items-center justify-center mb-6">
//         <svg className="w-32 h-32" viewBox="0 0 36 36" role="img" aria-label="Work distribution pie chart">
//           {data.map((item, index) => (
//             <circle
//               key={index}
//               cx="18"
//               cy="18"
//               r="15.9155"
//               fill="transparent"
//               stroke={item.color}
//               strokeWidth="3"
//               strokeDasharray={`${item.value} ${100 - item.value}`}
//               strokeDashoffset={`-${offsets[index]}`}
//               style={{
//                 transform: "rotate(-90deg)",
//                 transformOrigin: "center",
//               }}
//             />
//           ))}
//           <circle cx="18" cy="18" r="12" fill="white" />
//           <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" className="text-gray-800 font-semibold" style={{ fontSize: "5px" }}>
//             {totalHours}h
//           </text>
//         </svg>
//       </div>
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
//             <span className="text-sm text-gray-600">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostWorkedCard;



import React from "react";

// const MostWorkedCard = ({ hoursByLabel }) => {

//   if (!hoursByLabel || Object.keys(hoursByLabel).length === 0) {
//     return <div className="text-gray-500">No data available</div>;
//   }
//   const totalHours = Object.values(hoursByLabel).reduce((acc, hours) => acc + hours, 0);

//   const data = Object.entries(hoursByLabel).map(([label, value]) => ({
//     label,
//     value: ((value / totalHours) * 100).toFixed(2), // Convert to percentage
//     hours: value,
//   }));

//   const colors = ["#3B82F6", "#F59E0B", "#10B981", "#6366F1"]; // Define colors
//   const offsets = data.reduce(
//     (acc, item, idx) => {
//       acc.push(acc[idx] + item.value);
//       return acc;
//     },
//     [0]
//   );

//   return (
//     <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
//       <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
//       <div className="relative flex items-center justify-center mb-6">
//         {/* Pie Chart */}
//         <svg className="w-32 h-32" viewBox="0 0 36 36">
//           {data.map((item, index) => (
//             <circle
//               key={index}
//               cx="18"
//               cy="18"
//               r="15.9155"
//               fill="transparent"
//               stroke={colors[index % colors.length]}
//               strokeWidth="3"
//               strokeDasharray={`${item.value} ${100 - item.value}`}
//               strokeDashoffset={`-${offsets[index]}`}
//               style={{
//                 transform: "rotate(-90deg)",
//                 transformOrigin: "center",
//               }}
//             />
//           ))}
//           {/* Inner Circle with Text */}
//           <circle cx="18" cy="18" r="12" fill="white" />
//           <text
//             x="18"
//             y="18"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             className="text-gray-800 font-semibold"
//             style={{ fontSize: "5px" }}
//           >
//             {totalHours}h
//           </text>
//         </svg>
//       </div>
//       {/* Legend */}
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span
//               className="w-4 h-4 rounded-full"
//               style={{ backgroundColor: colors[index % colors.length] }}
//             ></span>
//             <span className="text-sm text-gray-600">{`${item.label}: ${item.hours}h`}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MostWorkedCard = ({ hoursByLabel }) => {
//   console.log("MostWorkedCard received hoursByLabel:", hoursByLabel);

//   if (!hoursByLabel || Object.keys(hoursByLabel).length === 0) {
//     console.log("No hoursByLabel data available");
//     return <div className="text-gray-500">No data available</div>;
//   }

//   // Create data array from hoursByLabel
//   const data = [
//     { label: "Development", value: hoursByLabel.Development || 0, color: "#3B82F6" },
//     { label: "Research", value: hoursByLabel.Research || 0, color: "#F59E0B" },
//     { label: "UI", value: hoursByLabel.UI || 0, color: "#10B981" },
//     { label: "Unknown", value: hoursByLabel.Unknown || 0, color: "#F43F5E" },
//   ];

//   console.log("Data for pie chart:", data); // Log the data used for pie char

//   // Total hours
//   const totalHours = Object.values(hoursByLabel).reduce((total, value) => total + value, 0);
//   console.log("Total Hours:", totalHours);

//   // Function to calculate cumulative percentages for each segment
//   const calculateOffset = (data) => {
//     let cumulative = 0;
//     return data.map((item) => {
//       const start = cumulative;
//       cumulative += item.value;
//       return start;
//     });
//   };

//   const offsets = calculateOffset(data);
//   console.log("Offsets for pie chart:", offsets); // Log the offsets for pie chart


//   return (
//     <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
//       <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
//       <div className="relative flex items-center justify-center mb-6">
//         {/* Circular Progress Bar */}
//         <svg className="w-32 h-32" viewBox="0 0 36 36">
//           {data.map((item, index) => (
//             <circle
//               key={index}
//               cx="18"
//               cy="18"
//               r="15.9155"
//               fill="transparent"
//               stroke={item.color}
//               strokeWidth="3"
//               strokeDasharray={`${item.value} ${100 - item.value}`}
//               strokeDashoffset={`-${offsets[index]}`}
//               style={{
//                 transform: "rotate(-90deg)",
//                 transformOrigin: "center",
//               }}
//             />
//           ))}
//           {/* Inner Circle with Text */}
//           <circle cx="18" cy="18" r="12" fill="white" />
//           <text
//             x="18"
//             y="18"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             className="text-gray-800 font-semibold"
//             style={{ fontSize: "5px" }}
//           >
//             {totalHours}h
//           </text>
//         </svg>
//       </div>
//       {/* Legend */}
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span
//               className="w-4 h-4 rounded-full"
//               style={{ backgroundColor: item.color }}
//             ></span>
//             <span className="text-sm text-gray-600">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostWorkedCard;

// const MostWorkedCard = ({ hoursByLabel }) => {
//   console.log("MostWorkedCard received hoursByLabel:", hoursByLabel);

//   if (!hoursByLabel || Object.keys(hoursByLabel).length === 0) {
//     console.log("No hoursByLabel data available");
//     return <div className="text-gray-500">No data available</div>;
//   }

//   // Create data array from hoursByLabel
//   const totalHours = Object.values(hoursByLabel).reduce((total, value) => total + value, 0);
  
 
//   const data = [
//     { label: "Development", value: (hoursByLabel.Development || 0) / totalHours * 100, color: "#3B82F6" },
//     { label: "Research", value: (hoursByLabel.Research || 0) / totalHours * 100, color: "#F59E0B" },
//     { label: "UI", value: (hoursByLabel.UI || 0) / totalHours * 100, color: "#10B981" },
//     { label: "Unknown", value: (hoursByLabel.Unknown || 0) / totalHours * 100, color: "#F43F5E" },
//   ];
  

//   console.log("Data for pie chart:", data);

//   // Function to calculate cumulative percentages for each segment
//   const calculateOffset = (data) => {
//     let cumulative = 0;
//     return data.map((item) => {
//       const start = cumulative;
//       cumulative += item.value;
//       return start;
//     });
//   };

//   const offsets = calculateOffset(data);
//   console.log("Offsets for pie chart:", offsets);

//   return (
//     <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
//       <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
//       <div className="relative flex items-center justify-center mb-6">
//         {/* Circular Progress Bar */}
//         <svg className="w-32 h-32" viewBox="0 0 36 36">
//           {data.map((item, index) => (
//             <circle
//               key={index}
//               cx="18"
//               cy="18"
//               r="15.9155"
//               fill="transparent"
//               stroke={item.color}
//               strokeWidth="3"
//               strokeDasharray={`${item.value} ${100 - item.value}`}
//               strokeDashoffset={`-${offsets[index]}`}
//               style={{
//                 transform: "rotate(-90deg)",
//                 transformOrigin: "center",
//               }}
//             />
//           ))}
//           {/* Inner Circle with Text */}
//           <circle cx="18" cy="18" r="12" fill="white" />
//           <text
//             x="18"
//             y="18"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             className="text-gray-800 font-semibold"
//             style={{ fontSize: "5px" }}
//           >
//             {totalHours}h
//           </text>
//         </svg>
//       </div>
//       {/* Legend */}
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span
//               className="w-4 h-4 rounded-full"
//               style={{ backgroundColor: item.color }}
//             ></span>
//             <span className="text-sm text-gray-600">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MostWorkedCard;



const MostWorkedCard = ({ hoursByLabel }) => {
  console.log("MostWorkedCard received hoursByLabel:", hoursByLabel);

  // Ensure no empty or missing hoursByLabel data
  if (!hoursByLabel || Object.keys(hoursByLabel).length === 0) {
    console.log("No hoursByLabel data available");
    return <div className="text-gray-500">No data available</div>;
  }

  // Create data array with safe fallbacks
  const totalHours = Object.values(hoursByLabel).reduce((total, value) => total + value, 0);

  if (totalHours === 0) {
    return <div className="text-gray-500">No hours available</div>;
  }

  const data = [
    { label: "Development", value: (hoursByLabel.Development || 0) / totalHours * 100, color: "#3B82F6" },
    { label: "Research", value: (hoursByLabel.Research || 0) / totalHours * 100, color: "#F59E0B" },
    { label: "UI", value: (hoursByLabel.UI || 0) / totalHours * 100, color: "#10B981" },
    { label: "Unknown", value: (hoursByLabel.Unknown || 0) / totalHours * 100, color: "#F43F5E" },
  ];

  console.log("Data for pie chart:", data);

  // Calculate offsets for the pie chart
  const calculateOffset = (data) => {
    let cumulative = 0;
    return data.map((item) => {
      const start = cumulative;
      cumulative += item.value;
      return start;
    });
  };

  const offsets = calculateOffset(data);
  console.log("Offsets for pie chart:", offsets);

  return (
    <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
      <div className="relative flex items-center justify-center mb-6">
        {/* Circular Progress Bar */}
        <svg className="w-32 h-32" viewBox="0 0 36 36">
          {data.map((item, index) => (
            <circle
              key={index}
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke={item.color}
              strokeWidth="3"
              strokeDasharray={`${item.value} ${100 - item.value}`}
              strokeDashoffset={`-${offsets[index]}`}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
          ))}
          {/* Inner Circle with Text */}
          <circle cx="18" cy="18" r="12" fill="white" />
          <text
            x="18"
            y="18"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-gray-800 font-semibold"
            style={{ fontSize: "5px" }}
          >
            {totalHours}h
          </text>
        </svg>
      </div>
      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MostWorkedCard