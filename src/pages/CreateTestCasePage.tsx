import Layout from "./Layout";
import { useState, useEffect } from "react";
import { Menu } from "@/components/custom/Menu";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import AddTestCaseCard from "@/components/custom/AddTestCaseCard";
import CFGCard from "@/components/custom/CFGCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MinimalCard from "@/components/custom/MinimalCard";
import { useNavigate } from "react-router-dom";

const CreateTestCasePage: React.FC = () => {
  const navigate = useNavigate();
  const [showCyclomaticComplexity] = useState(true);
  const [showCodeCoverage] = useState(false);
  const cyclomaticComplexityValue = 0;
  const codeCoveragePercentage = 80;
  const sessionData = localStorage.getItem('session')
  let session = null
  if (sessionData != null){
      session = JSON.parse(sessionData);
  }
  useEffect(() => {
    if (session != null){
        if (session.login_type != "student"){
            navigate("/dashboard-teacher")
        }
    }else{
      navigate("/login")
    }
  }, [sessionData]);

  return (
    <Layout>
      <Menu />
      <div className="flex flex-col w-screen min-h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-grow"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col h-full">
              <ModuleSpecificationCard />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col overflow-auto pr-4 pl-4 pb-4 gap-4">
              <CFGCard
                showCyclomaticComplexity={showCyclomaticComplexity}
                cyclomaticComplexityValue={cyclomaticComplexityValue}
                showCodeCoverage={showCodeCoverage}
                codeCoveragePercentage={codeCoveragePercentage}
              />
              <AddTestCaseCard />
              <MinimalCard />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default CreateTestCasePage;
