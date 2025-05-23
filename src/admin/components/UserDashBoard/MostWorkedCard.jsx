const MostWorkedCard = ({ hoursByLabel }) => {
  console.log("MostWorkedCard received hoursByLabel:", hoursByLabel);

  const getColor = (label) => {
    const colors = {
      Development: "#3B82F6",
      Research: "#F59E0B",
      UI: "#10B981",
      Unknown: "#F43F5E",
    };
    return colors[label] || "#9CA3AF";
  };

  if (!hoursByLabel || Object.keys(hoursByLabel).length === 0) {
    console.log("No hoursByLabel data available");
    return <div className="text-gray-500">No data available</div>;
  }

  const totalHours = Object.values(hoursByLabel).reduce((total, value) => total + value, 0);

  if (totalHours === 0) {
    return <div className="text-gray-500">No hours available</div>;
  }

  const data = Object.keys(hoursByLabel).map((label) => ({
    label,
    value: (hoursByLabel[label] / totalHours) * 100,
    color: getColor(label),
  }));

  const calculateOffset = (data) => {
    let cumulative = 0;
    return data.map((item) => {
      const start = cumulative;
      cumulative += item.value;
      return start;
    });
  };

  const offsets = calculateOffset(data);

  return (
    <div className="w-96 mx-auto p-4 rounded-lg shadow-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Most Worked</h3>
      <div className="relative flex items-center justify-center mb-6">
        {/* Circular Progress Bar */}
        <svg className="w-40 h-40" viewBox="0 0 36 36">
          {data.map((item, index) => (
            <circle
              key={index}
              cx="18"
              cy="18"
              r="15.9155" // Adjusted radius for better scaling
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
            style={{ fontSize: "6px" }} // Increased font size for better readability
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

export default MostWorkedCard;
