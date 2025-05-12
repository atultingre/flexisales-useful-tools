import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import templates from "./templates.json";

const TemplateCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInstructions, setCurrentInstructions] = useState({});

  const filteredTemplates = templates.filter((template) =>
    template.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleCopy = async (filePath) => {
  //   try {
  //     const response = await fetch(filePath);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const fileContent = await response.text();
  //     await navigator.clipboard.writeText(fileContent);
  //     notification.success({
  //       message: "Copied!",
  //       description: "The content has been copied to your clipboard.",
  //       placement: "topRight",
  //     });
  //   } catch (error) {
  //     notification.error({
  //       message: "Copy Failed",
  //       description: "There was an issue copying the content.",
  //       placement: "topRight",
  //     });
  //     console.error("Error copying file content:", error);
  //   }
  // };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback: Copy command failed", err);
    }

    document.body.removeChild(textArea);
  };

  const handleCopy = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Network response was not ok");
      const fileContent = await response.text();

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fileContent);
      } else {
        fallbackCopyTextToClipboard(fileContent);
      }

      notification.success({
        message: "Copied!",
        description: "The content has been copied to your clipboard.",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Copy Failed",
        description: "There was an issue copying the content.",
        placement: "topRight",
      });
      console.error("Error copying file content:", error);
    }
  };

  const showInstructions = (instructions) => {
    setCurrentInstructions(instructions);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between  mb-8  rounded-lg ">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Templates</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">b2b.com</h2>
          </div> */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">techtree.com</h2>
            <span className="text-gray-600">IT, TT, HQ, CR, TD, FS</span>
          </div>
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">techinfopages.com</h2>
            <span className="text-gray-600">JM, DA, CT, AU, GG</span>
          </div>
        </div>
      </div>

      <Input
        placeholder="Search by Campaign Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 rounded-md border border-gray-300"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            title={template.campaignName}
            className="rounded-lg shadow-lg border border-black"
            cover={
              <div className="relative px-2">
                <img
                  alt="template"
                  src={template.image}
                  className="object-cover h-[200px] w-full rounded-t-lg"
                />
              </div>
            }
          >
            <div className="flex flex-col space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {Object.keys(template)
                  .filter((key) => key.includes("File"))
                  .map((key) => (
                    <Button
                      key={key}
                      icon={<CopyOutlined />}
                      onClick={() => handleCopy(template[key])}
                      className="flex-1"
                    >
                      {key.replace("File", "")}
                    </Button>
                  ))}
              </div>
              <Button
                icon={<EyeOutlined />}
                onClick={() => showInstructions(template.instructions)}
                className="w-full"
              >
                View Instructions
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={<h1 style={{ color: "red" }}>Instructions</h1>}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <div>
          <div className="flex gap-3">
            <h4 className="font-semibold">File Changes:</h4>
            <span> {currentInstructions.FileChanges || "N/A"}</span>
          </div>
          <div className="flex gap-3">
            <h4 className="font-semibold">Host:</h4>
            <p>{currentInstructions.Host || "N/A"}</p>
          </div>
          <div className="flex gap-3">
            <h4 className="font-semibold">Screenshot:</h4>
            <p>{currentInstructions.Screenshot || "N/A"}</p>
          </div>
          <h4 className="font-semibold">Email:</h4>
          <div className="">
            <p>
              <strong>To:</strong> {currentInstructions.Email?.To || "N/A"}
            </p>
            <p>
              <strong>CC:</strong> {currentInstructions.Email?.CC || "N/A"}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TemplateCard;
