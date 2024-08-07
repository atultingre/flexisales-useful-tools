import { Button, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const CheckboxGroupGenerator = () => {
  const [checkboxConfigs, setCheckboxConfigs] = useState([
    { text: "", linkText: "", linkHref: "" },
    { text: "", linkText: "", linkHref: "" },
  ]);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerateCode = () => {
    const allCheckboxesHtml = checkboxConfigs
      .filter((config) => config.text)
      .map((config, index) => {
        const linkPart = config.linkText
          ? `<a href="${config.linkHref}">${config.linkText}</a>`
          : "";

        return `
  <p>
    <input name="optin${index + 1}" type="checkbox" value="${config.text}"
      >
    ${config.text} ${linkPart}
  </p>`;
      })
      .join("\n\n");

    setGeneratedCode(allCheckboxesHtml);
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
    const updatedConfigs = [...checkboxConfigs];
    updatedConfigs[index][key] = value;
    setCheckboxConfigs(updatedConfigs);
  };

  const handleAddCheckbox = () => {
    setCheckboxConfigs([
      ...checkboxConfigs,
      { text: "", linkText: "", linkHref: "" },
    ]);
  };

  const handleClear = () => {
    setCheckboxConfigs([
      { text: "", linkText: "", linkHref: "" },
      { text: "", linkText: "", linkHref: "" },
    ]);
    setGeneratedCode("");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row w-full md:justify-between md:items-center mb-10">
        <h2 className="text-xl md:text-2xl mb-4 font-semibold">
          Generate Checkbox Code
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <Button type="primary" onClick={handleAddCheckbox} className="">
            Add Checkbox +
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checkboxConfigs.map((config, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Input
              placeholder={`Enter checkbox text ${index + 1}`}
              value={config.text}
              onChange={(e) =>
                handleConfigChange(index, "text", e.target.value)
              }
            />
            <Input
              placeholder={`Enter link text ${index + 1}`}
              value={config.linkText}
              onChange={(e) =>
                handleConfigChange(index, "linkText", e.target.value)
              }
            />
            <Input
              placeholder={`Enter link URL ${index + 1}`}
              value={config.linkHref}
              onChange={(e) =>
                handleConfigChange(index, "linkHref", e.target.value)
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex justify-between gap-5">
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-2">Generated code</h3>
            <TextArea
              rows={7}
              cols={65}
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
                className=" preview-container p-2 border border-gray-300 rounded"
                dangerouslySetInnerHTML={{ __html: generatedCode }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row w-full gap-3">
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
          <Button type="dashed" danger onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckboxGroupGenerator;
