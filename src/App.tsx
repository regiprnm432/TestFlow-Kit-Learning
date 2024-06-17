import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CreateTestCasePage from "./pages/CreateTestCasePage";
import ExecutionTestCaseFailPage from "./pages/ExecutionTestCaseFailPage";
import ExecutionTestCasePassPage from "./pages/ExecutionTestCasePassPage";
import ModuleTestPage from "./pages/ModuleTestPage";
import TestResultPage from "./pages/TestResultPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardStudentPage from "./pages/DashboardStudentPage";
import ErrorPage from "./pages/ErrorSessionPage";
import ListTopicsPage from "./pages/ListTopicsPage";
import ListModulesPage from "./pages/ListModulesPage";
import AccessTopicsPage from "./pages/AccessTopicsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/topikModul" element={<CreateTestCasePage />} />
        <Route path="/pass" element={<ExecutionTestCasePassPage />} />
        <Route path="/fail" element={<ExecutionTestCaseFailPage />} />
        <Route path="/test-result" element={<TestResultPage/>}/>
        <Route path="/module" element={<ModuleTestPage />} />
        <Route path="/dashboard-teacher" element={<DashboardPage />} />
        <Route path="/dashboard-student" element={<DashboardStudentPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/list-topics" element={<ListTopicsPage />} />
        <Route path="/list-modules" element={<ListModulesPage />} />
        {/* <Route path="/access-topics" element={<AccessTopicsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
