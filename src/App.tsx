import { BrowserRouter, Routes, Route} from "react-router-dom";
import CreateTestCasePage from "./pages/CreateTestCasePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<CreateTestCasePage />}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;