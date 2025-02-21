import { Tree, TreeNode } from "react-organizational-chart";
import { useState, useEffect } from "react";
import MessageCard from "../components/MessageCard";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import ReactLoading from "react-loading";

// Custom Node Component
const OrgChartNode = ({ data, onClick }) => (
  <div
    className="flex justify-center flex-col p-4 border-2 rounded-xl bg-teal-600 shadow-md text-white cursor-pointer"
    onClick={() => onClick(data)}
  >
    <h3 className="text-sm font-semibold">{data.position}</h3>
    <p className="text-xs">{data.name}</p>
  </div>
);

// Render Tree recursively
const renderTree = (data, onClick) => {
  return (
    <TreeNode label={<OrgChartNode data={data} onClick={onClick} />}>
      {data.teamMembers && data.teamMembers.length > 0
        ? data.teamMembers.map((child) => renderTree(child, onClick))
        : null}
    </TreeNode>
  );
};

// Main Teams Component
const Teams = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showMessageCard, setShowMessageCard] = useState(false);
  const [hierarchyData, setHierarchyData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Loader state

  useEffect(() => {
    axiosInstance
      .get("/employee/getHierarchy") 
      .then((response) => {
        if (response.data.status === 200) {
          const formatData = (employee) => ({
            id: employee.employeeId,
            name: employee.name,
            position: employee.role,
            teamMembers: employee.teamMembers
              ? employee.teamMembers.map(formatData)
              : [],
          });

          const formattedData = formatData(response.data.message[0]); 
          setHierarchyData(formattedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching hierarchy data:", error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  const handleNodeClick = (data) => {
    setSelectedNode(data);
  };

  const handleMessageButtonClick = () => {
    setShowMessageCard((prev) => !prev); 
  };

  const handleCloseMessageCard = () => {
    setShowMessageCard(false); 
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
        <ReactLoading type="spin" color="#00bfa6" height={50} width={50} />
      </div>
    );
  }
  

  return (
    <div className="flex justify-center p-6 relative">
      <div>
        <h2 className="text-center font-bold text-xl mb-6">
          Organizational Hierarchy
        </h2>
        <Tree label={<OrgChartNode data={hierarchyData} onClick={handleNodeClick} />}>
          {hierarchyData.teamMembers.map((child) =>
            renderTree(child, handleNodeClick)
          )}
        </Tree>

        {selectedNode && (
          <div
            className="absolute flex flex-col gap-2 bg-teal-100 p-2 rounded-md"
            style={{
              top: `${selectedNode.position === "CEO" ? 20 : 10}px`,
              right: `${selectedNode.position === "CEO" ? 160 : 180}px`,
            }}
          >
            <button
              className="bg-blue-500 text-white px-2 py-1 text-sm rounded-md"
              onClick={handleMessageButtonClick}
            >
              Message
            </button>
            <button className="bg-green-500 text-white px-2 py-1 text-sm rounded-md">
              Status
            </button>
          </div>
        )}

        {showMessageCard && (
          <div
            className="absolute top-32 right-44 transform translate-x-1/2"
            style={{ zIndex: 10 }}
          >
            <MessageCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;