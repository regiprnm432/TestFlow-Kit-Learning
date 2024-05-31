import Layout from "./Layout";
import { useState } from "react";
import { Menu } from "@/components/custom/Menu";
import LeftContentCard from "@/components/custom/LeftContentCard";
import CFGCard from "@/components/custom/CFGCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TestResultCard from "@/components/custom/TestResultCard";
import { Button } from "@/components/ui/button";
import PercentageCodeCoverage from "@/components/custom/PresentaseCodeCoverage";

const TestResultPage = () => {
    const [showCyclomaticComplexity, setShowCyclomaticComplexity] = useState(false);
    const [showCodeCoverage, setShowCodeCoverage] = useState(true);
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
                <LeftContentCard />
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
                <TestResultCard />
                    <div className="space-x-2 items-center justify-end">
                        <Button
                            variant="outline"
                            className="bg-white text-sm text-blue-800 border-2 border-blue-800 rounded-[10] hover:bg-blue-800 hover:text-white"
                        >
                            Coverage Test
                        </Button>
                        <Button
                            className="bg-blue-800 text-sm text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0"
                        >
                            Test Report
                        </Button>
                    </div>
                </div>
            </ResizablePanel>
            </ResizablePanelGroup>
        </div>
        </Layout>
    );
};

export default TestResultPage;
