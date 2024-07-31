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
        }" class="form-control rounded-full border border-gray-300 p-2" required="required"${
          config.isMultiple ? ' multiple="multiple"' : ""
        }>
  <option value="">${optionsArray[0]}</option>
  ${optionsArray
    .slice(1)
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("\n  ")}
</select>`;
      })
      .join("\n\n");

    setGeneratedCode(allSelectsHtml);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Generate CQ questions code</h2>
      <div className="flex w-full justify-end m-3">
        <button
          onClick={handleAddSelect}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center justify-center"
        >
          Add select +
        </button>
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
          rows={16}
          placeholder="Display generated code here"
          value={generatedCode}
          readOnly
          className="p-2 border border-gray-300 rounded min-h-20"
        ></textarea>
        <button
          onClick={handleGenerateCode}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Generate code
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};

export default Select;
