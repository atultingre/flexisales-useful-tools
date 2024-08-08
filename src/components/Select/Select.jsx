import { Button, Input, notification } from "antd";
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
  <select name="cq${index + 1}[]" id="cq${
          index + 1
        }" class="form-control" style="overflow:auto;" required ${
          config.isMultiple ? " multiple" : ""
        }>
    ${optionsArray
      .map(
        (option) =>
          `<option value="${option}" title="${option}">${option}</option>`
      )
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
      .catch(() => {
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 w-full">
        <h2 className="text-xl md:text-2xl mb-4 font-semibold">
          Generate CQ Questions Code
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="primary" onClick={handleAddSelect}>
            Add Select +
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectConfigs.map((config, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder={`Add select question ${index + 1}`}
              value={config.question}
              onChange={(e) =>
                handleConfigChange(index, "question", e.target.value)
              }
              className="p-2 border border-gray-300 rounded"
            />
            <Input.TextArea
              placeholder={`Add select options ${
                index + 1
              } (newline-separated)`}
              value={config.options}
              onChange={(e) =>
                handleConfigChange(index, "options", e.target.value)
              }
              rows={5}
              className="p-2 border border-gray-300 rounded h-20"
            />
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
      <div className="mt-4 flex justify-between gap-5 space-y-2">
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Generated code</h3>

          <Input.TextArea
            rows={5}
            placeholder="Display generated code here"
            value={generatedCode}
            readOnly
            className="p-2 border border-gray-300 rounded min-h-20"
          />
        </div>
        {generatedCode && (
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <div
              className="preview-container p-4 border border-gray-300 rounded"
              dangerouslySetInnerHTML={{ __html: generatedCode }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3 mt-3">
        <Button
          type="primary"
          onClick={handleGenerateCode}
          className="p-2 w-full"
        >
          Generate Code
        </Button>
        <Button
          type="dashed"
          
          onClick={handleCopyToClipboard}
          className="p-2 w-full"
        >
          Copy to Clipboard
        </Button>
        <Button type="primary" danger onClick={handleClear} className="">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default Select;
