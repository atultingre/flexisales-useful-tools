import React, { useState } from "react";
import { Select, Input, Button, Typography, List, message } from "antd";
import { CopyOutlined, ClearOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

function App() {
  const [baseUrl, setBaseUrl] = useState("");
  const [folderName, setFolderName] = useState("");
  const [option, setOption] = useState("");
  const [userNames, setUserNames] = useState("");
  const [generatedUrls, setGeneratedUrls] = useState([]);

  const urls = [
    "https://b2bbitinfo.com/",
    "https://techtree.biz/",
    "https://techinfopages.com/",
  ];

  const options = ["CL", "TT", "GG", "FS", "IT", "CR", "DA", "JM"];

  const handleGenerateUrls = () => {
    if (baseUrl && folderName && option && userNames) {
      const userNameList = userNames
        .split("\n")
        .filter((name) => name.trim() !== "");
      const urls = userNameList.map(
        (name) => `${baseUrl}${folderName}/${option}/${name.trim()}/index.html`
      );
      setGeneratedUrls(urls);
    } else {
      message.warning("Please fill in all fields");
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = generatedUrls.join("\n");
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success("URLs copied to clipboard");
      })
      .catch(() => {
        message.error("Failed to copy");
      });
  };

  const handleClearForm = () => {
    setBaseUrl("");
    setFolderName("");
    setOption("");
    setUserNames("");
    setGeneratedUrls([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>URL Generator</Title>
      <div className="flex justify-between items-center gap-6 ">
        <div className="w-full">
          <Title level={5}>Select Base URL:</Title>
          <Select
            style={{ width: "100%" }}
            value={baseUrl}
            onChange={(value) => setBaseUrl(value)}
            placeholder="Select a URL"
          >
            {urls.map((url, index) => (
              <Option key={index} value={url}>
                {url}
              </Option>
            ))}
          </Select>
        </div>

        <div className="w-full">
          <Title level={5}>Enter Month Folder Name:</Title>
          <Input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="e.g., april24"
          />
        </div>

        <div className="w-full">
          <Title level={5}>Select Option:</Title>
          <Select
            style={{ width: "100%" }}
            value={option}
            onChange={(value) => setOption(value)}
            placeholder="Select an option"
          >
            {options.map((opt, index) => (
              <Option key={index} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-between gap-6 mt-6">
        <div className="w-full">
          <Title level={5}>Enter User Names (one per line):</Title>
          <TextArea
            value={userNames}
            onChange={(e) => setUserNames(e.target.value)}
            placeholder="e.g., atul_tingre"
            rows={5}
          />
        </div>
        <div className="w-full">
          <Title level={5}>Generated URLs:</Title>
          <List
            bordered
            dataSource={generatedUrls}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>

      <div className="flex justify-between gap-6 mt-6">
        <div className="w-full">
          <Button
            type="primary"
            className="w-full"
            onClick={handleGenerateUrls}
          >
            Generate URLs
          </Button>
        </div>
        <div className="w-full">
          <Button
            type="primary"
            icon={<CopyOutlined />}
            className="w-full"
            onClick={handleCopyToClipboard}
            disabled={generatedUrls.length === 0}
          >
            Copy to Clipboard
          </Button>
        </div>
        <div className="w-full">
          <Button
            type="primary"
            danger
            icon={<ClearOutlined />}
            className="w-full"
            style={{ marginLeft: "10px" }}
            onClick={handleClearForm}
          >
            Clear Form
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
