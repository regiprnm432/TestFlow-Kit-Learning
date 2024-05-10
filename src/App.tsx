import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTestCasePage from "./pages/CreateTestCasePage";
import ExecutionTestCaseFailPage from "./pages/ExecutionTestCaseFailPage";
import ExecutionTestCasePassPage from "./pages/ExecutionTestCasePassPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateTestCasePage />} />
        <Route path="/pass" element={<ExecutionTestCasePassPage />} />
        <Route path="/fail" element={<ExecutionTestCaseFailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
