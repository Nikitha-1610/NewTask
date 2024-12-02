const StatsCard = ({ title, value, icon }) => {
    return (
      <div className="p-4 bg-white shadow-lg rounded-xl flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-500 text-2xl">{icon}</div>
      </div>
    );
  };
  
  export default StatsCard;