import React, { useState } from "react";
import { Select, Input, Button, Typography, List, message } from "antd";
import { CopyOutlined, ClearOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

function App() {
  const currentMonthYear = dayjs().format("MMMMYY").toLowerCase();
  const [baseUrl, setBaseUrl] = useState("https://techtree.biz/");
  const [folderName, setFolderName] = useState(currentMonthYear);
  const [option, setOption] = useState("TT");
  const [userNames, setUserNames] = useState("");
  const [generatedUrls, setGeneratedUrls] = useState([]);

  const urls = [
    "https://techtree.biz/",
    "https://b2bbitinfo.com/",
    "https://techinfopages.com/",
  ];

  const options = ["TT", "HQ", "GG", "FS", "IT", "CR", "DA", "JM", "CL"];

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
    // setBaseUrl("");
    // setFolderName(currentMonthYear);
    // setOption("");
    setUserNames("");
    setGeneratedUrls([]);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-4 font-semibold">URL Generator</h2>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 ">
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

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
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
            renderItem={(item) => (
              <List.Item>
                <a href={item} target="_blanck">
                  {item}
                </a>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 mt-6">
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
