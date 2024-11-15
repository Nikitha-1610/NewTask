// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from "reactflow";
// import "reactflow/dist/style.css";
import MessageCard from "./MessageCard";

// Custom Node Content Component with Tailwind CSS styling
const NodeContent = ({ name, image, position }) => (
  <div className="bg-teal-600 text-white p-4 rounded-lg flex flex-row gap-2 items-center">
    <img
      src={image}
      alt="user avatar"
      className="w-10 h-10 rounded-full mb-2"
    />
    <div>
      <div className="text-sm font-bold">{name}</div>
      <div className="text-xs">{position}</div>
    </div>
  </div>
);
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <NodeContent
          name="mr.deo"
          position="CEO"
          image="https://material-ui.com/static/images/avatar/1.jpg"
        />
      ),
    },
    position: { x: 400, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <NodeContent
          name="mr.lion"
          position="Director"
          image="https://material-ui.com/static/images/avatar/2.jpg"
        />
      ),
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "3",
    data: {
      label: (
        <NodeContent
          name="bliss"
          position="Branch Manager"
          image="https://material-ui.com/static/images/avatar/3.jpg"
        />
      ),
    },
    position: { x: 250, y: 200 },
  },
  {
    id: "4",
    data: {
      label: (
        <NodeContent
          name="deon"
          position="Zone Manager"
          image="https://material-ui.com/static/images/avatar/4.jpg"
        />
      ),
    },
    position: { x: 550, y: 200 },
  },
  {
    id: "5",
    data: {
      label: (
        <NodeContent
          name="rechard"
          position="Regional Manager"
          image="https://material-ui.com/static/images/avatar/5.jpg"
        />
      ),
    },
    position: { x: 700, y: 200 },
  },
  {
    id: "6",
    data: {
      label: (
        <NodeContent
          name="User1"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/6.jpg"
        />
      ),
    },
    position: { x: 150, y: 300 },
  },
  {
    id: "7",
    data: {
      label: (
        <NodeContent
          name="User2"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/7.jpg"
        />
      ),
    },
    position: { x: 250, y: 300 },
  },
  {
    id: "8",
    data: {
      label: (
        <NodeContent
          name="User3"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/4.jpg"
        />
      ),
    },
    position: { x: 350, y: 300 },
  },
  {
    id: "9",
    data: {
      label: (
        <NodeContent
          name="User4"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/3.jpg"
        />
      ),
    },
    position: { x: 550, y: 300 },
  },
  {
    id: "10",
    data: {
      label: (
        <NodeContent
          name="User5"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/2.jpg"
        />
      ),
    },
    position: { x: 650, y: 300 },
  },
  {
    id: "11",
    data: {
      label: (
        <NodeContent
          name="User6"
          position="Designer"
          image="https://material-ui.com/static/images/avatar/1.jpg"
        />
      ),
    },
    position: { x: 750, y: 300 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e3-7", source: "3", target: "7" },
  { id: "e3-8", source: "3", target: "8" },
  { id: "e5-9", source: "5", target: "9" },
  { id: "e5-10", source: "5", target: "10" },
  { id: "e5-11", source: "5", target: "11" },
];

const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: "500px", width: "100%" }} className=" flex">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <MessageCard />
    </div>
  );
};

export default OrgChart;
