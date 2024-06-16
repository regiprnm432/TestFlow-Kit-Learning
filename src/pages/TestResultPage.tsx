import Layout from "./Layout";
import { useState, useEffect } from "react";
import { Menu } from "@/components/custom/Menu";
import ModuleCoverage from "@/components/custom/ModuleCoverage";
import CFGCard from "@/components/custom/CFGCard";
import {
//   ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TestResultCard from "@/components/custom/TestResultCard";
import { Button } from "@/components/ui/button";
//import PercentageCodeCoverage from "@/components/custom/PresentaseCodeCoverage";
import { useNavigate } from "react-router-dom";

interface DataResultTest {
    coverageScore: number;
    point: number;
    totalTestCase: number;
    totalPassTestCase: number;
    totalFailedTestCase: number;
    executionDate: string;
    linkReportTesting: string;
    linkReportCoverage: string;
    linkSourceCoverage: string;
    data_cfg: {
      nodes: any[];
      edges: any[];
    };
  }

const TestResultPage = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    let apiKey = import.meta.env.VITE_API_KEY;
    // const modulId = import.meta.env.VITE_MODULE_ID;
    const sessionData = localStorage.getItem('session')
    if (sessionData != null){
        const session = JSON.parse(sessionData);
        apiKey = session.token
    }

    const queryParameters = new URLSearchParams(window.location.search)
    const modulId = queryParameters.get("topikModulId")
    const defaultData: DataResultTest = {
        coverageScore: 0,
        point: 0,
        totalTestCase: 0,
        totalPassTestCase: 0,
        totalFailedTestCase: 0,
        executionDate: "",
        linkReportTesting: "",
        linkReportCoverage: "",
        linkSourceCoverage: "",
        data_cfg: {
          nodes: [],
          edges: []
        }
    };
    const [showCyclomaticComplexity] = useState(false);
    const [showCodeCoverage] = useState(true);
    const cyclomaticComplexityValue = 5; 
    const [dataTestResult, setDataTestResult] = useState<DataResultTest>(defaultData);
    const [error, setError] = useState<string | null>(null);
    const fetchDataTestResult = async () => {
        
        try {
          const response = await fetch(`${apiUrl}/modul/getResultTest/${modulId}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          });
    
          if (!response.ok) {
            if (response.status === 403) {
              // throw new Error('Forbidden: Access is denied');
              navigate("/error")
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          }
    
          const data = await response.json();
          setDataTestResult(data || null);

        } catch (error) {
          console.error('Error fetching data:', error);
          setError((error as Error).message);
        }
    };
    const handleCoverageTestReport = async () => {
        const url = apiUrl +"/"+ dataTestResult?.linkReportCoverage;
        const win = window.open(url, '_blank');
        win?.focus();
    };
    const handleTestReport = async () => {
        const url = apiUrl +"/"+ dataTestResult?.linkReportTesting;
        const win = window.open(url, '_blank');
        win?.focus();
    };
    
    useEffect(() => {
        fetchDataTestResult();
    }, []);

    if (error) {
        return <div className="p-4 bg-white rounded-lg shadow-md h-screen">Error: {error}</div>;
    }
    
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
                <ModuleCoverage dataResultTest = {dataTestResult}/>
                </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={50}>
                <div className="flex flex-col h-full items-center pl-4 pr-4 gap-4" style={{ overflowY: 'auto' }}>
                  <CFGCard 
                    showCyclomaticComplexity={showCyclomaticComplexity}
                    cyclomaticComplexityValue={cyclomaticComplexityValue}
                    showCodeCoverage={showCodeCoverage}
                    codeCoveragePercentage={dataTestResult.coverageScore}
                  />
                  <TestResultCard dataResultTest = {dataTestResult}/>
                  <div className="space-x-2 items-center justify-end">
                      <Button
                          variant="outline"
                          className="bg-white text-sm text-blue-800 border-2 border-blue-800 rounded-[10] hover:bg-blue-800 hover:text-white"
                          onClick={handleCoverageTestReport}
                      >
                          Coverage Test
                      </Button>
                      <Button
                          className="bg-blue-800 text-sm text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0"
                          onClick={handleTestReport}
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
