import { Icon } from "@iconify-icon/react";

const ProjectList = ({ projects }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Projects</h2>
      
      {/* Conditional Rendering */}
      {projects.length === 0 ? (
        <div className="text-center text-gray-500">No projects available</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-center gap-2 justify-between p-1"
            >
              {/* Icon and Project Name */}
              <div className="flex items-center space-x-3">
                <div className="text-green-500">
                  <Icon icon="material-symbols:folder-outline" />
                </div>
                <p className="text-gray-800 font-medium text-sm">
                  {project.name}
                </p>
              </div>

              {/* Time */}
              <div className="bg-green-100 text-green-600 px-4 py-1 rounded-lg text-sm font-semibold">
                {project.time}
              </div>

              {/* Progress Bar */}
              <div className="w-1/3">
                <div className="relative h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-green-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;

