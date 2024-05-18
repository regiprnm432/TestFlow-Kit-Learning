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
import FailCard from "@/components/custom/FailCard";
import MinimalCard from "@/components/custom/MinimalCard";
import { Button } from "@/components/ui/button";

const AddTestCasePage = () => {
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
              <MinimalCard />
              <div className="flex w-full justify-end space-x-2 items-center">
                <Button
                    variant="outline"
                    className="text-blue-800 border-2 border-blue-800 rounded-[20]"
                    style={{ fontSize: "12px" }}
                >
                    Laporan Pengujian
                </Button>                  
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default AddTestCasePage;
