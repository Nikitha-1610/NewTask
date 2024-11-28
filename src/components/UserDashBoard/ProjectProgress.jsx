import React from "react";

const ProjectProgress = ({ projects }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.projectId} className="mb-6">
            <h3 className="text-lg font-semibold">{project.projectName}</h3>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
            {/* Team Avatars */}
            <div className="flex -space-x-2 mb-4">
              {project.avatars?.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            {/* Progress Bar */}
            <div className="flex">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="text-base -my-6 text-yellow-400 font inline-block">
                {project.progress}%
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No projects progress available</p>
      )}
    </div>
  );
};

export default ProjectProgress;
