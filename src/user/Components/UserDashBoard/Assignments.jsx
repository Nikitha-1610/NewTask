const Assignments = () => {
    const assignments = [
      {
        title: "Colour Theory",
        date: "01 Sep 2022",
        grade: "86/100",
        status: "completed",
      },
      {
        title: "Design System",
        date: "01 Sep 2022",
        grade: "90/100",
        status: "completed",
      },
      {
        title: "User Persona",
        date: "03 Sep 2022",
        grade: "0/100",
        status: "todo",
      },
    ];
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h3 className="text-lg font-semibold mb-4">Assignments (12)</h3>
        <div className="text-sm text-gray-600 mb-4">2/5 completed</div>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={assignment.status === "completed"}
                  readOnly
                  className="form-checkbox h-4 w-4"
                />
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-xs text-gray-500">{assignment.date}</p>
                </div>
              </div>
              <span className="text-sm font-medium">{assignment.grade}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Assignments;