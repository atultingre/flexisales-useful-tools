import { Navigate, Route, Routes } from "react-router-dom";
import CheckboxGroupGenerator from "./components/Checkbox/CheckboxGroupGenerator";
import Dashboard from "./components/Dashboard/Dashboard";
import EmailTemplateGenerator from "./components/EmailTemplateGenerator/EmailTemplateGenerator";
import ListGenerator from "./components/List/ListGenerator";
import RadioGroupGenerator from "./components/Radio/RadioGroupGenerator";
import Select from "./components/Select/Select";
import UrlGenerator from "./components/UrlGenerator/UrlGenerator";
import HtmlGenerator from "./components/HtmlGenerator/HtmlGenerator";
import { Toaster } from "react-hot-toast";
// import TemplateCard from "./components/Template/TemplateCard";

const App = () => {
  return (
    <Dashboard>
      <Toaster position="top-right" />
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/campaigns" element={<Campaign />} /> */}
        <Route path="/" element={<UrlGenerator />} />
        <Route path="/select" element={<Select />} />
        <Route path="/radio" element={<RadioGroupGenerator />} />
        <Route path="/checkbox" element={<CheckboxGroupGenerator />} />
        <Route path="/list" element={<ListGenerator />} />
        <Route path="/email-template" element={<EmailTemplateGenerator />} />
        <Route path="/html-generator" element={<HtmlGenerator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* <Route path="/template" element={<TemplateCard />} /> */}
      </Routes>
    </Dashboard>
  );
};

export default App;
