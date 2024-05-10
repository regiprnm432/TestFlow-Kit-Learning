import Layout from "./Layout";
import { Menu } from "@/components/custom/Menu";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import CodePorgramCard from "@/components/custom/CodeProgramCard";
import AddTestCaseCard from "@/components/custom/AddTestCaseCard";
import CFGCard from "@/components/custom/CFGCard";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import PassCard from "@/components/custom/PassCard";

const ExecTestCasePassPage = () => {
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
              <AddTestCaseCard />
              <PassCard />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default ExecTestCasePassPage;
