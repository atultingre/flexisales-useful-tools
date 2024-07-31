import { Button, notification } from "antd";
import { useState } from "react";

const Select = () => {
  const [selectConfigs, setSelectConfigs] = useState([
    { question: "", options: "", isMultiple: true },
    { question: "", options: "", isMultiple: true },
    { question: "", options: "", isMultiple: true },
  ]);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerateCode = () => {
    const allSelectsHtml = selectConfigs
      .filter((config) => config.question && config.options)
      .map((config, index) => {
        const optionsArray = config.options
          .split(/[\n,]+/)
          .map((option) => option.trim())
          .filter((option) => option);

        return `
  <p>${config.question}</p>
  <select name="cq${index + 1}[]" id="cq${index + 1}"${
          config.isMultiple ? ' multiple="multiple"' : ""
        }>
    ${optionsArray
      .map((option) => `<option value="${option}">${option}</option>`)
      .join("\n  ")}
  </select>`;
      })
      .join("\n\n");

    setGeneratedCode(allSelectsHtml);
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
      .catch((err) => {
        notification.error({
          message: "Copy Failed",
          description: "Failed to copy the code. Please try again.",
        });
      });
  };

  const handleConfigChange = (index, key, value) => {
    const updatedConfigs = [...selectConfigs];
    updatedConfigs[index][key] = value;
    setSelectConfigs(updatedConfigs);
  };

  const handleAddSelect = () => {
    setSelectConfigs([
      ...selectConfigs,
      { question: "", options: "", isMultiple: true },
    ]);
  };

  const handleClear = () => {
    setSelectConfigs([
      { question: "", options: "", isMultiple: true },
      { question: "", options: "", isMultiple: true },
      { question: "", options: "", isMultiple: true },
    ]);
    setGeneratedCode("");
  };

  return (
    <div className="p-4">
      <div className="flex w-full justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">Generate CQ Questions Code</h2>
        <div className="flex">
          <Button type="primary" onClick={handleAddSelect}>
            Add Select +
          </Button>
          <Button type="priamry" onClick={handleClear} className="ml-4">
            Clear All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectConfigs.map((config, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder={`Add select question ${index + 1}`}
              value={config.question}
              onChange={(e) =>
                handleConfigChange(index, "question", e.target.value)
              }
              className="p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder={`Add select options ${
                index + 1
              } (newline-separated)`}
              value={config.options}
              onChange={(e) =>
                handleConfigChange(index, "options", e.target.value)
              }
              rows={10}
              className="p-2 border border-gray-300 rounded h-20"
            ></textarea>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.isMultiple}
                onChange={(e) =>
                  handleConfigChange(index, "isMultiple", e.target.checked)
                }
              />
              <span>Allow multiple selections</span>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <textarea
          rows={5}
          placeholder="Display generated code here"
          value={generatedCode}
          readOnly
          className="p-2 border border-gray-300 rounded min-h-20"
        ></textarea>
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

export default Select;
