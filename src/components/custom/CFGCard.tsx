import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";

const edges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' },
  { id: '1-4', source: '1', target: '4' },
];

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'React' },
    position: { x: 200, y: 50 },
  },
  {
    id: '4',
    data: { label: 'Flow' },
    position: { x: 200, y: 150 },
  },
];

const containerStyle = {
  width: '100%',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CFGCard = ({}) => {
  return (
    <div className="card-container w-full h-full"> {/* Specify width and height */}
      <Card >
        <CardHeader className="p-6">
          <CardTitle className="module-title">CFG</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center module-title">
          <div style={containerStyle}> {/* Specify width and height */}
            <ReactFlow nodes={nodes} edges={edges}>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
        <CardFooter className="card-footer">
          {/* Konten footer card di sini */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CFGCard;
