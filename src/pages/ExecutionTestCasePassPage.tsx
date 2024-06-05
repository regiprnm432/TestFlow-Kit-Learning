import Layout from "./Layout";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import PassCard from "@/components/custom/PassCard";

const ExecutionTestCasePassPage: React.FC = () => {
  const [showCyclomaticComplexity, setShowCyclomaticComplexity] = useState(true);
  const [showCodeCoverage, setShowCodeCoverage] = useState(false);
  const [percentageCoverage, setPercentageCoverage] = useState<number>(0);
  const [minimumCoverage, setMinimumCoverage] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [cyclomaticComplexityValue, setCyclomaticComplexityValue] = useState(5);
  const [codeCoveragePercentage, setCodeCoveragePercentage] = useState(80);

  const bottomRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { state: navigationData } = location;
  type NavigationDataModul = {
    modul_id: string;
  };

  const [dataIdModul, SetDataIdModul] = useState<NavigationDataModul | null>(
    null
  );

  const navigate = useNavigate(); 
  
  const [failCardData, setFailCardData] = useState<{
    percentageCoverage: number;
    minimumCoverage: number;
    statusEksekusi: boolean;
    tanggalEksekusi: string;
    poin: number;
    modulId: string;
  }>({
    percentageCoverage: 0,
    minimumCoverage: 0,
    statusEksekusi: false,
    tanggalEksekusi: "",
    poin: 0,
    modulId: ""
  });

  useEffect(() => {
    // Scroll ke bagian paling bawah saat komponen dimount
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

    // Fungsi untuk menavigasi ke halaman /test-result dengan ID modul sebagai parameter
    const handleNavigateToTestResult = () => {
      const dataToPass: NavigationDataModul = {
        modul_id: navigationData?.modul_id,
        };
  
        SetDataIdModul(dataToPass);
        navigate("/test-result", { state: dataToPass });
      }  


  useEffect(() => {
    // Mendapatkan nilai percentageCoverage, minimumCoverage, dan points dari URL query params
    const searchParams = new URLSearchParams(location.search);
    const percentage = Number(searchParams.get("percentageCoverage"));
    const minimum = Number(searchParams.get("minimumCoverage"));
    const pointsValue = Number(searchParams.get("points"));

    // Set nilai percentageCoverage, minimumCoverage, dan points
    setPercentageCoverage(percentage);
    setMinimumCoverage(minimum);
    setPoints(pointsValue);
  }, []);

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
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div  className="flex flex-col h-full items-center pl-4 pr-4 gap-4"
              style={{ overflowY: "auto" }}>
              <CFGCard 
                  showCyclomaticComplexity={showCyclomaticComplexity}
                  cyclomaticComplexityValue={cyclomaticComplexityValue}
                  showCodeCoverage={showCodeCoverage}
                  codeCoveragePercentage={codeCoveragePercentage}
                />
             <div className="flex-grow">
                <AddTestCaseCard />
              </div>
              <div className="mt-6 w-full">
                <PassCard
                  percentageCoverage={navigationData?.coverage_score || 0}
                  minimumCoverage={navigationData?.minimum_coverage_score || 0}
                  statusEksekusi={navigationData?.status_eksekusi || false}
                  tanggalEksekusi={navigationData?.tgl_eksekusi || ""}
                  modulId={navigationData?.modul_id||""}
                  poin={navigationData?.point||0}

                />
              </div>
              {/* Penanda untuk scroll ke bagian paling bawah */}
              <div ref={bottomRef}></div>
              <div className="space-x-2 items-center justify-end">
                        <Button
                            variant="outline"
                            className="bg-white text-sm text-blue-800 border-2 border-blue-800 rounded-[10] hover:bg-blue-800 hover:text-white"
                            onClick={handleNavigateToTestResult}
                        >
                            Hasil Pengujian 
                        </Button>
                        <Button
                            className="bg-blue-800 text-sm text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0"
                        >
                            Kasus Selanjutnya
                        </Button>
                    </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  );
};

export default ExecutionTestCasePassPage;
