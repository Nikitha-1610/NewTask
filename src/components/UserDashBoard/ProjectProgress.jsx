import React from "react";

const ProjectProgress = () => {
  // Example project data
  const projectData = {
    projectName: "Project 1",
    description: "Make a landing page and mobile app.",
    avatars: [
      "https://material-ui.com/static/images/avatar/4.jpg",
      "https://material-ui.com/static/images/avatar/3.jpg",
      "https://material-ui.com/static/images/avatar/2.jpg",
      "https://material-ui.com/static/images/avatar/1.jpg",
    ],
    progress: 35, // Progress percentage
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h3 className="text-lg font-semibold">{projectData.projectName}</h3>
        <p className="text-sm text-gray-600 mb-4">{projectData.description}</p>
        {/* Team Avatars */}
        <div className="flex -space-x-2 mb-4">
          {projectData.avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
        {/* Progress Bar */}
        <div className=" flex">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>
          <span className="text-base -my-6 text-yellow-400 font inline-block">
            {projectData.progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
