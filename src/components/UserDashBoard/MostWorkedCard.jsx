const MostWorkedCard = () => {
  const data = [
    { label: "Research", value: 40, color: "#3B82F6" }, // Blue
    { label: "Design", value: 30, color: "#F59E0B" }, // Orange
    { label: "Animation", value: 30, color: "#10B981" }, // Green
  ];

  // Function to calculate cumulative percentages for each segment
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
            54h
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
