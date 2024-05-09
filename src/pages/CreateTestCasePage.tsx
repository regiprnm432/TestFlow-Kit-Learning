import Layout from "./Layout";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import CodePorgramCard from "@/components/custom/CodeProgramCard";
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
          <ResizableHandle style={{ backgroundColor: "black" }} />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Two</span>
                </div>
              </ResizablePanel>
              <ResizableHandle style={{ backgroundColor: "black" }} />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Three</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default AddTestCasePage;
