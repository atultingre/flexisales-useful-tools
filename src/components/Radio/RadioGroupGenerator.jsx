import { Button, Input,  notification } from "antd";
import { useState } from "react";
import { Radio } from "antd";
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
  <p>
    <p>${config.question}</p>
    ${optionsArray
      .map(
        (option) => `
      <input type="radio" name="optin${
        index + 1
      }" value="${option}" id="${option}">
      ${option}
      &nbsp;
    `
      )
      .join("\n    ")}
  </p>`;
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
      <div className="flex w-full justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">
          Generate Radio Button Groups Code
        </h2>
        <div className="flex">
          <Button type="primary" onClick={handleAddRadioGroup} className="mr-4">
            Add Radio Group +
          </Button>
          <Button type="dashed" danger onClick={handleClear}>
            Clear All
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
      <div className="mt-4 flex flex-col space-y-2">
        <TextArea
          rows={6}
          placeholder="Display generated code here"
          value={generatedCode}
          readOnly
          className="p-2 border border-gray-300 rounded"
        />
        <div className="flex w-full gap-5">
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
        </div>
      </div>
    </div>
  );
};

export default RadioGroupGenerator;
