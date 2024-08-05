import { Route, Routes } from "react-router-dom";
import CheckboxGroupGenerator from "./components/Checkbox/CheckboxGroupGenerator";
import Dashboard from "./components/Dashboard/Dashboard";
import RadioGroupGenerator from "./components/Radio/RadioGroupGenerator";
import Select from "./components/Select/Select";
import ListGenerator from "./components/List/ListGenerator";
import UrlGenerator from "./components/UrlGenerator/UrlGenerator";
// import HtmlGeneratorForm from "./components/Template/HtmlGeneratorForm";

const App = () => {
  return (
    <Dashboard>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/radio" element={<RadioGroupGenerator />} />
        <Route path="/checkbox" element={<CheckboxGroupGenerator />} />
        <Route path="/list" element={<ListGenerator />} />
        <Route path="/url-generator" element={<UrlGenerator />} />
        {/* <Route path="/link-opener" element={<BulkLinkOpener />} /> */}
      </Routes>
      {/* <HtmlGeneratorForm /> */}
    </Dashboard>
  );
};

export default App;
