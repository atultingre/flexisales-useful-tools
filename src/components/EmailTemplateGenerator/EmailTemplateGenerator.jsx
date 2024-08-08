import React, { useState } from "react";
import { Input, Radio, Button, notification } from "antd";
import "tailwindcss/tailwind.css";
import { CopyOutlined } from "@ant-design/icons";

const EmailTemplateGenerator = () => {
  const [campaignCode, setCampaignCode] = useState("");
  const [templateType, setTemplateType] = useState("allWorking");
  const [generatedTemplate, setGeneratedTemplate] = useState("");

  const handleGenerate = () => {
    let template = "";

    switch (templateType) {
      case "allWorking":
        template = `Hi Team,\n\nAll Content and Abstract Links are working for ${campaignCode}\n\nBest regards,\n\nAtul Tingre\nSoftware Developer\nFlexisales Inc\nMobile: 8806234568\natul.tingre@flexisales.co.in\nwww.flexisales.com`;
        break;
      case "lpLinksAndScreenshots":
        template = `Hi Team,\n\nPFA for Landing Page Links and Screenshots For ${campaignCode}\n\nBest regards,\n\nAtul Tingre\nSoftware Developer\nFlexisales Inc\nMobile: 8806234568\natul.tingre@flexisales.co.in\nwww.flexisales.com`;
        break;
      case "lpLinks":
        template = `Hi Team,\n\nPlease Find Below Landing Page Links For ${campaignCode}\n\nBest regards,\n\nAtul Tingre\nSoftware Developer\nFlexisales Inc\nMobile: 8806234568\natul.tingre@flexisales.co.in\nwww.flexisales.com`;
        break;
      default:
        break;
    }

    setGeneratedTemplate(template);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTemplate);
    notification.success({
      message: "Copied to Clipboard",
      description: "The email template has been copied to your clipboard.",
      placement: "topRight",
    });
  };

  const handleClear = () => {
    setCampaignCode("");
    setGeneratedTemplate("");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Email Template Generator</h2>

      <Input
        placeholder="Enter Campaign Code (e.g., GG 5454)"
        value={campaignCode}
        onChange={(e) => setCampaignCode(e.target.value)}
        className="mb-4"
      />

      <Radio.Group
        onChange={(e) => setTemplateType(e.target.value)}
        value={templateType}
        className="mb-4"
      >
        <Radio value="allWorking">All Working</Radio>
        <Radio value="lpLinksAndScreenshots">LP Links and Screenshots</Radio>
        <Radio value="lpLinks">LP Links</Radio>
      </Radio.Group>
      <div className="flex flex-col md:flex-row gap-3">
        <Button type="primary" onClick={handleGenerate} className="w-full mb-4">
          Generate Template
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleClear}
          className="w-full mb-4"
        >
          Clear
        </Button>
      </div>

      {generatedTemplate && (
        <div className="mt-4 p-4 border rounded bg-gray-100 w-full">
          <div className="w-full flex justify-end ">
            <Button
              type="default"
              icon={<CopyOutlined />}
              onClick={handleCopy}
              className="mt-2 "
            >
              Copy to Clipboard
            </Button>
          </div>
          <pre>{generatedTemplate}</pre>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateGenerator;
