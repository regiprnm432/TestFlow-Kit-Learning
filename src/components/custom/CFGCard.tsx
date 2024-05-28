import React, { useEffect, useState } from "react";
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

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const modulId = import.meta.env.VITE_MODULE_ID;

const calculateCyclomaticComplexity = (edgesCount: number, nodesCount: number) => {
  return edgesCount - nodesCount + 2;
};

type Node = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type: string;
  style: object;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  label?: string;
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
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/modul/detail/${modulId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data CFG:", data); // Cetak data CFG ke konsol
      
      const nodesData = data.data.data_cfg.nodes.map((node: any) => ({
        id: node.ms_id_node,
        data: { label: node.ms_line_number.toString() },
        position: { x: 250+((node.ms_no%2)*50), y: 100 * node.ms_no },
        type: "default",
        style: {
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "lightblue",
        },
      }));
  
      const edgesData = data.data.data_cfg.edges.map((edge: any) => ({
        id: `${edge.id_node_start}-${edge.id_node_finish}`,
        source: edge.id_node_start,
        target: edge.id_node_finish,
      }));
  
      setNodes(nodesData);
      setEdges(edgesData);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

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
