import Layout from "./Layout";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks
import { Menu } from "@/components/custom/Menu";
import ModuleSpecificationCard from "@/components/custom/ModuleSpecificationCard";
import AddTestCaseCard from "@/components/custom/AddTestCaseCard";
import CFGCard from "@/components/custom/CFGCard";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
import FailCard from "@/components/custom/FailCard";

const ExecutionTestCaseFailPage: React.FC = () => {
  const [showCyclomaticComplexity] =useState(true);
  const [showCodeCoverage] = useState(false);
  const [cyclomaticComplexityValue] = useState(5);
  const [codeCoveragePercentage] = useState(80);

  const bottomRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { state: navigationData } = location;
  // const { idModul } = useParams<{ idModul: string }>(); // Dapatkan ID modul dari URL
  const queryParameters = new URLSearchParams(window.location.search)
  const modulId = queryParameters.get("topikModulId")

  type NavigationDataModul = {
    modul_id: string;
  };

  // const [dataIdModul, SetDataIdModul] = useState<NavigationDataModul | null>(
  //   null
  // );

  const navigate = useNavigate(); // Gunakan useNavigate hook

  // const [failCardData, setFailCardData] = useState<{
  //   percentageCoverage: number;
  //   minimumCoverage: number;
  //   statusEksekusi: boolean;
  //   tanggalEksekusi: string;
  //   poin: number;
  //   modulId: string;
  // }>({
  //   percentageCoverage: 0,
  //   minimumCoverage: 0,
  //   statusEksekusi: false,
  //   tanggalEksekusi: "",
  //   poin: 0,
  //   modulId: ""
  // });

  useEffect(() => {
    // Scroll ke bagian paling bawah saat komponen dimount
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Fungsi untuk menavigasi ke halaman /test-result dengan ID modul sebagai parameter
  const handleNavigateToTestResult = () => {
    const dataToPass: NavigationDataModul = {
      modul_id: navigationData?.modul_id,
      };

      // SetDataIdModul(dataToPass);
      navigate("/test-result?topikModulId="+modulId, { state: dataToPass });

  };

  return (
    <>
      <Layout>
        <Menu />
        <div className="flex flex-col w-screen">
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
              <div
                className="flex flex-col h-full items-center pl-4 pr-4 gap-4"
                style={{ overflowY: "auto" }}
              >
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
                  <FailCard
                    percentageCoverage={navigationData?.coverage_score || 0}
                    minimumCoverage={navigationData?.minimum_coverage_score || 0}
                    statusEksekusi={navigationData?.status_eksekusi || false}
                    tanggalEksekusi={navigationData?.tgl_eksekusi || ""}
                    modulId={navigationData?.modul_id||""}
                  />
                </div>
                {/* Tombol untuk navigasi ke halaman /test-result dengan ID modul */}
                <Button
                    className="bg-white rounded-lg font-bold text-red-700 border border-red-700 hover:bg-red-700 hover:text-white button-custom "
                    onClick={handleNavigateToTestResult}
                    style={{ fontSize: "14px" }}
                  >
                    Laporan Pengujian
                  </Button>
                {/* Penanda untuk scroll ke bagian paling bawah */}
                <div ref={bottomRef}></div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Layout>
    </>
  );
};

export default ExecutionTestCaseFailPage;
