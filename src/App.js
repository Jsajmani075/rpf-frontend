import { BrowserRouter, Routes, Route } from "react-router-dom";
import RpfList from "./pages/rpfList";
import CreateRpf from "./pages/createRpf"
import VendorList from "./pages/vendorlist";
import VendorDetails from "./pages/vendorDetails";
import VendorSelect from "./pages/vendorSelect";
import ProposalList from "./pages/proposalList";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: 20 }}>
          <Routes>
            <Route path="/" element={<CreateRpf />} />
            <Route path="/rpfs" element={<RpfList />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/vendor/:id" element={<VendorDetails />} />
            <Route path="/select-vendor/:rpfId" element={<VendorSelect />} />
            <Route path="/proposals" element={<ProposalList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
