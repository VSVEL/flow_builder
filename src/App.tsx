import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button, CssBaseline } from '@mui/material';
import './styles.css';
import NodePanel from './NodePanel';
import SettingsPanel from './SettingsPanel';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedElement, setSelectedElement] = useState<Node | null>(null);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX - reactFlowBounds.left, y: event.clientY - reactFlowBounds.top };

      const newNode: Node = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: `Text Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => setSelectedElement(node);

  const updateNodeText = (id: string, text: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
  };

  const saveFlow = () => {
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    if (nodesWithEmptyTargets.length > 1) {
      alert('Error: More than one node with empty target handles');
    } else {
      console.log('Flow saved', { nodes, edges });
    }
  };

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      <Box flex={1} className="reactflow-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </Box>
      <Box width={250} padding={2} bgcolor="white" borderLeft="1px solid #ddd">
        {selectedElement ? (
          <SettingsPanel element={selectedElement} updateNodeText={updateNodeText} />
        ) : (
          <NodePanel />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={saveFlow}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default App;
