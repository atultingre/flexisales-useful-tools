import { Navigate, Route, Routes } from "react-router-dom";
import CheckboxGroupGenerator from "./components/Checkbox/CheckboxGroupGenerator";
import Dashboard from "./components/Dashboard/Dashboard";
import RadioGroupGenerator from "./components/Radio/RadioGroupGenerator";
import Select from "./components/Select/Select";
import ListGenerator from "./components/List/ListGenerator";
import UrlGenerator from "./components/UrlGenerator/UrlGenerator";
import Campaign from "./components/Campaign/Campaign";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TemplateCard from "./components/Template/TemplateCard";

const App = () => {
  return (
    <Dashboard>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Campaign />} />
        <Route path="/select" element={<Select />} />
        <Route path="/radio" element={<RadioGroupGenerator />} />
        <Route path="/checkbox" element={<CheckboxGroupGenerator />} />
        <Route path="/list" element={<ListGenerator />} />
        <Route path="/url-generator" element={<UrlGenerator />} />
        <Route path="/template" element={<TemplateCard />} />
      </Routes>
    </Dashboard>
  );
};

export default App;
