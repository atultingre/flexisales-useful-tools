import { Route, Routes } from "react-router-dom";
import CheckboxGroupGenerator from "./components/Checkbox/CheckboxGroupGenerator";
import Dashboard from "./components/Dashboard/Dashboard";
import EmailTemplateGenerator from "./components/EmailTemplateGenerator/EmailTemplateGenerator";
import ListGenerator from "./components/List/ListGenerator";
import RadioGroupGenerator from "./components/Radio/RadioGroupGenerator";
import Select from "./components/Select/Select";
import TemplateCard from "./components/Template/TemplateCard";
import UrlGenerator from "./components/UrlGenerator/UrlGenerator";

const App = () => {
  return (
    <Dashboard>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/campaigns" element={<Campaign />} /> */}
        <Route path="/select" element={<Select />} />
        <Route path="/radio" element={<RadioGroupGenerator />} />
        <Route path="/checkbox" element={<CheckboxGroupGenerator />} />
        <Route path="/list" element={<ListGenerator />} />
        <Route path="/" element={<UrlGenerator />} />
        <Route path="/template" element={<TemplateCard />} />
        <Route path="/email-template" element={<EmailTemplateGenerator />} />
      </Routes>
    </Dashboard>
  );
};

export default App;
