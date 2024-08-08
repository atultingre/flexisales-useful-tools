import { Button, Input, notification } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

const RadioGroupGenerator = () => {
  const [radioConfigs, setRadioConfigs] = useState([
    { question: "", options: "" },
    { question: "", options: "" },
    { question: "", options: "" },
  ]);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerateCode = () => {
    const allRadiosHtml = radioConfigs
      .filter((config) => config.question && config.options)
      .map((config, index) => {
        const optionsArray = config.options
          .split(/[\n,]+/)
          .map((option) => option.trim())
          .filter((option) => option);

        return `
  <p>${config.question}</p>
    ${optionsArray
      .map(
        (option, idx) => `
      <input type="radio" name="optin${
        index + 1
      }" value="${option}">  ${option} 
    `
      )
      .join("\n    ")}
  `;
      })
      .join("\n\n");

    setGeneratedCode(allRadiosHtml);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => {
        notification.success({
          message: "Copied to Clipboard",
          description: "The generated code has been copied to your clipboard.",
        });
      })
      .catch(() => {
        notification.error({
          message: "Copy Failed",
          description: "Failed to copy the code. Please try again.",
        });
      });
  };

  const handleConfigChange = (index, key, value) => {
    const updatedConfigs = [...radioConfigs];
    updatedConfigs[index][key] = value;
    setRadioConfigs(updatedConfigs);
  };

  const handleAddRadioGroup = () => {
    setRadioConfigs([...radioConfigs, { question: "", options: "" }]);
  };

  const handleClear = () => {
    setRadioConfigs([
      { question: "", options: "" },
      { question: "", options: "" },
      { question: "", options: "" },
    ]);
    setGeneratedCode("");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row  w-full md:justify-between md:items-center mb-10">
        <h2 className="text-xl md:text-2xl mb-4 font-semibold">
          Generate Radio Button
        </h2>

        <div className="flex flex-col md:flex-row  gap-4">
          <Button type="primary" onClick={handleAddRadioGroup} className="">
            Add Radio Group +
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {radioConfigs.map((config, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Input
              placeholder={`Add question ${index + 1}`}
              value={config.question}
              onChange={(e) =>
                handleConfigChange(index, "question", e.target.value)
              }
            />
            <TextArea
              placeholder={`Add options for question ${
                index + 1
              } (newline-separated)`}
              value={config.options}
              onChange={(e) =>
                handleConfigChange(index, "options", e.target.value)
              }
              rows={4}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row mt-4 md:justify-between space-y-2 gap-5">
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Generated code</h3>
          <TextArea
            rows={6}
            placeholder="Display generated code here"
            value={generatedCode}
            readOnly
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        {generatedCode && (
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <div
              className="preview-container p-2 border border-gray-300 rounded"
              dangerouslySetInnerHTML={{ __html: generatedCode }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row  w-full mt-5 gap-3">
        <Button
          type="primary"
          onClick={handleGenerateCode}
          className="p-2 w-full"
        >
          Generate Code
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleCopyToClipboard}
          className="p-2 w-full"
        >
          Copy to Clipboard
        </Button>
        <Button type="dashed" danger onClick={handleClear} className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default RadioGroupGenerator;
