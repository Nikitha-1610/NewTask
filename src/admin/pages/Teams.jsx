import { Tree, TreeNode } from "react-organizational-chart";
import { useState } from "react";
import MessageCard from "../components/MessageCard";
// Hierarchy Data for Organizational Chart
const hierarchyData = {
  id: 1,
  name: "User",
  position: "CEO",
  children: [
    {
      id: 2,
      name: "User",
      position: "Director",
      children: [
        {
          id: 3,
          name: "User",
          position: "Branch Manager",
          children: [
            { id: 4, name: "User", position: "Designer" },
            { id: 5, name: "User", position: "Designer" },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "User",
      position: "Zone Manager",
      children: [
        { id: 7, name: "User", position: "Designer" },
        { id: 8, name: "User", position: "Designer" },
      ],
    },
    {
      id: 9,
      name: "User",
      position: "Regional Manager",
      children: [
        { id: 10, name: "User", position: "Designer" },
        { id: 11, name: "User", position: "Designer" },
      ],
    },
  ],
};

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
      {data.children && data.children.length > 0
        ? data.children.map((child) => renderTree(child, onClick))
        : null}
    </TreeNode>
  );
};

// Main Teams Component
const Teams = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showMessageCard, setShowMessageCard] = useState(false);

  const handleNodeClick = (data) => {
    setSelectedNode(data);
  };

  const handleMessageButtonClick = () => {
    setShowMessageCard((prev) => !prev); // Toggle message card visibility
  };

  const handleCloseMessageCard = () => {
    setShowMessageCard(false); // Close the message card
  };

  return (
    <div className="flex justify-center p-6 relative">
      <div>
        <h2 className=" text-center font-bold text-xl mb-6">
          organizational hierarchy
        </h2>
        <Tree
          label={
            <OrgChartNode data={hierarchyData} onClick={handleNodeClick} />
          }
        >
          {hierarchyData.children.map((child) =>
            renderTree(child, handleNodeClick)
          )}
        </Tree>

        {/* Buttons that appear when a node is selected */}
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

        {/* Message Card */}
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
