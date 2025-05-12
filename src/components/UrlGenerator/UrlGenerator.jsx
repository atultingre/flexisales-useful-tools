import {
  Button,
  Divider,
  Form,
  Input,
  List,
  notification,
  Select,
  Space,
  Typography,
} from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const UrlGenerator = () => {
  const [domain, setDomain] = useState("https://techtree.biz/");
  const [campaign, setCampaign] = useState("hq");
  const [folderNames, setFolderNames] = useState("");
  const [resourceIds, setResourceIds] = useState("");
  const [generatedLinks, setGeneratedLinks] = useState([]);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [month, setMonth] = useState(currentMonth.toLowerCase());
  const [year, setYear] = useState(currentYear);

  const campaignOptions = [
    "hq",
    "tt",
    "gg",
    "fs",
    "it",
    "jm",
    "cr",
    "td",
    "da",
  ];

  const sanitizeResourceId = (id) => {
    return id.toLowerCase().replace(/\s+/g, "_");
  };

  const sanitizeFolderName = (name) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "_");
  };

  const generateLinks = () => {
    if (!campaign || !folderNames.trim()) {
      notification.error({
        message: "Error",
        description: "Please fill all required fields!",
      });
      return;
    }

    const folderList = folderNames
      .split("\n")
      .map((name) => sanitizeFolderName(name.trim()))
      .filter(Boolean);
    const resourceList = resourceIds
      .split("\n")
      .map((id) => sanitizeResourceId(id.trim()))
      .filter(Boolean);

    const links = folderList.map((folderName, index) => {
      const resourceId = resourceList[index] || resourceList[0] || "";
      const resourcePart = resourceId ? `${resourceId}_` : "";
      return `${domain}${year}/${month}/${campaign}/${resourcePart}${folderName}/index.html`;
    });

    setGeneratedLinks(links);
  };

  const handleCopyAllFolderNames = () => {
    if (generatedLinks.length === 0) {
      notification.error({
        message: "Error",
        description: "No folder names to copy!",
      });
      return;
    }

    const folderNamesText = generatedLinks
      .map((link) => link.split("/").slice(-2, -1)[0]) // Extract folder names
      .join("\n");

    navigator.clipboard
      .writeText(folderNamesText)
      .then(() => {
        notification.success({
          message: "Success",
          description: "All folder names copied to clipboard!",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: "Failed to copy folder names!",
        });
        console.error("Clipboard error:", err);
      });
  };

  const handleCopyLinks = () => {
    if (generatedLinks.length === 0) {
      notification.error({
        message: "Error",
        description: "No links to copy!",
      });
      return;
    }

    const linksText = generatedLinks.join("\n");

    // Check if navigator.clipboard is available
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(linksText)
        .then(() => {
          notification.success({
            message: "Success",
            description: "Links copied to clipboard!",
          });
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: "Failed to copy links!",
          });
          console.error("Clipboard error:", err);
        });
    } else {
      // Fallback to execCommand (older browsers)
      const textArea = document.createElement("textarea");
      textArea.value = linksText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        notification.success({
          message: "Success",
          description: "Links copied to clipboard!",
        });
      } catch (err) {
        notification.error({
          message: "Error",
          description: "Failed to copy links using fallback!",
        });
        console.error("ExecCommand error:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleReset = () => {
    setDomain("https://techtree.biz/");
    setCampaign("hq");
    setFolderNames("");
    setResourceIds("");
    setGeneratedLinks([]);
    setMonth(currentMonth.toLowerCase());
    setYear(currentYear);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Link Generator</Title>
      <Form
        layout="vertical"
        onFinish={generateLinks}
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div>
            <Form.Item label="Domain">
              <Select value={domain} onChange={(value) => setDomain(value)}>
                <Option value="https://techtree.biz/">
                  https://techtree.biz/
                </Option>
                <Option value="https://techinfopages.com/">
                  https://techinfopages.com/
                </Option>
              </Select>
            </Form.Item>

            <Space size="large">
              <Form.Item label="Year">
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ width: 120 }}
                />
              </Form.Item>

              <Form.Item label="Month">
                <Select value={month} onChange={(value) => setMonth(value)}>
                  {[...Array(12).keys()].map((i) => {
                    const m = new Date(0, i)
                      .toLocaleString("default", {
                        month: "long",
                      })
                      .toLowerCase();
                    return (
                      <Option key={m} value={m}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item label="Campaign">
                <Select
                  value={campaign}
                  // onChange={(value) => setCampaign(value)}
                  onChange={(value) => {
                    setCampaign(value);
                    const specialCampaigns = ["jm", "gg", "da", "ct", "au"];
                    if (specialCampaigns.includes(value.toLowerCase())) {
                      setDomain("https://techinfopages.com/");
                    } else {
                      setDomain("https://techtree.biz/");
                    }
                  }}
                  style={{ width: 150 }}
                >
                  <Option value="">--Select--</Option>
                  {campaignOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
          </div>

          <div style={{ display: "flex", gap: "10px", width: "60%" }}>
            <Form.Item label="Resource IDs ">
              <TextArea
                value={resourceIds}
                onChange={(e) => setResourceIds(e.target.value)}
                rows={5}
              />
            </Form.Item>

            <Form.Item label="Folder Names " style={{ width: "80%" }}>
              <TextArea
                value={folderNames}
                onChange={(e) => setFolderNames(e.target.value)}
                rows={5}
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Generate Links
          </Button>
          <Button
            danger
            type="primary"
            onClick={handleReset}
            style={{ width: "100%" }}
          >
            Reset
          </Button>
        </div>
      </Form>
      <Divider />

      {generatedLinks.length > 0 && (
        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   gap: "20px",
        //   width: "100%",
        // }}
        >
          <div style={{ width: "100%", marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Title level={4}>Folder Names:</Title>
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={handleCopyAllFolderNames}
                  style={{ marginTop: "20px" }}
                >
                  Copy All Folder Names
                </Button>
              </div>
            </div>
            <List
              bordered
              dataSource={generatedLinks}
              renderItem={(link) => {
                const folderName = link.split("/").slice(-2, -1)[0]; // Extract folder name
                return (
                  <List.Item>
                    <span style={{ flex: 1 }}>{folderName}</span>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard
                            .writeText(folderName)
                            .then(() => {
                              notification.success({
                                message: "Success",
                                description: "Folder name copied to clipboard!",
                              });
                            })
                            .catch((err) => {
                              notification.error({
                                message: "Error",
                                description:
                                  "Failed to copy folder name to clipboard!",
                              });
                              console.error("Clipboard error:", err);
                            });
                        } else {
                          // Fallback for older browsers
                          const textArea = document.createElement("textarea");
                          textArea.value = folderName;
                          document.body.appendChild(textArea);
                          textArea.select();
                          try {
                            document.execCommand("copy");
                            notification.success({
                              message: "Success",
                              description: "Folder name copied to clipboard!",
                            });
                          } catch (err) {
                            notification.error({
                              message: "Error",
                              description:
                                "Failed to copy folder name using fallback!",
                            });
                            console.error("ExecCommand error:", err);
                          }
                          document.body.removeChild(textArea);
                        }
                      }}
                    >
                      Copy
                    </Button>
                  </List.Item>
                );
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "100%" }}>
              <Title level={4}>Generated Links:</Title>
            </div>
            <div>
              <Button
                type="primary"
                onClick={handleCopyLinks}
                style={{ width: "100%" }}
              >
                Copy Links
              </Button>
            </div>
          </div>
          <List
            bordered
            dataSource={generatedLinks}
            renderItem={(link) => (
              <List.Item>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default UrlGenerator;
