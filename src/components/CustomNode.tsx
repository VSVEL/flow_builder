import { Handle, Position } from 'reactflow';

export const CustomNode = ({ data }: { data: any }) => {
    const { text, id } = data;
  
    return (
      <div className="custom-node">
        <div className="custom-node-header">Send Message</div>
        <div className="custom-node-input">
          <Handle type="source" position={Position.Left} style={{ background: "#555" }} />
        </div>
        <div className="custom-node-output">
          <Handle type="target" position={Position.Right} style={{ background: "#555" }} />
        </div>
        <div>{text}</div>
        <div>{id}</div>
      </div>
    );
  };
