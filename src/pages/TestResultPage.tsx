import Layout from "./Layout";
import { Menu } from "@/components/custom/Menu";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
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
                        <div className="flex flex-col h-full items-center pl-4 pr-4 gap-4">
                            <CFGCard />
                            <TestResultCard />
                            <div className="flex w-full justify-end space-x-2 items-center">
                                <Button
                                    className="bg-blue-800 text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0"
                                    style={{ fontSize: "10px" }}
                                >
                                    Test Coverage
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-blue-800 border-2 border-blue-800 rounded-[20]"
                                    style={{ fontSize: "12px" }}
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
