import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CreateTestCasePage from "./pages/CreateTestCasePage";
import ExecutionTestCaseFailPage from "./pages/ExecutionTestCaseFailPage";
import ExecutionTestCasePassPage from "./pages/ExecutionTestCasePassPage";
import ModuleTestPage from "./pages/ModuleTestPage";
import TestResultPage from "./pages/TestResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<CreateTestCasePage />} />
        <Route path="/pass" element={<ExecutionTestCasePassPage />} />
        <Route path="/fail" element={<ExecutionTestCaseFailPage />} />
        <Route path="/test-result" element={<TestResultPage/>}/>
        <Route path="/module" element={<ModuleTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
