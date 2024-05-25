import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import PercentageCodeCoverage from "./PresentaseCodeCoverage";
import "reactflow/dist/style.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";

// Data untuk edges dan nodes sesuai dengan program BilanganPrima
const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", label: "no" },
  { id: "e2-4", source: "2", target: "4", label: "yes" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6", label: "yes" },
  { id: "e5-7", source: "5", target: "7", label: "no" },
  { id: "e6-8", source: "6", target: "8", label: "yes" },
  { id: "e7-8", source: "7", target: "8", label: "no" },
  { id: "e8-5", source: "8", target: "5" },
];

const nodes = [
  {
    id: "1",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
    type: "input",
    style: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "2",
    data: { label: "bil > 1" },
    position: { x: 250, y: 100 },
    type: "default",
    style: {
      width: 100,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "3",
    data: { label: "return false" },
    position: { x: 100, y: 200 },
    type: "output",
    style: {
      width: 100,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "4",
    data: { label: "temp = bil - 1" },
    position: { x: 400, y: 200 },
    type: "default",
    style: {
      width: 120,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "5",
    data: { label: "temp > 1" },
    position: { x: 250, y: 300 },
    type: "default",
    style: {
      width: 100,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "6",
    data: { label: "bil % temp == 0" },
    position: { x: 100, y: 400 },
    type: "default",
    style: {
      width: 150,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "7",
    data: { label: "temp = temp - 1" },
    position: { x: 400, y: 400 },
    type: "default",
    style: {
      width: 150,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
  {
    id: "8",
    data: { label: "return true" },
    position: { x: 250, y: 500 },
    type: "output",
    style: {
      width: 100,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "lightblue",
    },
  },
];

const calculateCyclomaticComplexity = (edgesCount: any, nodesCount: any) => {
  return edgesCount - nodesCount + 2;
};

type CFGCardProps = {
  showCyclomaticComplexity?: boolean;
  cyclomaticComplexityValue?: number;
  showCodeCoverage?: boolean;
  codeCoveragePercentage?: number;
};

const CFGCard: React.FC<CFGCardProps> = ({
  showCyclomaticComplexity = false,
  cyclomaticComplexityValue,
  showCodeCoverage = false,
  codeCoveragePercentage,
}) => {
  const cyclomaticComplexity = cyclomaticComplexityValue ?? calculateCyclomaticComplexity(edges.length, nodes.length);
  const cyclomaticComplexityFormula = `V(G) = Edges - Nodes + 2`;

  const parameterStyle = {
    fontSize: "15px",
    fontWeight: "500",
    color: "black",
    marginBottom: "0.5rem",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="h-full w-full">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="module-title">Struktur Program</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="w-full" style={containerStyle}>
            <div style={{ width: "60%" }}>
              <p style={parameterStyle}>Control Flow Graph</p>
              <div className="h-96 relative react-flow-container">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  style={{ width: "100%", height: "100%" }}
                  zoomOnScroll={false}
                  fitView
                >
                  <Background color="#f0f0f0" gap={16} />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
            <div style={{ width: "40%", marginLeft: "20px" }}>
              {showCodeCoverage && codeCoveragePercentage !== undefined && (
                <>
                  <p style={parameterStyle}>Presentase Code Coverage</p>
                  <PercentageCodeCoverage percentage={codeCoveragePercentage} />
                </>
              )}
              {showCyclomaticComplexity && (
                <>
                  <p style={parameterStyle}>Nilai Cyclomatic Complexity</p>
                  <span style={{ fontSize: "13px" }}>
                    {cyclomaticComplexityFormula}
                  </span>
                  <br />
                  <span style={{ fontSize: "13px" }}>
                    Cyclomatic Complexity: {cyclomaticComplexity}
                  </span>
                </>
              )}
            </div>
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
