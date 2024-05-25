import Layout from "./Layout";
import { useState } from "react";
import { Menu } from "@/components/custom/Menu";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import AddTestCaseCard from "@/components/custom/AddTestCaseCard";
import CFGCard from "@/components/custom/CFGCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import FailCard from "@/components/custom/FailCard";

const ExecutionTestCaseFailPage: React.FC = () => {
  const [showCyclomaticComplexity, setShowCyclomaticComplexity] = useState(true);
  const [showCodeCoverage, setShowCodeCoverage] = useState(false);
  const cyclomaticComplexityValue = 5; 
  const codeCoveragePercentage = 80; 

  return (
    <Layout>
      <Menu />
      <div className="flex flex-grow h-screen w-screen">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border flex-grow"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full flex-col">
              <ModuleSpecificationCard />
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col h-full items-center pl-4 pr-4 gap-4" style={{ overflowY: 'auto' }}>
              <CFGCard 
                  showCyclomaticComplexity={showCyclomaticComplexity}
                  cyclomaticComplexityValue={cyclomaticComplexityValue}
                  showCodeCoverage={showCodeCoverage}
                  codeCoveragePercentage={codeCoveragePercentage}
                />
              <AddTestCaseCard />
              <FailCard />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default ExecutionTestCaseFailPage;
