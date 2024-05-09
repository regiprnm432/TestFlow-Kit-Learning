import Layout from "./Layout";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import CodePorgramCard from "@/components/custom/CodeProgramCard";
import { AddTestCaseCard } from "@/components/custom/AddTestCaseCard";
import CFGCard from "@/components/custom/CFGCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddTestCasePage = () => {
  return (
    <Layout>
      <div className="flex flex-grow h-screen w-screen pt-24">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border flex-grow"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center">
              <ScrollArea className="h-full w-full px-8">
                <ModuleSpecificationCard />
                <CodePorgramCard />
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle style={{ backgroundColor: "#D1D5DB" }} />
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col h-full items-center justify-center p-6 gap-6">
              <CFGCard/>
              <AddTestCaseCard/>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default AddTestCasePage;
