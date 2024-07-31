import { Route, Routes } from "react-router-dom";
import CheckboxGroupGenerator from "./components/Checkbox/CheckboxGroupGenerator";
import Dashboard from "./components/Dashboard/Dashboard";
import RadioGroupGenerator from "./components/Radio/RadioGroupGenerator";
import Select from "./components/Select/Select";
// import BulkLinkOpener from "./components/LinkOpener/BulkLinkOpener";

const App = () => {
  return (
    <Dashboard>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/radio" element={<RadioGroupGenerator />} />
        <Route path="/checkbox" element={<CheckboxGroupGenerator />} />
        {/* <Route path="/link-opener" element={<BulkLinkOpener />} /> */}
      </Routes>
    </Dashboard>
  );
};

export default App;
