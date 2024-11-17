const ProjectList = ({ title, projects }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <span className="text-sm">{project.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded-lg ${
                project.isDeadline
                  ? "bg-red-100 text-red-500"
                  : "bg-green-100 text-green-500"
              }`}
            >
              {project.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
