import "primereact/resources/themes/lara-light-teal/theme.css";
import { Home } from "./components/Home/Home";
import { Members } from "./components/Members/Members";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/members" element={<Members />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
